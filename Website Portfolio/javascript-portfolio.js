// Activate navbar
const navLinks = document.querySelectorAll("#navbar ul li a");

function activateNavLinksOnScroll() {
  const scrollPos = window.scrollY + 80;

  let currentSectionId = '#intro';

  navLinks.forEach(link => {
    if (!link.hash) return;
    const section = document.querySelector(link.hash);
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSectionId = link.hash;
    }
  });

  navLinks.forEach(link => {
    if (link.hash === currentSectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener("scroll", activateNavLinksOnScroll);
activateNavLinksOnScroll();


// Smooth scroll
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.hash);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Skills section fade and skill bars fill animation
const skillsSection = document.getElementById('skills');
const skillFills = document.querySelectorAll('.skill-fill');

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillsSection.classList.add('visible');
      skillFills.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 100);
      });
    } else {
      skillsSection.classList.remove('visible');
      skillFills.forEach(bar => {
        bar.style.width = '0%';
      });
    }
  });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);