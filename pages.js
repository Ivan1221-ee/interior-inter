const toggle = document.querySelector('.m-menu-toggle');
toggle.addEventListener('click', () => {
  const menu = document.getElementById('info-menu');
  menu.hidden = !menu.hidden;
  toggle.setAttribute('aria-expanded', String(!menu.hidden));
  toggle.setAttribute('aria-label', menu.hidden ? 'Открыть меню' : 'Закрыть меню');
});
document.fonts.ready.then(() => {
  const ctx = document.createElement('canvas').getContext('2d');
  document.querySelectorAll('.copy').forEach(item => {
    const style = getComputedStyle(item);
    ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const metrics = ctx.measureText('Hg');
    const size = parseFloat(style.fontSize);
    item.style.setProperty('--baseline-offset', `${-(metrics.fontBoundingBoxAscent-metrics.fontBoundingBoxDescent+size)/2}px`);
  });
});
