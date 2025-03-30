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
  




  



  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const container = document.querySelector('.projects-carousel');
    let cards = Array.from(track.children);
  
    // Clone first & last cards to simulate loop
    const cloneFirst = cards.slice(0, 2).map(c => c.cloneNode(true));
    const cloneLast = cards.slice(-2).map(c => c.cloneNode(true));
  
    cloneFirst.forEach(c => track.appendChild(c));
    cloneLast.reverse().forEach(c => track.insertBefore(c, track.firstChild));
  
    // Adjust scroll to real first card
    const cardWidth = cards[0].offsetWidth + 32; // width + gap
    container.scrollLeft = cardWidth * 2;
  
    const allCards = track.querySelectorAll('.project-card');
  
    function updateActiveCard() {
      const center = container.scrollLeft + container.offsetWidth / 2;
      let closest = null;
      let closestDist = Infinity;
  
      allCards.forEach(card => {
        const box = card.getBoundingClientRect();
        const cardCenter = box.left + box.width / 2;
        const dist = Math.abs(window.innerWidth / 2 - cardCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = card;
        }
      });
  
      allCards.forEach(card => card.classList.remove('active'));
      if (closest) closest.classList.add('active');
    }
  
    container.addEventListener('scroll', () => {
      const maxScroll = track.scrollWidth - container.clientWidth;
  
      // Jump from end to start
      if (container.scrollLeft <= cardWidth) {
        container.scrollLeft = container.scrollLeft + (cardWidth * cards.length);
      }
  
      // Jump from start to end
      if (container.scrollLeft >= maxScroll - cardWidth) {
        container.scrollLeft = container.scrollLeft - (cardWidth * cards.length);
      }
  
      window.requestAnimationFrame(updateActiveCard);
    });
  
    updateActiveCard(); // initial highlight
  });
  