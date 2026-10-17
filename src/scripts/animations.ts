const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target as HTMLElement;
      const siblings = Array.from(
        target.parentElement?.querySelectorAll(':scope > .fade-in, :scope > .fade-in-blur') ?? []
      );
      const index = siblings.indexOf(target);
      const delay = index >= 0 ? index * 60 : 0;
      setTimeout(() => target.classList.add('is-visible'), delay);
      fadeObserver.unobserve(target);
    });
  },
  { threshold: 0, rootMargin: '0px 0px -10% 0px' }
);

document.querySelectorAll('.fade-in, .fade-in-blur').forEach((el) => fadeObserver.observe(el));

document.querySelectorAll('.stat-number-block').forEach((block) => {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-animated');
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  statObserver.observe(block);
});
