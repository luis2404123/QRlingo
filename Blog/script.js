document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const searchInput = document.querySelector('.search-input');
  const blogCards = document.querySelectorAll('.blog-card');

  // Check if navbar exists before adding scroll event listener
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
  }

  // Check if mobile toggle button exists before adding click event listener
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }

  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const element = document.querySelector(this.getAttribute('href'));
      const headerOffset = navbar ? navbar.offsetHeight : 0;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    });
  });

  // Form validation
  if (form) {
    const form = document.querySelector('.cta-form');
    form.addEventListener('submit', (e) => {
      const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
      const email = form.querySelector('input[placeholder="Your Email"]').value.trim();
      const company = form.querySelector('input[placeholder="Company Name"]').value.trim();
      const message = form.querySelector('textarea[placeholder="Message"]').value.trim();

      if (!name || !email || !company || !message) {
        e.preventDefault();
        alert("Please fill out all fields before submitting the form.");
      }
    });
  }

  // Blog search functionality
  if (searchInput && blogCards) {
    const filterBlogs = (query) => {
      blogCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      filterBlogs(query);
    });
  }
});
