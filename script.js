document.addEventListener('load', () => {
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
  let originalCards = Array.from(track.children);

  const numClones = 2;
  const cardGap = 32; // match your CSS gap (2rem)

  // Clone first and last few cards
  const firstClones = originalCards.slice(0, numClones).map(c => c.cloneNode(true));
  const lastClones = originalCards.slice(-numClones).map(c => c.cloneNode(true));

  firstClones.forEach(c => track.appendChild(c));
  lastClones.reverse().forEach(c => track.insertBefore(c, track.firstChild));

  const allCards = track.querySelectorAll('.project-card');

  const cardWidth = originalCards[0].offsetWidth + cardGap;
  const jumpOffset = cardWidth * numClones;

  // Initial scroll to real first card
  container.scrollLeft = jumpOffset;

  function highlightCenterCard() {
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

  function handleScrollLoop() {
    const scrollLeft = container.scrollLeft;
    const maxScroll = track.scrollWidth - container.offsetWidth;

    if (scrollLeft <= cardWidth / 2) {
      container.scrollLeft = scrollLeft + (cardWidth * originalCards.length);
    } else if (scrollLeft >= maxScroll - (cardWidth * numClones)) {
      container.scrollLeft = scrollLeft - (cardWidth * originalCards.length);
    }

    highlightCenterCard();
  }

  container.addEventListener('scroll', () => {
    window.requestAnimationFrame(handleScrollLoop);
  });

  highlightCenterCard();
});
