  /*
    THRESHOLDS — what fraction of the page scroll (0–1)
    triggers each layer. Adjust to taste.

    0.05 = layer appears after 5% scroll
    0.25 = layer appears after 25% scroll
    … etc.
  */
  const layers = [
    { id: 'layer-1', dotIndex: 0, threshold: 0.02 },
    { id: 'layer-2', dotIndex: 1, threshold: 0.15 },
    { id: 'layer-3', dotIndex: 2, threshold: 0.20 },
    { id: 'layer-4', dotIndex: 3, threshold: 0.28 },
    { id: 'layer-5', dotIndex: 4, threshold: 0.38 },
  ];

  const progressFill = document.getElementById('progress-fill');
  const hint         = document.getElementById('hint');
  let hintGone       = false;

  function update() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;

    progressFill.style.width = Math.round(pct * 100) + '%';

    if (!hintGone && pct > 0.03) { hint.style.opacity = '0'; hintGone = true; }

    layers.forEach(l => {
      const el  = document.getElementById(l.id);
      const dot = document.getElementById('dot-' + l.dotIndex);
      const on  = pct >= l.threshold;
      el.classList.toggle('visible', on);
      dot.classList.toggle('active', on);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();