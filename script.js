const images = [
  "images/bg_1.webp",
  "images/hero_image_3.webp",
  "images/bg_4.webp",
];

const heroBg = document.querySelector(".hero-bg");
let sliderInterval = null;

function startHeroSlider() {
  if (!heroBg) return;

  const isMobile = window.innerWidth <= 768;

  // Clear previous interval
  if (sliderInterval) {
    clearInterval(sliderInterval);
    sliderInterval = null;
  }

  if (isMobile) {
    // 📱 MOBILE → static image
    heroBg.style.opacity = 1;
    heroBg.style.backgroundImage = "url(images/bg_1.webp)";
  } else {
    // 🖥️ DESKTOP → rotating images
    let index = 0;
    heroBg.style.backgroundImage = `url(${images[index]})`;

    sliderInterval = setInterval(() => {
      heroBg.style.opacity = 0;

      setTimeout(() => {
        index = (index + 1) % images.length;
        heroBg.style.backgroundImage = `url(${images[index]})`;
        heroBg.style.opacity = 1;
      }, 600);
    }, 5000);
  }
}

/* Run on load */
startHeroSlider();

/* Re-run on resize (important) */
window.addEventListener("resize", startHeroSlider);


// NAVBAR ACTIVE LINK BASED ON SCROLL
const homeSection = document.querySelector("#home");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

sections.forEach(section => {
  const sectionTop = section.offsetTop - 160;
  const sectionHeight = section.offsetHeight;

  if (
    window.scrollY >= sectionTop &&
    window.scrollY < sectionTop + sectionHeight
  ) {
    currentSection = section.id;
  }
});
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});

// ================= LAZY LOAD GOOGLE MAP =================
const mapIframe = document.querySelector(".contact-map iframe");

if (mapIframe) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mapIframe.src = mapIframe.dataset.src;
          obs.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(mapIframe);
}



