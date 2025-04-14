// Sample gallery data
const galleryData = [
    {
      id: 1,
      src: 'images/g1.jpg',
      title: 'Stemnnovation',
      description: 'Regionals for Stemnnovation 2024',
      category: 'Achievements & Competitions'
    },
    {
      id: 2,
      src: '/images/g2.jpg',
      title: 'Tour',
      description: 'Robotics tour',
      category: 'Achievements & Competitions'
    },
    {
      id: 3,
      src: '/images/g3.jpg',
      title: 'Team Portrait',
      description: 'Group of innovative students in persco',
      category: 'People'
    },
    {
      id: 4,
      src: '/images/g4.jpg',
      title: 'Workshop',
      description: 'Learning to Impact',
      category: 'Achievements & Competitions'
    },
    {
      id: 5,
      src: '/images/g5.jpg',
      title: 'Workshop and sessions',
      description: 'Learning to impact',
      category: 'Achievements & Competitions'
    },
    {
      id: 6,
      src: '/images/g6.jpg',
      title: 'Workshop',
      description: 'Collaborating with other bright minds across the country',
      category: 'Achievements & Competitions'
    },
    {
      id: 7,
      src: '/images/g7.jpg',
      title: '',
      description: 'Providing solutions to problems using technology',
      category: 'Achievements & Competitions'
    },
    {
      id: 8,
      src: '/images/g8.jpg',
      title: 'Projects',
      description: 'A smart vehicle that can get past obstacles',
      category: 'Projects'
    },
  ];
  
  // DOM Elements
  const galleryGrid = document.querySelector('.gallery-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const lightboxTitle = document.querySelector('.image-title');
  const lightboxDesc = document.querySelector('.image-description');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Variables
  let currentFilter = 'all';
  let currentImageIndex = 0;
  let displayedItems = 6;
  const itemsPerLoad = 2;
  
  // Initialize gallery
  function initGallery() {
    renderGalleryItems(galleryData.slice(0, displayedItems));
    setupEventListeners();
  }
  
  // Render gallery items
  function renderGalleryItems(items) {
    galleryGrid.innerHTML = '';
    
    items.forEach((item, index) => {
      if (currentFilter === 'all' || item.category === currentFilter) {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
          <img src="${item.src}" alt="${item.title}" class="gallery-img" loading="lazy">
          <div class="item-info">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        `;
        
        galleryItem.addEventListener('click', () => openLightbox(index));
        galleryGrid.appendChild(galleryItem);
      }
    });
  }
  
  // Filter gallery items
  function filterGallery(filter) {
    currentFilter = filter;
    displayedItems = 6; // Reset displayed items when filtering
    const filteredItems = galleryData.slice(0, displayedItems);
    renderGalleryItems(filteredItems);
    
    // Update active button
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      }
    });
  }
  
  // Open lightbox
  function openLightbox(index) {
    currentImageIndex = parseInt(index);
    const filteredItems = currentFilter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === currentFilter);
    
    const item = filteredItems[currentImageIndex];
    
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;
    
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
  
  // Navigate lightbox
  function navigateLightbox(direction) {
    const filteredItems = currentFilter === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === currentFilter);
    
    if (direction === 'prev') {
      currentImageIndex = (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    } else {
      currentImageIndex = (currentImageIndex + 1) % filteredItems.length;
    }
    
    const item = filteredItems[currentImageIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.description;
  }
  
  // Load more items
  function loadMoreItems() {
    displayedItems += itemsPerLoad;
    const itemsToShow = galleryData.slice(0, displayedItems);
    renderGalleryItems(itemsToShow);
    
    // Hide load more button if all items are displayed
    if (displayedItems >= galleryData.length) {
      loadMoreBtn.style.display = 'none';
    }
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => filterGallery(btn.dataset.filter));
    });
    
    // Lightbox
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox('prev'));
    nextBtn.addEventListener('click', () => navigateLightbox('next'));
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('show')) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          navigateLightbox('prev');
        } else if (e.key === 'ArrowRight') {
          navigateLightbox('next');
        }
      }
    });
    
    // Load more button
    loadMoreBtn.addEventListener('click', loadMoreItems);
  }
  
  // Initialize the gallery when DOM is loaded
  document.addEventListener('DOMContentLoaded', initGallery);