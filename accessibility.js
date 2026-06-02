const body = document.body;
const increaseText = document.getElementById('increase-text');
const decreaseText = document.getElementById('decrease-text');
const toggleContrast = document.getElementById('toggle-contrast');
let currentSize = 100;

const setBodyScale = (scale) => {
  currentSize = Math.min(130, Math.max(90, scale));
  document.documentElement.style.fontSize = `${currentSize}%`;
  localStorage.setItem('beresheetTextSize', currentSize);
};

const setContrast = (enabled) => {
  body.classList.toggle('high-contrast', enabled);
  localStorage.setItem('beresheetContrast', enabled ? '1' : '0');
};

increaseText.addEventListener('click', () => setBodyScale(currentSize + 10));
decreaseText.addEventListener('click', () => setBodyScale(currentSize - 10));
toggleContrast.addEventListener('click', () => setContrast(!body.classList.contains('high-contrast')));

window.addEventListener('DOMContentLoaded', () => {
  const storedSize = Number(localStorage.getItem('beresheetTextSize'));
  const storedContrast = localStorage.getItem('beresheetContrast');
  if (storedSize) setBodyScale(storedSize);
  if (storedContrast === '1') setContrast(true);

  const links = document.querySelectorAll('a, button');
  links.forEach((item) => {
    item.addEventListener('focus', () => item.classList.add('focus-visible'));
    item.addEventListener('blur', () => item.classList.remove('focus-visible'));
  });
});
