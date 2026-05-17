// Intro sequence: play bee flight, then unpause animations and reveal content
document.addEventListener('DOMContentLoaded', function () {
  const frames = document.querySelectorAll('.photo-frame');

  // polaroid click-to-select
  frames.forEach(frame => {
    frame.addEventListener('click', (e) => {
      frames.forEach(f => f.classList.remove('selected'));
      frame.classList.add('selected');
    });
    frame.addEventListener('mouseleave', () => {
      frame.classList.remove('selected');
    });
  });

  const bee = document.getElementById('intro-bee');
  const intro = document.querySelector('.intro-overlay');

  if (!bee || !intro) {
    // If intro markup is missing, just unpause immediately.
    document.body.classList.remove('container');
    return;
  }

  // start the bee flight
  requestAnimationFrame(() => bee.classList.add('fly'));

  // when bee finishes flying, fade intro and start the bloom
  bee.addEventListener('animationend', () => {
    intro.classList.add('hidden');

    // small delay to let the intro fade out
    setTimeout(() => {
      intro.remove();
      // unpause global animations (flowers, grass, etc.)
      document.body.classList.remove('container');
      // ensure gallery and title use their showAfterBloom timing from CSS
      // if you want them earlier/later, adjust animation-delay in CSS
    }, 650);
  });

  const envelope = document.getElementById('openEnvelope');
  const letterPanel = document.getElementById('letterPanel');
  const closeLetter = document.getElementById('closeLetter');

  if (envelope && letterPanel) {
    envelope.addEventListener('click', () => {
      letterPanel.classList.remove('hidden');
      letterPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (closeLetter && letterPanel) {
    closeLetter.addEventListener('click', () => {
      letterPanel.classList.add('hidden');
      envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
