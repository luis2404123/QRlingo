document.addEventListener('DOMContentLoaded', () => {
  // Navbar Background Change on Scroll
  const navbar = document.querySelector('.navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Smooth Scroll for Anchor Links
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

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      smoothScroll(this.getAttribute('href'));
    });
  });

  // Billing Toggle Functionality
  const billingToggle = document.getElementById('billingToggle');
  const basicPrice = document.getElementById('basicPrice');
  const proPrice = document.getElementById('proPrice');

  const prices = {
    basic: {
      monthly: 29,
      annual: 290, // Annual price with discount
    },
    pro: {
      monthly: 59,
      annual: 590, // Annual price with discount
    },
  };

  const updatePrices = (isAnnual) => {
    if (isAnnual) {
      basicPrice.textContent = `$${prices.basic.annual}/year`;
      proPrice.textContent = `$${prices.pro.annual}/year`;
    } else {
      basicPrice.textContent = `$${prices.basic.monthly}/month`;
      proPrice.textContent = `$${prices.pro.monthly}/month`;
    }
  };

  billingToggle.addEventListener('change', () => {
    updatePrices(billingToggle.checked);
  });

  // Initialize with monthly prices
  updatePrices(false);

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      item.classList.toggle('active');

      // Close others when one is opened
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
    });
  });

  // Language Section - View More Button Logic for Flags
  const flags = document.querySelectorAll('.flag-item');
  const toggleButton = document.getElementById('toggleLanguages');

  let currentIndex = 0;  // To track the current set
  const itemsPerSet = 3; // Number of flags per set

  // Function to display a set of flags
  const displayFlags = (start) => {
    // Hide all flags smoothly
    flags.forEach(flag => {
      flag.classList.remove('visible');
      setTimeout(() => flag.style.display = 'none', 500); // After fade-out, hide the flag
    });

    // Show the new set of flags smoothly
    setTimeout(() => {
      for (let i = start; i < start + itemsPerSet && i < flags.length; i++) {
        flags[i].style.display = 'block';
        setTimeout(() => flags[i].classList.add('visible'), 10); // Trigger fade-in
      }
    }, 500); // Delay the display until fade-out finishes
  };

  // Initially display the first set
  displayFlags(currentIndex);

  // On button click, cycle through sets of flags
  toggleButton.addEventListener('click', () => {
    // Update the current index to the next set of flags
    currentIndex += itemsPerSet;

    // If we reach the end of the flags, cycle back to the first set
    if (currentIndex >= flags.length) {
      currentIndex = 0;
    }

    // Display the new set of flags
    displayFlags(currentIndex);
  });
});
