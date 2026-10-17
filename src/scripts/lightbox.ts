const lightbox = document.getElementById('video-lightbox');
const iframe = document.getElementById('video-lightbox-iframe') as HTMLIFrameElement | null;
const closeBtn = document.getElementById('video-lightbox-close');

function toEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

document.querySelectorAll<HTMLElement>('[data-lightbox-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    const videoUrl = trigger.dataset.lightboxTrigger;
    if (!videoUrl || !lightbox || !iframe) return;
    iframe.src = toEmbedUrl(videoUrl);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  if (!lightbox || !iframe) return;
  lightbox.classList.remove('is-open');
  iframe.src = '';
  document.body.style.overflow = '';
}

closeBtn?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
