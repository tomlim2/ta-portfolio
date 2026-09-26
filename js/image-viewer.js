// Image-specific content and zoom inside the shared preview modal.
(function () {
  var links = document.querySelectorAll('a[data-image-viewer]');
  if (!links.length || !window.PreviewModal) return;
  var modal = PreviewModal.create({
    className: 'image-viewer',
    actionHTML: '<button type="button" class="btn btn--ghost btn--icon image-viewer-zoom" aria-pressed="false" hidden disabled>' +
      '<span class="material-symbols-outlined icon-sm" aria-hidden="true">zoom_in</span></button>',
    bodyHTML: '<div class="image-viewer-stage" tabindex="0"><img class="image-viewer-image" alt=""></div>',
    onClose: function () { image.removeAttribute('src'); }
  });
  var viewer = modal.element;
  var stage = viewer.querySelector('.image-viewer-stage');
  var image = viewer.querySelector('img');
  var zoom = viewer.querySelector('.image-viewer-zoom');
  var korean = true;
  var canZoom = false;
  var isSvg = false;
  var zoomRequested = false;

  function sizeImage() {
    if (!viewer.open || !image.complete || !image.naturalWidth || !image.naturalHeight ||
        !stage.clientWidth || !stage.clientHeight) return;
    // Use the full stage box so zoom scrollbars do not change the fit baseline.
    var fitScale = Math.min(
      stage.offsetWidth / image.naturalWidth,
      stage.offsetHeight / image.naturalHeight
    );
    // Raster images stop at native size; SVGs fit the stage and zoom to 150% of fit.
    if (!isSvg) fitScale = Math.min(1, fitScale);
    canZoom = isSvg || fitScale < 1;
    updateZoom(zoomRequested && canZoom);
    var scale = zoomRequested ? (isSvg ? fitScale * 1.5 : 1) : fitScale;
    image.style.width = (image.naturalWidth * scale) + 'px';
    image.style.height = (image.naturalHeight * scale) + 'px';
  }

  function updateZoom(enlarged) {
    if (!canZoom && document.activeElement === zoom) stage.focus({ preventScroll: true });
    viewer.classList.toggle('can-zoom', canZoom);
    viewer.classList.toggle('is-zoomed', enlarged);
    zoom.hidden = !canZoom;
    zoom.disabled = !canZoom;
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoom.querySelector('.material-symbols-outlined').textContent = enlarged ? 'zoom_out' : 'zoom_in';
    var zoomLabel = isSvg ? (korean ? '150% 확대' : 'Zoom to 150%') : (korean ? '원본 크기' : 'Actual size');
    var label = enlarged ? (korean ? '화면에 맞춤' : 'Fit to screen') : zoomLabel;
    zoom.setAttribute('aria-label', label);
    zoom.dataset.tip = label;
  }

  function setZoom(enlarged, point) {
    var before = image.getBoundingClientRect();
    var anchor = point || { x: before.left + before.width / 2, y: before.top + before.height / 2 };
    var anchorX = Math.max(0, Math.min(1, (anchor.x - before.left) / before.width));
    var anchorY = Math.max(0, Math.min(1, (anchor.y - before.top) / before.height));
    zoomRequested = enlarged && canZoom;
    updateZoom(zoomRequested);
    sizeImage();
    if (zoomRequested) {
      // Keep the clicked image point under the pointer, within the scroll bounds.
      var after = image.getBoundingClientRect();
      stage.scrollLeft += after.left + after.width * anchorX - anchor.x;
      stage.scrollTop += after.top + after.height * anchorY - anchor.y;
    } else {
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    }
  }

  links.forEach(function (link) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var source = link.querySelector('img');
      if (!source) return;
      event.preventDefault();
      korean = document.documentElement.lang === 'ko';
      canZoom = false;
      isSvg = /\.svg$/i.test(new URL(link.href).pathname) || /^data:image\/svg\+xml[;,]/i.test(link.href);
      // Opening the preview and zooming are separate actions.
      zoomRequested = false;
      updateZoom(false);
      image.alt = source.alt;
      image.src = link.href;
      stage.setAttribute('aria-label', korean ? '이미지 미리보기 영역' : 'Image preview area');
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
      modal.open(link, {
        title: (korean && link.dataset.previewTitleKo) || link.dataset.previewTitle || source.alt || (korean ? '이미지 미리보기' : 'Image preview'),
        closeLabel: korean ? '이미지 미리보기 닫기' : 'Close image preview',
        closeTip: korean ? '닫기' : 'Close'
      });
      sizeImage();
    });
  });
  function toggleZoom(event) {
    var point = event.currentTarget === image && event.detail > 0 ? { x: event.clientX, y: event.clientY } : null;
    if (canZoom) setZoom(!viewer.classList.contains('is-zoomed'), point);
  }
  zoom.addEventListener('click', toggleZoom);
  image.addEventListener('click', toggleZoom);
  image.addEventListener('load', sizeImage);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(sizeImage).observe(stage);
  } else {
    window.addEventListener('resize', sizeImage);
  }
})();
