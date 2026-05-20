// ===== ナビゲーション アクティブ =====
(function() {
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (
      (path.endsWith('index.html') || path === '/' || path.endsWith('/')) && href === 'index.html' ||
      path.includes('illustration') && href.includes('illustration') ||
      path.includes('manga') && href.includes('manga') ||
      path.includes('price') && href.includes('price') ||
      path.includes('about') && href.includes('about') ||
      path.includes('contact') && href.includes('contact')
    ) {
      a.classList.add('active');
    }
  });
})();

// ===== LIGHTBOX (イラスト用) =====
let lbSrcs = [];
let lbIdx = 0;

function openLightbox(srcs, idx) {
  lbSrcs = srcs;
  lbIdx = idx;
  _updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function moveLightbox(dir) {
  lbIdx = (lbIdx + dir + lbSrcs.length) % lbSrcs.length;
  _updateLightbox();
}
function _updateLightbox() {
  document.getElementById('lb-img').src = lbSrcs[lbIdx];
  document.getElementById('lb-counter').textContent = (lbIdx + 1) + ' / ' + lbSrcs.length;
}

document.addEventListener('DOMContentLoaded', function() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function(e) { if (e.target === lb) closeLightbox(); });
  }
});
document.addEventListener('keydown', function(e) {
  const lb = document.getElementById('lightbox');
  const mm = document.getElementById('manga-modal');
  if (lb && lb.classList.contains('open')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') moveLightbox(-1);
    if (e.key === 'ArrowRight') moveLightbox(1);
  }
  if (mm && mm.classList.contains('open') && e.key === 'Escape') closeMangaModal();
});

// ===== MANGA MODAL =====
function openMangaModal(title, imgPaths) {
  const modal = document.getElementById('manga-modal');
  document.getElementById('manga-modal-title').textContent = title;
  const body = document.getElementById('manga-modal-body');
  body.innerHTML = '';
  imgPaths.forEach(function(src, i) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = title + ' p.' + (i + 1);
    img.loading = 'lazy';
    body.appendChild(img);
  });
  body.scrollTop = 0;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMangaModal() {
  document.getElementById('manga-modal').classList.remove('open');
  document.body.style.overflow = '';
}
