// Shared lifecycle for image, document, and future on-demand previews.
(function () {
  if (typeof HTMLDialogElement === 'undefined' ||
      typeof HTMLDialogElement.prototype.showModal !== 'function') return;
  var count = 0;

  function create(options) {
    var viewer = document.createElement('dialog');
    var titleId = 'preview-modal-title-' + (++count);
    viewer.className = 'preview-modal ' + options.className;
    viewer.setAttribute('aria-labelledby', titleId);
    // Templates are local code; titles and labels are assigned as text below.
    viewer.innerHTML = '<header class="preview-modal-toolbar">' +
      '<h2 class="preview-modal-title" id="' + titleId + '"></h2>' +
      '<div class="preview-modal-action">' + (options.actionHTML || '') +
      '<button type="button" class="btn btn--ghost btn--icon preview-modal-close" autofocus>' +
      '<span class="material-symbols-outlined icon-sm" aria-hidden="true">close</span></button>' +
      '</div></header>' +
      '<div class="preview-modal-body">' + options.bodyHTML + '</div>';
    document.body.appendChild(viewer);
    var close = viewer.querySelector('.preview-modal-close');
    var title = viewer.querySelector('.preview-modal-title');
    var trigger = null;

    function tabStops(root) {
      var result = [];
      root.querySelectorAll('a[href], button, input, select, textarea, iframe, [tabindex]').forEach(function (el) {
        if (el.disabled || el.tabIndex < 0 || !el.getClientRects().length) return;
        if (el.tagName === 'IFRAME' && el.contentDocument) {
          result = result.concat(tabStops(el.contentDocument));
        } else {
          result.push(el);
        }
      });
      return result;
    }

    function onKeyDown(event) {
      if (!viewer.open) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        viewer.close();
      } else if (event.key === 'Tab') {
        var stops = tabStops(viewer);
        var active = event.target.ownerDocument.activeElement;
        var index = stops.indexOf(active);
        var next = event.shiftKey ? (index <= 0 ? stops.length - 1 : index - 1) : (index + 1) % stops.length;
        event.preventDefault();
        (stops[next] || close).focus();
      }
    }

    close.addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('keydown', onKeyDown);
    viewer.addEventListener('click', function (event) {
      if (event.target !== viewer) return;
      var bounds = viewer.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
    });
    viewer.addEventListener('close', function () {
      if (!document.querySelector('.preview-modal[open]')) {
        document.documentElement.classList.remove('preview-modal-open');
      }
      if (options.onClose) options.onClose();
      if (trigger && trigger.isConnected) trigger.focus({ preventScroll: true });
    });

    return {
      element: viewer,
      open: function (link, labels) {
        trigger = link;
        title.textContent = labels.title;
        close.setAttribute('aria-label', labels.closeLabel);
        close.dataset.tip = labels.closeTip;
        document.documentElement.classList.add('preview-modal-open');
        viewer.showModal();
        close.focus({ preventScroll: true });
      },
      // Same-origin document keyboard events do not bubble to the dialog.
      connectFrame: function (frame) {
        frame.addEventListener('load', function () {
          if (frame.contentDocument) frame.contentDocument.addEventListener('keydown', onKeyDown);
        });
      }
    };
  }

  window.PreviewModal = { create: create };
})();
