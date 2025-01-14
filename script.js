document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('[data-carousel]');
  const slides = carousel.querySelector('[data-slides]');
  const slideCount = slides.children.length;
  let isTransitioning = false;

  // Create dots navigation
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      if (!isTransitioning) goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }
  
  carousel.appendChild(dotsContainer);

  // Enhanced button functionality
  const buttons = document.querySelectorAll('[data-carousel-button]');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (isTransitioning) return;
      
      const offset = button.dataset.carouselButton === 'next' ? 1 : -1;
      const activeSlide = slides.querySelector('[data-active]');
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;
      
      updateSlide(newIndex);
    });
  });

  // Auto-advance slides
  let slideInterval = setInterval(() => {
    if (!isTransitioning) {
      const activeSlide = slides.querySelector('[data-active]');
      let newIndex = [...slides.children].indexOf(activeSlide) + 1;
      if (newIndex >= slides.children.length) newIndex = 0;
      updateSlide(newIndex);
    }
  }, 7000); // Increased interval to 7 seconds

  // Pause auto-advance on hover
  carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
  carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      if (!isTransitioning) {
        const activeSlide = slides.querySelector('[data-active]');
        let newIndex = [...slides.children].indexOf(activeSlide) + 1;
        if (newIndex >= slides.children.length) newIndex = 0;
        updateSlide(newIndex);
      }
    }, 7000);
  });

  function updateSlide(newIndex) {
    isTransitioning = true;
    const activeSlide = slides.querySelector('[data-active]');
    const currentIndex = [...slides.children].indexOf(activeSlide);
    const dots = dotsContainer.querySelectorAll('.dot');
    
    // Remove active class from current slide
    activeSlide.classList.add('previous');
    delete activeSlide.dataset.active;
    
    // Add active class to new slide
    slides.children[newIndex].dataset.active = true;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[newIndex].classList.add('active');

    // Reset transition state after animation
    setTimeout(() => {
      activeSlide.classList.remove('previous');
      isTransitioning = false;
    }, 800);
  }

  function goToSlide(index) {
    if (isTransitioning) return;
    const activeSlide = slides.querySelector('[data-active]');
    const currentIndex = [...slides.children].indexOf(activeSlide);
    if (currentIndex !== index) {
      updateSlide(index);
    }
  }

  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
});