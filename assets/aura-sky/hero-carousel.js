(() => {
  const carousel = document.querySelector('[data-hero-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.hero-carousel-slide'));
  const selectors = Array.from(carousel.querySelectorAll('[data-carousel-select]'));
  const stage = carousel.querySelector('[data-carousel-stage]');
  const caption = carousel.querySelector('[data-carousel-caption]');
  let selected = 0;
  let gesture = null;
  let suppressClick = false;

  function select(index) {
    selected = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== selected;
      slide.toggleAttribute('inert', position !== selected);
    });
    selectors.forEach((button, position) => {
      button.setAttribute('aria-pressed', String(position === selected));
    });
    caption.textContent = `Your day at a glance on ${slides[selected].dataset.platform}. Select to see the full screenshot.`;
  }

  selectors.forEach((button, index) => button.addEventListener('click', () => select(index)));
  carousel.querySelector('[data-carousel-previous]').addEventListener('click', () => select(selected - 1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => select(selected + 1));
  carousel.addEventListener('keydown', (event) => {
    const destinations = { ArrowLeft: selected - 1, ArrowRight: selected + 1, Home: 0, End: slides.length - 1 };
    if (event.altKey || event.ctrlKey || event.metaKey || !(event.key in destinations)) return;
    event.preventDefault();
    // A focused image link is about to become inert; keep focus in the carousel.
    if (event.target.closest('.hero-carousel-slide')) selectors[selected].focus();
    select(destinations[event.key]);
  });

  stage.addEventListener('pointerdown', (event) => {
    suppressClick = false;
    if (!event.isPrimary || event.pointerType === 'mouse') return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  document.addEventListener('pointerup', (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.5) return;
    suppressClick = true;
    select(selected + (dx < 0 ? 1 : -1));
  });
  document.addEventListener('pointercancel', () => { gesture = null; });
  stage.addEventListener('click', (event) => {
    if (!suppressClick || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);

  select(0);
  carousel.querySelector('[data-carousel-controls]').hidden = false;
})();
