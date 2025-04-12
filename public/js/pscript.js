
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slider = document.getElementById("slider");
const pagination = document.querySelector(".pagination");
const bkgVideo = document.querySelector(".video-bg video");
const fallBackImg = document.querySelector(".fall-back-img");

const slideOutBtn = document.querySelector(".fa-bars");
const slideInBtn = document.querySelector(".fa-xmark");

const footer = document.querySelector("footer");

let index = 0;
const totalSlides = images.length;
let autoSlide;

// Create Pagination Dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.setAttribute("data-index", i);
  pagination.appendChild(dot);
}

// Select all dots
const dots = document.querySelectorAll(".dot");

// Function to update slider & pagination
function updateSlider() {
  slides.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Next and Previous Controls
function nextSlide() {
  index = (index + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// Autoplay Function
function startAutoplay() {
  autoSlide = setInterval(nextSlide, 3000); // Change slide every 3 seconds
}

// Stop autoplay when user hovers
function stopAutoplay() {
  clearInterval(autoSlide);
}

// Dot Click Event
dots.forEach(dot => {
  dot.addEventListener("click", (e) => {
    index = parseInt(e.target.dataset.index);
    updateSlider();
    stopAutoplay();
    startAutoplay();
  });
});

// Add event listeners for buttons
nextBtn.addEventListener("click", () => {
  nextSlide();
  stopAutoplay();
  startAutoplay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  stopAutoplay();
  startAutoplay();
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

slides.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].clientX;
  if (touchStartX > touchEndX) {
    nextSlide();
  } else if (touchStartX < touchEndX) {
    prevSlide();
  }
  stopAutoplay();
  startAutoplay();
});

// Pause autoplay on hover
slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", startAutoplay);

// Start autoplay on page load & set active dot
startAutoplay();
updateSlider();




 setTimeout(function() {
    document.querySelector('.buttonWaitlist').style.opacity = '1';
}, 2000);

setTimeout(function() {
    document.querySelector('.buttonWaitlist a').style.backgroundColor = '#000000';
    document.querySelector('.buttonWaitlist a').style.color = '#fff';
}, 3000);

slideOutBtn.addEventListener('click', () => {
    document.querySelector("header").classList.add('slide-out');

});

slideInBtn.addEventListener('click', () => {
    document.querySelector("header").classList.remove('slide-out');

});




