document.addEventListener('DOMContentLoaded', () => {
    console.log('Site loaded and interactive');
  });
  
  // Scroll-triggered fade-in for about cards
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".about-card");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1
    });
  
    cards.forEach(card => observer.observe(card));
  });
  