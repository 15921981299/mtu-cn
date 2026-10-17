document.querySelectorAll<HTMLElement>('.form-tab-link').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.form-tab-link').forEach((el) => el.classList.remove('active'));
    document.querySelectorAll('.form-tab-pane').forEach((el) => el.classList.remove('active'));
    tab.classList.add('active');
    const id = tab.dataset.tab;
    document.getElementById(`tab-${id}`)?.classList.add('active');
  });
});

document.querySelectorAll<HTMLElement>('.pricing-plan-tab-link').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pricing-plan-tab-link').forEach((el) => el.classList.remove('active'));
    document.querySelectorAll('.pricing-plan-tab-pane').forEach((el) => el.classList.remove('active'));
    tab.classList.add('active');
    const id = tab.dataset.pricingTab;
    document.getElementById(`pricing-${id}`)?.classList.add('active');
  });
});
