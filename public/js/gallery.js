// Sample media data (images + videos)
const mediaData = [
  {
    id: 1,
    type: "image",
    src: "/images/g1.jpg",
    title: "Competition at Pope Johns",
    description: "Beautiful view of mountains at sunrise",
  },
  {
    id: 2,
    type: "video",
    src: "/videos/project.mp4",
    title: "",
    description: "",
  },
  {
    id: 3,
    type: "image",
    src: "/images/g2.jpg",
    title: "",
    description: "",
  },
  {
    id: 4,
    type: "video",
    src: "/videos/pj.mp4",
    title: "",
    description: "",
  },
  {
    id: 5,
    type: "image",
    src: "/images/g3.jpg",
    title: "",
    description: "",
  },
  {
    id: 6,
    type: "video",
    src: "/videos/3141210-uhd_3840_2160_25fps.mp4",
    title: "",
    description: "",
  },
  {
    id: 7,
    type: "image",
    src: "/images/g4.jpg",
    title: "",
    description: "",
  },
  {
    id: 8,
    type: "image",
    src: "/images/g5.jpg",
    title: "",
    description: "W",
  },
  {
    id: 9,
    type: "image",
    src: "/images/g6.jpg",
    title: "",
    description: "",
  },
  {
    id: 10,
    type: "image",
    src: "/images/g7.jpg",
    title: "",
    description: "",
  },
  {
    id: 11,
    type: "image",
    src: "/images/g8.jpg",
    title: "",
    description: "",
  },
  
];

// DOM Elements
const galleryGrid = document.querySelector(".gallery-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const loadMoreBtn = document.getElementById("load-more-btn");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxVideo = document.querySelector(".lightbox-video");
const mediaTitle = document.querySelector(".media-title");
const mediaDesc = document.querySelector(".media-description");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Variables
let currentFilter = "all";
let currentMediaIndex = 0;
let displayedItems = 4;
const itemsPerLoad = 2;

// Initialize gallery
function initGallery() {
  renderMediaItems(mediaData.slice(0, displayedItems));
  setupEventListeners();
}

// Render media items
function renderMediaItems(items) {
  galleryGrid.innerHTML = "";

  items.forEach((item, index) => {
    if (currentFilter === "all" || item.type === currentFilter) {
      const galleryItem = document.createElement("div");
      galleryItem.className = `gallery-item ${item.type}`;
      galleryItem.dataset.index = index;

      if (item.type === "image") {
        galleryItem.innerHTML = `
          <img src="${item.src}" alt="${item.title}" class="gallery-media">
          <div class="item-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `;
      } else if (item.type === "video") {
        galleryItem.innerHTML = `
          <video class="gallery-media" poster="https://via.placeholder.com/800x600?text=Video+Thumbnail">
            <source src="${item.src}" type="video/mp4">
          </video>
          <i class="fas fa-play video-icon"></i>
          <div class="item-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `;
      }

      galleryItem.addEventListener("click", () => openLightbox(index));
      galleryGrid.appendChild(galleryItem);
    }
  });
}

// Filter media items
function filterGallery(filter) {
  currentFilter = filter;
  displayedItems = 4; // Reset displayed items when filtering
  const filteredItems = mediaData.slice(0, displayedItems);
  renderMediaItems(filteredItems);

  // Update active button
  filterButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.filter === filter) {
      btn.classList.add("active");
    }
  });
}

// Open lightbox
function openLightbox(index) {
  currentMediaIndex = parseInt(index);
  const filteredItems =
    currentFilter === "all"
      ? mediaData
      : mediaData.filter((item) => item.type === currentFilter);

  const item = filteredItems[currentMediaIndex];

  if (item.type === "image") {
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
  } else if (item.type === "video") {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.querySelector("source").src = item.src;
    lightboxVideo.load();
  }

  mediaTitle.textContent = item.title;
  mediaDesc.textContent = item.description;

  lightbox.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("show");
  document.body.style.overflow = "auto";
  if (lightboxVideo.style.display === "block") {
    lightboxVideo.pause();
  }
}

// Navigate lightbox
function navigateLightbox(direction) {
  const filteredItems =
    currentFilter === "all"
      ? mediaData
      : mediaData.filter((item) => item.type === currentFilter);

  if (direction === "prev") {
    currentMediaIndex = (currentMediaIndex - 1 + filteredItems.length) % filteredItems.length;
  } else {
    currentMediaIndex = (currentMediaIndex + 1) % filteredItems.length;
  }

  const item = filteredItems[currentMediaIndex];

  if (item.type === "image") {
    lightboxImg.style.display = "block";
    lightboxVideo.style.display = "none";
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
  } else if (item.type === "video") {
    lightboxImg.style.display = "none";
    lightboxVideo.style.display = "block";
    lightboxVideo.querySelector("source").src = item.src;
    lightboxVideo.load();
  }

  mediaTitle.textContent = item.title;
  mediaDesc.textContent = item.description;
}

// Load more items
function loadMoreItems() {
  displayedItems += itemsPerLoad;
  const itemsToShow = mediaData.slice(0, displayedItems);
  renderMediaItems(itemsToShow);

  // Hide load more button if all items are displayed
  if (displayedItems >= mediaData.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => filterGallery(btn.dataset.filter));
  });

  // Lightbox
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => navigateLightbox("prev"));
  nextBtn.addEventListener("click", () => navigateLightbox("next"));

  // Close lightbox when clicking outside media
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("show")) {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        navigateLightbox("prev");
      } else if (e.key === "ArrowRight") {
        navigateLightbox("next");
      }
    }
  });

  // Load more button
  loadMoreBtn.addEventListener("click", loadMoreItems);
}

// Initialize the gallery when DOM is loaded
document.addEventListener("DOMContentLoaded", initGallery);

document.querySelector(".home-btn").addEventListener("mouseenter", () => {
  document.querySelector(".home-btn svg").style.fill = "white";
});

document.querySelector(".home-btn").addEventListener("mouseleave", () => {
  document.querySelector(".home-btn svg").style.fill = "  rgb(11, 247, 255)";
})
  
