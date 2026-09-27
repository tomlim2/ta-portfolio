// Image-specific content and zoom inside the shared preview modal.
(function () {
  var links = document.querySelectorAll('a[data-image-viewer]');
  if (!links.length || !window.PreviewModal) return;

  var LOAD_TIMEOUT = 30000;
  var SVG_ZOOM = 1.5;
  var copy = {
    ko: {
      loading: '이미지 불러오는 중…', error: '이미지를 불러오지 못했습니다',
      errorHelp: '연결 상태를 확인한 뒤 다시 시도하거나 원본 이미지를 열어주세요.',
      retry: '다시 시도', original: '원본 열기', originalLabel: '원본 이미지 새 탭에서 열기',
      fit: '화면에 맞춤', actual: '원본 크기', svgZoom: '150% 확대',
      preview: '이미지 미리보기', stage: '이미지 미리보기 영역', close: '이미지 미리보기 닫기', closeTip: '닫기'
    },
    en: {
      loading: 'Loading image…', error: 'Could not load the image',
      errorHelp: 'Check your connection and try again, or open the original image.',
      retry: 'Try again', original: 'Open original', originalLabel: 'Open original image in a new tab',
      fit: 'Fit to screen', actual: 'Actual size', svgZoom: 'Zoom to 150%',
      preview: 'Image preview', stage: 'Image preview area', close: 'Close image preview', closeTip: 'Close'
    }
  };
  var labels = copy.en;
  var phase = 'idle';
  var source = null;
  var zoomRequested = false;
  var cancelRequest = null;

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
      setPhase('idle');
    }
  });
  var viewer = modal.element;
  var stage = viewer.querySelector('.image-viewer-stage');
  var image = viewer.querySelector('img');
  var zoom = viewer.querySelector('.image-viewer-zoom');
  var zoomIcon = zoom.querySelector('.material-symbols-outlined');
  var status = viewer.querySelector('.preview-status');
  var statusTitle = status.querySelector('.preview-status-title');
  var statusDescription = status.querySelector('.preview-status-description');
  var spinner = status.querySelector('.preview-status-spinner');
  var actions = status.querySelector('.preview-status-actions');
  var retry = status.querySelector('.image-viewer-retry');
  var original = status.querySelector('.image-viewer-original');

  // Each request owns its handlers and timeout, including cancellation cleanup.
  function requestImage(item, onReady, onFailure) {
    var nextImage = new Image();
    var active = true;
    var timer;
    nextImage.className = 'image-viewer-image';
    nextImage.alt = item.alt;

    function cleanUp() {
      active = false;
      clearTimeout(timer);
      nextImage.onload = null;
      nextImage.onerror = null;
    }
    function finish(success) {
      if (!active) return;
      cleanUp();
      if (success) onReady(nextImage);
      else {
        nextImage.removeAttribute('src');
        onFailure();
      }
    }
    nextImage.onload = function () { finish(true); };
    nextImage.onerror = function () { finish(false); };
    timer = setTimeout(function () { finish(false); }, LOAD_TIMEOUT);
    // Preserve the original URL, including any signed query parameters.
    nextImage.src = item.url;
    return function cancel() {
      if (!active) return;
      cleanUp();
      nextImage.removeAttribute('src');
    };
  }

  function cancelLoad() {
    if (cancelRequest) cancelRequest();
    cancelRequest = null;
  }

  function setPhase(nextPhase) {
    phase = nextPhase;
    // A retry hides its button; keep keyboard focus inside the modal.
    if (viewer.open && status.contains(document.activeElement)) modal.focusClose();
    stage.hidden = phase !== 'ready';
    status.hidden = phase === 'ready' || phase === 'idle';
    spinner.hidden = phase !== 'loading';
    statusDescription.hidden = phase !== 'error';
    actions.hidden = phase !== 'error';
    retry.disabled = phase !== 'error';
    statusTitle.textContent = phase === 'loading' ? labels.loading : phase === 'error' ? labels.error : '';
    if (phase !== 'ready') {
      zoomRequested = false;
      renderZoom(null);
    }
  }

  function loadImage() {
    cancelLoad();
    setPhase('loading');
    cancelRequest = requestImage(source, function (loadedImage) {
      cancelRequest = null;
      if (!viewer.open) return;
      image.replaceWith(loadedImage);
      image = loadedImage;
      setPhase('ready');
      sizeImage();
    }, function () {
      cancelRequest = null;
      if (viewer.open) setPhase('error');
    });
  }

  // Derive rendered zoom from intent and available space, never from CSS classes.
  function imageLayout() {
    if (phase !== 'ready' || !viewer.open || !image.complete ||
        !image.naturalWidth || !image.naturalHeight || !stage.clientWidth || !stage.clientHeight) return null;
    // Full stage bounds keep scrollbars from changing the fit baseline.
    var fitScale = Math.min(stage.offsetWidth / image.naturalWidth, stage.offsetHeight / image.naturalHeight);
    if (!source.svg) fitScale = Math.min(1, fitScale);
    var canZoom = source.svg || fitScale < 1;
    var enlarged = zoomRequested && canZoom;
    var scale = enlarged ? (source.svg ? fitScale * SVG_ZOOM : 1) : fitScale;
    return { canZoom: canZoom, enlarged: enlarged, width: image.naturalWidth * scale, height: image.naturalHeight * scale };
  }

  function renderZoom(layout) {
    var canZoom = !!(layout && layout.canZoom);
    var enlarged = !!(layout && layout.enlarged);
    if (!canZoom && document.activeElement === zoom) {
      if (phase === 'ready') stage.focus({ preventScroll: true });
      else modal.focusClose();
    }
    viewer.classList.toggle('can-zoom', canZoom);
    viewer.classList.toggle('is-zoomed', enlarged);
    zoom.hidden = !canZoom;
    zoom.disabled = !canZoom;
    zoom.setAttribute('aria-pressed', String(enlarged));
    zoomIcon.textContent = enlarged ? 'zoom_out' : 'zoom_in';
    var label = enlarged ? labels.fit : source && source.svg ? labels.svgZoom : labels.actual;
    zoom.setAttribute('aria-label', label);
    zoom.dataset.tip = label;
  }

  function sizeImage() {
    var layout = imageLayout();
    if (!layout) return;
    image.style.width = layout.width + 'px';
    image.style.height = layout.height + 'px';
    renderZoom(layout);
  }

  function toggleZoom(event) {
    var layout = imageLayout();
    if (!layout || !layout.canZoom) return;
    var before = image.getBoundingClientRect();
    var anchor = event.target === image && event.detail > 0
      ? { x: event.clientX, y: event.clientY }
      : { x: before.left + before.width / 2, y: before.top + before.height / 2 };
    var anchorX = Math.max(0, Math.min(1, (anchor.x - before.left) / before.width));
    var anchorY = Math.max(0, Math.min(1, (anchor.y - before.top) / before.height));
    zoomRequested = !layout.enlarged;
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

  function openImage(link) {
    var thumbnail = link.querySelector('img');
    if (!thumbnail) return false;
    var language = document.documentElement.lang;
    labels = copy[language] || copy.en;
    source = {
      url: link.href,
      alt: thumbnail.alt,
      svg: /\.svg$/i.test(new URL(link.href).pathname) || /^data:image\/svg\+xml[;,]/i.test(link.href)
    };
    statusDescription.textContent = labels.errorHelp;
    retry.textContent = labels.retry;
    original.textContent = labels.original;
    original.setAttribute('aria-label', labels.originalLabel);
    original.href = source.url;
    stage.setAttribute('aria-label', labels.stage);
    stage.scrollTop = 0;
    stage.scrollLeft = 0;
    modal.open(link, {
      title: (language === 'ko' && link.dataset.previewTitleKo) || link.dataset.previewTitle || source.alt || labels.preview,
      closeLabel: labels.close,
      closeTip: labels.closeTip
    });
    loadImage();
  }

  PreviewModal.bindLinks(links, openImage);
  // One listener survives image replacement after successful loads and retries.
  stage.addEventListener('click', function (event) {
    if (event.target === image) toggleZoom(event);
  });
  zoom.addEventListener('click', toggleZoom);
  retry.addEventListener('click', loadImage);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(sizeImage).observe(stage);
  } else {
    window.addEventListener('resize', sizeImage);
  }
})();
