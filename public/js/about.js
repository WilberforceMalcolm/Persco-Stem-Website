const slideOutBtn = document.querySelector(".fa-bars");
const slideInBtn = document.querySelector(".fa-xmark");

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate Elements on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.value-card, .team-member, .stat-item');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize Animation
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.value-card, .team-member, .stat-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    setTimeout(animateOnScroll, 300);
});

window.addEventListener('scroll', animateOnScroll);

slideOutBtn.addEventListener('click', () => {
    document.querySelector("header").classList.add('slide-out');
  
  });
  
  slideInBtn.addEventListener('click', () => {
    document.querySelector("header").classList.remove('slide-out');
  
  });


let startX;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diffX = endX - startX;


  if (startX < 50 && diffX > 50) {
    document.querySelector("header").classList.remove('slide-out');
  }

  if (startX > 50 && diffX < -50) {
    document.querySelector("header").classList.add('slide-out');
  }
});
