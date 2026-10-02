/**
 * Dr. Chinedu Mercedes Chidi-Ugbaja, Ph.D. - Website Interactivity
 * Matching UX & interactions of Barack Obama Books
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // 2. Hero Dropdown / Quick Links Toggle
  const heroDropdownBtn = document.getElementById('heroDropdownBtn');
  const retailerWrapper = document.getElementById('heroRetailerWrapper');

  if (heroDropdownBtn && retailerWrapper) {
    heroDropdownBtn.addEventListener('click', () => {
      const isExpanded = heroDropdownBtn.getAttribute('aria-expanded') === 'true';
      heroDropdownBtn.setAttribute('aria-expanded', !isExpanded);
      heroDropdownBtn.classList.toggle('expanded');
      
      if (!isExpanded) {
        retailerWrapper.style.maxHeight = retailerWrapper.scrollHeight + 'px';
      } else {
        retailerWrapper.style.maxHeight = '0px';
      }
    });
  }

  // 3. Citation Copying Functions with Toast Notification
  const toast = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  const citations = {
    paper1: `Chidi-Ugbaja, C. M., Dimkpa, D., Kennedy, M., & Agbor, P. E. O. (2026). Home Variables as Predictors of Child Sexual Abuse among Public Senior Secondary School Students in Rivers State, Nigeria [I]. International Journal of Innovative Psychology & Social Development, 14(3), 439-449. https://doi.org/10.5281/zenodo.22731887`,
    paper2: `Chidi-Ugbaja, C. M., Dimkpa, D., Kennedy, M., & Agbor, P. E. O. (2026). Home Variables as Predictors of Child Sexual Abuse among Public Senior Secondary School Students in Rivers State, Nigeria [II]. International Journal of Innovative Social Sciences & Humanities Research, 14(3), 452-458. https://doi.org/10.5281/zenodo.22731861`
  };

  const copyButtons = document.querySelectorAll('[data-copy-citation]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-copy-citation');
      const citationText = citations[key];
      if (citationText) {
        navigator.clipboard.writeText(citationText).then(() => {
          showToast('Citation copied to clipboard (APA 7th format)!');
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('textarea');
          tempInput.value = citationText;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast('Citation copied to clipboard!');
        });
      }
    });
  });

  // 4. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 5. Newsletter Sign Up Mock
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        showToast('Thank you for subscribing to research updates!');
        emailInput.value = '';
      }
    });
  }

  // 6. Active Navigation Highlighting on Scroll
  const sections = document.querySelectorAll('section[id], div[id].hero-module');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentId}`) {
        item.classList.add('active');
      }
    });
  });
});
