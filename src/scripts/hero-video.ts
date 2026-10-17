const video = document.querySelector<HTMLVideoElement>('.hero-video-element');
const poster = document.querySelector<HTMLElement>('.hero-video-poster');

if (video) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (prefersReducedMotion || isMobile) {
    video.removeAttribute('autoplay');
    video.pause();
    video.style.display = 'none';
    poster?.classList.add('is-visible');
  } else {
    poster?.classList.remove('is-visible');
  }
}
