document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.splash-hero__carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.splash-hero__slide');
  const dots = carousel.querySelectorAll('.splash-hero__dot');
  const prevBtn = carousel.querySelector('.splash-hero__control--prev');
  const nextBtn = carousel.querySelector('.splash-hero__control--next');
  const playPauseBtn = carousel.querySelector('.splash-hero__play-pause');
  const playPauseText = playPauseBtn?.querySelector('.play-pause-text');

  let currentSlide = 0;
  let isPlaying = true;

  function showSlide(index, focus = false) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i !== index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index);
      if (focus && i === index) {
        dot.focus();
      }
    });

    currentSlide = index;

    carousel.setAttribute('aria-live', 'polite');
  }

  function prevSlide() {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    showSlide(newIndex);
  }

  function nextSlide() {
    const newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  }

  function togglePlayPause() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playPauseBtn.setAttribute('aria-label', 'Pause carousel');
      if (playPauseText) playPauseText.textContent = 'Pause';
    } else {
      playPauseBtn.setAttribute('aria-label', 'Play carousel');
      if (playPauseText) playPauseText.textContent = 'Play';
    }
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index, true));

    dot.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = index === 0 ? dots.length - 1 : index - 1;
          showSlide(prevIndex, true);
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (index + 1) % dots.length;
          showSlide(nextIndex, true);
          break;
        case 'Home':
          e.preventDefault();
          showSlide(0, true);
          break;
        case 'End':
          e.preventDefault();
          showSlide(dots.length - 1, true);
          break;
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', togglePlayPause);
  }

  carousel.addEventListener('keydown', (e) => {
    switch(e.key) {
      case 'ArrowLeft':
        if (e.target.classList.contains('splash-hero__carousel')) {
          e.preventDefault();
          prevSlide();
        }
        break;
      case 'ArrowRight':
        if (e.target.classList.contains('splash-hero__carousel')) {
          e.preventDefault();
          nextSlide();
        }
        break;
      case ' ':
      case 'Spacebar':
        if (e.target === playPauseBtn) {
          e.preventDefault();
          togglePlayPause();
        }
        break;
    }
  });

  showSlide(0);

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isPlaying = false;
    if (playPauseBtn) {
      playPauseBtn.setAttribute('aria-label', 'Play carousel');
      if (playPauseText) playPauseText.textContent = 'Play';
    }
  }
});