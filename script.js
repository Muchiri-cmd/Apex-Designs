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


  const categoryButtons = document.querySelectorAll(".category-btn");
  const projects = document.querySelectorAll(".project-card");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and add to the clicked one
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Get the selected category
      const category = button.textContent.trim();

      // Show/hide projects based on the selected category
      projects.forEach(project => {
        if (category === "Combined samples") {
          project.style.display = "block";
        } else {
          const projectCategories = project.getAttribute("data-category");
          if (projectCategories.includes(category)) {
            project.style.display = "block";
          } else {
            project.style.display = "none";
          }
        }
      });
    });
  });



  const observerOptions = {
    threshold: 0.25
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start all animations when section comes into view
        startCountAnimations();
        // Unobserve after triggering
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe the stats section
  observer.observe(document.querySelector('.stats'));

  function startCountAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // Animation duration in milliseconds
      const steps = 100; // Number of steps in animation
      const increment = target / steps;
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.round(current).toLocaleString() + (counter.dataset.target === "99" ? "%" : "+");
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target.toLocaleString() + (counter.dataset.target === "99" ? "%" : "+");
        }
      };
      
      updateCounter();
    });
  }

  const scrollButton = document.getElementById('scrollTop');
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
      }
    });
    
    // Smooth scroll to top
    scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

});