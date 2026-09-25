// Resume content and download inside the shared preview modal.
(function () {
  var links = document.querySelectorAll('a[data-resume-viewer]');
  if (!links.length || !window.PreviewModal) return;
  var root = new URL('../', document.currentScript.src);
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

  links.forEach(function (link) {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      var korean = document.documentElement.lang === 'ko';
      download.setAttribute('aria-label', korean ? '이력서 PDF 다운로드' : 'Download resume PDF');
      download.dataset.tip = korean ? 'PDF 다운로드' : 'Download PDF';
      frame.title = korean ? '임연수 이력서' : 'Younsoo Lim resume';
      frame.src = new URL('resume.html', root).href;
      modal.open(link, {
        title: download.download,
        closeLabel: korean ? '이력서 닫기' : 'Close resume',
        closeTip: korean ? '닫기' : 'Close'
      });
    });
  });
})();
