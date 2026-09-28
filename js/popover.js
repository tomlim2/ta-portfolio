// Shared non-modal popovers. Content-specific selection stays in each adapter.
(function () {
  var supported = typeof HTMLElement.prototype.showPopover === 'function';
  var instances = new WeakMap();
  var active = null;
  var nextId = 0;
  var frame = 0;

  function schedulePosition() {
    if (!active || frame) return;
    frame = requestAnimationFrame(function () {
      frame = 0;
      if (active) active.updatePosition();
    });
  }

  document.addEventListener('focusin', function (event) {
    if (active && !active.contains(event.target)) active.close({ restoreFocus: false });
  });
  document.addEventListener('keydown', function (event) {
    if (!active) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      active.close();
    } else if (event.key === 'Tab' && active.closeOnTab) {
      // Listboxes resume the normal tab order from their trigger.
      active.close();
    }
  }, true);
  window.addEventListener('resize', schedulePosition);
  document.addEventListener('scroll', schedulePosition, true);
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', schedulePosition);
    window.visualViewport.addEventListener('scroll', schedulePosition);
  }

  function saveAttributes(element, names) {
    var values = names.map(function (name) { return element.getAttribute(name); });
    return function () {
      names.forEach(function (name, index) {
        if (values[index] === null) element.removeAttribute(name);
        else element.setAttribute(name, values[index]);
      });
    };
  }

  function create(options) {
    if (!supported) return null;
    var trigger = options.trigger;
    var panel = options.panel;
    var root = options.root;
    if (instances.has(panel)) return instances.get(panel);
    var restoreTrigger = saveAttributes(trigger, ['id', 'aria-controls', 'aria-expanded', 'aria-haspopup', 'popovertarget']);
    var restorePanel = saveAttributes(panel, ['id', 'popover', 'role', 'tabindex', 'aria-labelledby', 'hidden', 'style', 'data-placement']);
    var hadPanelClass = panel.classList.contains('popover-panel');
    var destroyed = false;
    var observer = new ResizeObserver(schedulePosition);

    if (!trigger.id) trigger.id = 'popover-trigger-' + (++nextId);
    if (!panel.id) panel.id = 'popover-panel-' + (++nextId);
    if (!panel.hasAttribute('role')) panel.setAttribute('role', 'dialog');
    if (!panel.hasAttribute('aria-label') && !panel.hasAttribute('aria-labelledby')) {
      panel.setAttribute('aria-labelledby', trigger.id);
    }
    panel.setAttribute('tabindex', '-1');
    panel.setAttribute('popover', 'auto');
    panel.classList.add('popover-panel');
    panel.hidden = false; // The native popover state now controls visibility.
    trigger.setAttribute('popovertarget', panel.id);
    trigger.setAttribute('aria-controls', panel.id);
    trigger.setAttribute('aria-haspopup', panel.getAttribute('role'));
    trigger.setAttribute('aria-expanded', 'false');

    function updatePosition() {
      if (!panel.matches(':popover-open')) return;
      var anchor = trigger.getBoundingClientRect();
      var viewport = window.visualViewport;
      var leftEdge = viewport ? viewport.offsetLeft : 0;
      var topEdge = viewport ? viewport.offsetTop : 0;
      var width = viewport ? viewport.width : document.documentElement.clientWidth;
      var height = viewport ? viewport.height : window.innerHeight;
      var margin = 12;
      if (!trigger.isConnected || !anchor.width || anchor.bottom < topEdge || anchor.top > topEdge + height) {
        close({ restoreFocus: false });
        return;
      }
      var gap = options.gap === undefined ? 8 : options.gap;
      var placement = options.placement || 'bottom-start';
      var side = placement.split('-')[0];
      var end = placement.endsWith('-end');
      if (getComputedStyle(trigger).direction === 'rtl') end = !end;
      panel.style.maxWidth = Math.max(0, width - margin * 2) + 'px';
      if (options.matchTriggerWidth) panel.style.width = anchor.width + 'px';
      panel.style.maxHeight = Math.max(0, height - margin * 2) + 'px';
      var size = panel.getBoundingClientRect();
      var above = Math.max(0, anchor.top - topEdge - gap - margin);
      var below = Math.max(0, topEdge + height - anchor.bottom - gap - margin);
      if (side === 'top' && size.height > above && below > above) side = 'bottom';
      else if (side !== 'top' && size.height > below && above > below) side = 'top';
      panel.style.maxHeight = (side === 'top' ? above : below) + 'px';
      var renderedHeight = panel.getBoundingClientRect().height;
      var x = end ? anchor.right - size.width : anchor.left;
      var y = side === 'top' ? anchor.top - gap - renderedHeight : anchor.bottom + gap;
      panel.style.left = Math.max(leftEdge + margin, Math.min(x, leftEdge + width - size.width - margin)) + 'px';
      panel.style.top = Math.max(topEdge + margin, Math.min(y, topEdge + height - renderedHeight - margin)) + 'px';
      panel.dataset.placement = side + (placement.endsWith('-end') ? '-end' : '-start');
    }

    function onBeforeToggle(event) {
      var opening = event.newState === 'open';
      if (opening) {
        if (active && active !== api) active.close({ restoreFocus: false });
        active = api;
        observer.observe(trigger);
        observer.observe(panel);
      } else {
        if (active === api) active = null;
        observer.disconnect();
      }
      trigger.setAttribute('aria-expanded', String(opening));
      if (root) root.classList.toggle('is-open', opening);
      if (!opening && options.onClose) options.onClose();
    }

    function open() {
      if (destroyed || trigger.disabled || !trigger.isConnected || !panel.isConnected) return false;
      if (panel.matches(':popover-open')) return true;
      panel.showPopover();
      updatePosition();
      if (!panel.matches(':popover-open')) return false;
      var focus = options.initialFocus ? options.initialFocus() : Array.from(panel.querySelectorAll('button, a[href], input, select, textarea, [tabindex]')).find(function (element) {
        return !element.disabled && element.tabIndex >= 0 && element.getClientRects().length && !element.closest('[inert]');
      });
      (focus || panel).focus({ preventScroll: true });
      if (options.onOpen) options.onOpen();
      return true;
    }

    function close(settings) {
      if (destroyed || !panel.matches(':popover-open')) return;
      panel.hidePopover();
      if ((!settings || settings.restoreFocus !== false) && trigger.isConnected) trigger.focus({ preventScroll: true });
    }

    function toggle() {
      if (panel.matches(':popover-open')) close();
      else open();
    }

    function onClick(event) {
      // Keep one lifecycle for mouse, keyboard and programmatic opening.
      event.preventDefault();
      toggle();
    }

    var api = {
      element: panel,
      open: open,
      close: close,
      toggle: toggle,
      updatePosition: updatePosition,
      closeOnTab: Boolean(options.closeOnTab),
      contains: function (target) { return trigger.contains(target) || panel.contains(target); },
      destroy: function () {
        close({ restoreFocus: panel.contains(document.activeElement) });
        destroyed = true;
        observer.disconnect();
        panel.removeEventListener('beforetoggle', onBeforeToggle);
        trigger.removeEventListener('click', onClick);
        if (!hadPanelClass) panel.classList.remove('popover-panel');
        restoreTrigger();
        restorePanel();
        instances.delete(panel);
      }
    };
    panel.addEventListener('beforetoggle', onBeforeToggle);
    trigger.addEventListener('click', onClick);
    instances.set(panel, api);
    return api;
  }

  window.Popover = { create: create, supported: supported };
})();
