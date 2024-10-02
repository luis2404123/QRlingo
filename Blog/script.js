document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const searchInput = document.querySelector('.search-input'); // Get the search input field
  const blogCards = document.querySelectorAll('.blog-card');   // Get all blog cards

  // Function to change navbar background on scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  // Event listener for scrolling to change navbar background
  window.addEventListener('scroll', handleScroll);

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // Smooth scrolling for internal anchor links
  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    const headerOffset = navbar.offsetHeight;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });

  // Form validation
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

  // Function to filter blog posts based on the search query
  const filterBlogs = (query) => {
    blogCards.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase(); // Get the title from the data-title attribute
      if (title.includes(query)) {
        card.style.display = 'block';  // Show blog card if it matches the search query
      } else {
        card.style.display = 'none';   // Hide blog card if it doesn't match
      }
    });
  };

  // Event listener for input in the search bar
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase(); // Convert the input to lowercase for case-insensitive search
    filterBlogs(query);  // Call the filter function with the search query
  });
});
