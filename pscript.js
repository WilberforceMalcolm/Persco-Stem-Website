
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slider = document.getElementById("slider");
const pagination = document.querySelector(".pagination");

const slideOutBtn = document.querySelector(".fa-bars");
const slideInBtn = document.querySelector(".fa-xmark");

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




const apikey = '700489f0db7c35dc3a5da2badd3fc68b';
const url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;

fetch(url)
  .then(response => response.json())
  .then(data => {
    let articles = data.articles;
    let output = '';
    
    articles.forEach(article => {
      output += `
        <div>
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <img src="${article.image}">
          <p>${article.publisedAt}<p>
          <p>${article.source.name}<p>
          <p>${article.source.url}<p>
        </div>
      `;
    });

    document.getElementById('blogContainer').innerHTML = output;
  })
  .catch(error => console.log('Error:', error));












