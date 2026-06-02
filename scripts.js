const stats = document.querySelectorAll('.stat-card');
const formatNumber = (value) => {
  return value.toLocaleString('en-US');
};

const animateStats = () => {
  stats.forEach((card) => {
    const valueEl = card.querySelector('.stat-value');
    const target = Number(card.getAttribute('data-target'));
    const currentText = Number(valueEl.textContent.replace(/,/g, ''));
    if (currentText >= target) return;

    const step = Math.max(1, Math.floor(target / 100));
    let current = currentText;
    const duration = 1200;
    const increment = Math.max(1, Math.ceil(target / (duration / 16)));

    const update = () => {
      current += increment;
      if (current >= target) {
        valueEl.textContent = formatNumber(target);
        return;
      }
      valueEl.textContent = formatNumber(current);
      requestAnimationFrame(update);
    };

    update();
  });
};

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.4 }
);

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

window.addEventListener('DOMContentLoaded', () => {
  const yearCard = document.querySelector('.stat-card[data-target="2005"] .stat-value');
  if (yearCard && yearCard.textContent.trim() === '0') {
    yearCard.textContent = '2005';
  }

  const accessibilityLaunch = document.getElementById('accessibility-launch');
  const accessibilityPanel = document.getElementById('accessibility-panel');
  if (accessibilityLaunch && accessibilityPanel) {
    accessibilityLaunch.addEventListener('click', () => {
      const open = accessibilityPanel.hasAttribute('hidden');
      if (open) {
        accessibilityPanel.removeAttribute('hidden');
      } else {
        accessibilityPanel.setAttribute('hidden', '');
      }
      accessibilityLaunch.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!accessibilityPanel.contains(target) && !accessibilityLaunch.contains(target)) {
        accessibilityPanel.setAttribute('hidden', '');
        accessibilityLaunch.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
