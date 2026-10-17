document.querySelectorAll<HTMLDetailsElement>('.faq-single-item').forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll<HTMLDetailsElement>('.faq-single-item').forEach((other) => {
      if (other !== item && other.open) other.open = false;
    });
  });
});
