// Resume content and download inside the shared preview modal.
(function () {
  var links = document.querySelectorAll('a[data-resume-viewer]');
  if (!links.length || !window.PreviewModal) return;
  var root = new URL('../', document.currentScript.src);
  var documentUrl = new URL('resume.html', root).href;
  var copy = {
    ko: { download: '이력서 PDF 다운로드', downloadTip: 'PDF 다운로드', title: '임연수 이력서', close: '이력서 닫기', closeTip: '닫기' },
    en: { download: 'Download resume PDF', downloadTip: 'Download PDF', title: 'Younsoo Lim resume', close: 'Close resume', closeTip: 'Close' }
  };
  var modal = PreviewModal.create({
    className: 'resume-viewer',
    actionHTML: '<a class="btn btn--ghost btn--icon resume-toolbar-download" download="Younsoo-Lim-Resume.pdf">' +
      '<span class="material-symbols-outlined icon-sm" aria-hidden="true">download</span></a>',
    bodyHTML: '<iframe class="resume-document"></iframe>',
    onClose: function () { frame.removeAttribute('src'); }
  });
  var download = modal.element.querySelector('.resume-toolbar-download');
  var frame = modal.element.querySelector('iframe');
  download.href = new URL('assets/resume.pdf', root).href;
  modal.connectFrame(frame);

  PreviewModal.bindLinks(links, function (link) {
    var labels = copy[document.documentElement.lang] || copy.en;
    download.setAttribute('aria-label', labels.download);
    download.dataset.tip = labels.downloadTip;
    frame.title = labels.title;
    frame.src = documentUrl;
    modal.open(link, {
      title: download.download,
      closeLabel: labels.close,
      closeTip: labels.closeTip
    });
  });
})();
