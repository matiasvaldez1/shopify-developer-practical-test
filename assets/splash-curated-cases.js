document.addEventListener('DOMContentLoaded', function() {
  function initTabbedCollections(sectionId) {
    const tabButtons = document.querySelectorAll(`#${sectionId} .tabbed-collections__tab`);
    const tabPanels = document.querySelectorAll(`#${sectionId} .tabbed-collections__panel`);

    function switchToTab(targetButton, targetTab) {
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      });

      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
      });

      targetButton.classList.add('active');
      targetButton.setAttribute('aria-selected', 'true');
      targetButton.setAttribute('tabindex', '0');

      const targetPanel = document.querySelector(`#${sectionId} [data-panel="${targetTab}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.setAttribute('aria-hidden', 'false');
      }
    }

    tabButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        switchToTab(this, targetTab);
      });

      button.addEventListener('keydown', function(e) {
        let targetIndex = index;

        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
            break;
          case 'ArrowRight':
            e.preventDefault();
            targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
            break;
          case 'Home':
            e.preventDefault();
            targetIndex = 0;
            break;
          case 'End':
            e.preventDefault();
            targetIndex = tabButtons.length - 1;
            break;
          default:
            return;
        }

        const targetButton = tabButtons[targetIndex];
        const targetTab = targetButton.getAttribute('data-tab');
        switchToTab(targetButton, targetTab);
        targetButton.focus();
      });

      if (index === 0) {
        button.setAttribute('tabindex', '0');
      } else {
        button.setAttribute('tabindex', '-1');
      }
    });

    const carousels = document.querySelectorAll(`#${sectionId} .carousel-container`);

    carousels.forEach(carousel => {
      const wrapper = carousel.querySelector('.carousel-wrapper');
      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevBtn = carousel.querySelector('.carousel-nav--prev');
      const nextBtn = carousel.querySelector('.carousel-nav--next');

      function updateButtonStates() {
        const scrollLeft = wrapper.scrollLeft;
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

        const atStart = scrollLeft <= 0;
        const atEnd = scrollLeft >= maxScroll - 1;

        prevBtn.setAttribute('aria-disabled', atStart);
        nextBtn.setAttribute('aria-disabled', atEnd);

        prevBtn.style.opacity = atStart ? '0.5' : '1';
        nextBtn.style.opacity = atEnd ? '0.5' : '1';
      }

      function scrollToPrevious() {
        const slideWidth = slides[0] ? slides[0].offsetWidth + 20 : 300;
        wrapper.scrollBy({
          left: -slideWidth * 2,
          behavior: 'smooth'
        });
      }

      function scrollToNext() {
        const slideWidth = slides[0] ? slides[0].offsetWidth + 20 : 300;
        wrapper.scrollBy({
          left: slideWidth * 2,
          behavior: 'smooth'
        });
      }

      prevBtn.addEventListener('click', scrollToPrevious);
      nextBtn.addEventListener('click', scrollToNext);

      wrapper.addEventListener('scroll', updateButtonStates);

      carousel.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowLeft':
            if (e.target === prevBtn || e.target === nextBtn) {
              e.preventDefault();
              scrollToPrevious();
            }
            break;
          case 'ArrowRight':
            if (e.target === prevBtn || e.target === nextBtn) {
              e.preventDefault();
              scrollToNext();
            }
            break;
        }
      });

      updateButtonStates();

      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          updateButtonStates();
        }, 250);
      });

      carousel.setAttribute('aria-live', 'polite');
      carousel.setAttribute('aria-atomic', 'false');
    });

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(`#${sectionId} *`).forEach(el => {
        el.style.transition = 'none';
      });
    }

    tabPanels.forEach(panel => {
      panel.addEventListener('focusin', () => {
        if (!panel.classList.contains('active')) {
          const associatedTab = document.querySelector(`#${sectionId} [aria-controls="${panel.id}"]`);
          if (associatedTab) {
            const targetTab = associatedTab.getAttribute('data-tab');
            switchToTab(associatedTab, targetTab);
          }
        }
      });
    });
  }

  // Initialize all tabbed collections sections on the page
  document.querySelectorAll('.tabbed-collections').forEach(section => {
    initTabbedCollections(section.id);
  });
});