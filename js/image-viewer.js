// Image-specific content and zoom inside the shared preview modal.
(function () {
  var links = document.querySelectorAll('a[data-image-viewer]');
  if (!links.length || !window.PreviewModal) return;
  var modal = PreviewModal.create({
    className: 'image-viewer',
    actionHTML: '<button type="button" class="btn btn--ghost btn--icon image-viewer-zoom" aria-pressed="false" hidden disabled>' +
      '<span class="material-symbols-outlined icon-sm" aria-hidden="true">zoom_in</span></button>',
    bodyHTML: '<div class="image-viewer-stage" tabindex="0"><img class="image-viewer-image" alt=""></div>' +
      '<div class="preview-status" hidden>' +
      '<div class="preview-status-copy" role="status" aria-live="polite" aria-atomic="true">' +
      '<span class="preview-status-spinner" aria-hidden="true"></span>' +
      '<p class="preview-status-title"></p><p class="preview-status-description" hidden></p></div>' +
      '<div class="preview-status-actions" hidden>' +
      '<button type="button" class="btn image-viewer-retry"></button>' +
      '<a class="btn btn--ghost image-viewer-original" target="_blank" rel="noopener"></a>' +
      '</div></div>',
    onClose: function () {
      cancelLoad();
      image.removeAttribute('src');
    }
  });
  var viewer = modal.element;
  var stage = viewer.querySelector('.image-viewer-stage');
  var image = viewer.querySelector('img');
  var zoom = viewer.querySelector('.image-viewer-zoom');
  var status = viewer.querySelector('.preview-status');
  var statusTitle = status.querySelector('.preview-status-title');
  var statusDescription = status.querySelector('.preview-status-description');
  var spinner = status.querySelector('.preview-status-spinner');
  var actions = status.querySelector('.preview-status-actions');
  var retry = status.querySelector('.image-viewer-retry');
  var original = status.querySelector('.image-viewer-original');
  var close = viewer.querySelector('.preview-modal-close');
  var korean = true;
  var canZoom = false;
  var isSvg = false;
  var zoomRequested = false;
  var sourceUrl = '';
  var sourceAlt = '';
  var pendingImage = null;
  var loadId = 0;
  var loadTimer = null;

  function cancelLoad() {
    loadId++;
    clearTimeout(loadTimer);
    if (pendingImage) {
      pendingImage.removeAttribute('src');
      pendingImage = null;
    }
  }

  function showState(state) {
    // A retry hides its button; keep keyboard focus inside the modal.
    if (status.contains(document.activeElement)) close.focus({ preventScroll: true });
    stage.hidden = state !== 'ready';
    status.hidden = state === 'ready';
    spinner.hidden = state !== 'loading';
    statusDescription.hidden = state !== 'error';
    actions.hidden = state !== 'error';
    retry.disabled = state !== 'error';
    if (state === 'ready') {
      statusTitle.textContent = '';
      return;
    }
    canZoom = false;
    zoomRequested = false;
    updateZoom(false);
    statusTitle.textContent = state === 'loading'
      ? (korean ? '이미지 불러오는 중…' : 'Loading image…')
      : (korean ? '이미지를 불러오지 못했습니다' : 'Could not load the image');
    statusDescription.textContent = korean
      ? '연결 상태를 확인한 뒤 다시 시도하거나 원본 이미지를 열어주세요.'
      : 'Check your connection and try again, or open the original image.';
    retry.textContent = korean ? '다시 시도' : 'Try again';
    original.textContent = korean ? '원본 열기' : 'Open original';
    original.setAttribute('aria-label', korean ? '원본 이미지 새 탭에서 열기' : 'Open original image in a new tab');
    original.href = sourceUrl;
  }

  function loadImage() {
    cancelLoad();
    var requestId = loadId;
    showState('loading');
    var nextImage = new Image();
    pendingImage = nextImage;
    nextImage.className = 'image-viewer-image';
    nextImage.alt = sourceAlt;
    nextImage.addEventListener('click', toggleZoom);
    nextImage.addEventListener('load', function () {
      if (requestId !== loadId || !viewer.open) return;
      clearTimeout(loadTimer);
      pendingImage = null;
      image.replaceWith(nextImage);
      image = nextImage;
      showState('ready');
      sizeImage();
    });
    function failed() {
      if (requestId !== loadId || !viewer.open) return;
      cancelLoad();
      showState('error');
    }
    nextImage.addEventListener('error', failed);
    loadTimer = setTimeout(failed, 30000);
    // Preserve the original URL, including any signed query parameters.
    nextImage.src = sourceUrl;
  }

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
      sourceAlt = source.alt;
      sourceUrl = link.href;
      stage.setAttribute('aria-label', korean ? '이미지 미리보기 영역' : 'Image preview area');
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
      modal.open(link, {
        title: (korean && link.dataset.previewTitleKo) || link.dataset.previewTitle || source.alt || (korean ? '이미지 미리보기' : 'Image preview'),
        closeLabel: korean ? '이미지 미리보기 닫기' : 'Close image preview',
        closeTip: korean ? '닫기' : 'Close'
      });
      loadImage();
    });
  });
  function toggleZoom(event) {
    var point = event.currentTarget === image && event.detail > 0 ? { x: event.clientX, y: event.clientY } : null;
    if (canZoom) setZoom(!viewer.classList.contains('is-zoomed'), point);
  }
  zoom.addEventListener('click', toggleZoom);
  retry.addEventListener('click', loadImage);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(sizeImage).observe(stage);
  } else {
    window.addEventListener('resize', sizeImage);
  }
})();
