document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');

  if (burger) {
      burger.addEventListener('click', function() {
          nav.classList.toggle('active');
          burger.classList.toggle('toggle');
          
          // Animate burger lines
          const lines = burger.querySelectorAll('div');
          if (burger.classList.contains('toggle')) {
              lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
              lines[1].style.opacity = '0';
              lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
          } else {
              lines[0].style.transform = 'none';
              lines[1].style.opacity = '1';
              lines[2].style.transform = 'none';
          }
      });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
      if (nav && nav.classList.contains('active') && !event.target.closest('.navbar')) {
          nav.classList.remove('active');
          if (burger && burger.classList.contains('toggle')) {
              burger.classList.remove('toggle');
              const lines = burger.querySelectorAll('div');
              lines[0].style.transform = 'none';
              lines[1].style.opacity = '1';
              lines[2].style.transform = 'none';
          }
      }
  });

  // Carousel Functionality
  const carousel = document.querySelector('.carousel');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');

  if (carousel && carouselItems.length > 0) {
      let currentIndex = 0;
      
      // Show only the active slide
      function showSlide(index) {
          carouselItems.forEach((item, i) => {
              item.classList.remove('active');
              if (i === index) {
                  item.classList.add('active');
              }
          });
      }
      
      // Initialize carousel
      showSlide(currentIndex);
      
      // Next slide
      function nextSlide() {
          currentIndex = (currentIndex + 1) % carouselItems.length;
          showSlide(currentIndex);
      }
      
      // Previous slide
      function prevSlide() {
          currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
          showSlide(currentIndex);
      }
      
      // Event listeners for controls
      if (nextBtn) {
          nextBtn.addEventListener('click', nextSlide);
      }
      
      if (prevBtn) {
          prevBtn.addEventListener('click', prevSlide);
      }
      
      // Auto slide every 5 seconds
      setInterval(nextSlide, 5000);
  }

  // Transaction Type Tabs (Buy/Rent)
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  if (tabBtns.length > 0) {
      tabBtns.forEach(btn => {
          btn.addEventListener('click', function() {
              // Remove active class from all buttons
              tabBtns.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              this.classList.add('active');
              
              // Update form action or other elements based on selected tab
              const type = this.getAttribute('data-type');
              const filterForm = document.getElementById('filter-form');
              
              if (filterForm) {
                  filterForm.setAttribute('data-transaction-type', type);
                  
                  // Update UI elements based on transaction type
                  if (type === 'rent') {
                      // Change price label to "Price per day"
                      const priceLabel = document.querySelector('label[for="price-range"]');
                      if (priceLabel) {
                          priceLabel.textContent = 'Price per Day:';
                      }
                      
                      // Update price options
                      const priceSelect = document.getElementById('price-range');
                      if (priceSelect) {
                          priceSelect.innerHTML = `
                              <option value="all">All Prices</option>
                              <option value="50-100">$50 - $100/day</option>
                              <option value="100-200">$100 - $200/day</option>
                              <option value="200-300">$200 - $300/day</option>
                              <option value="300-500">$300 - $500/day</option>
                          `;
                      }
                  } else {
                      // Reset to buy options
                      const priceLabel = document.querySelector('label[for="price-range"]');
                      if (priceLabel) {
                          priceLabel.textContent = 'Price Range:';
                      }
                      
                      // Update price options
                      const priceSelect = document.getElementById('price-range');
                      if (priceSelect) {
                          priceSelect.innerHTML = `
                              <option value="all">All Prices</option>
                              <option value="1000-5000">$1,000 - $5,000</option>
                              <option value="5000-10000">$5,000 - $10,000</option>
                              <option value="10000-15000">$10,000 - $15,000</option>
                              <option value="15000-20000">$15,000 - $20,000</option>
                          `;
                      }
                  }
              }
          });
      });
  }

  // Filter Functionality
  const filterForm = document.getElementById('filter-form');
  const vehicleItems = document.querySelectorAll('.vehicle-item');
  
  if (filterForm && vehicleItems.length > 0) {
      filterForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const vehicleType = document.getElementById('vehicle-type').value;
          const priceRange = document.getElementById('price-range').value;
          const brand = document.getElementById('brand').value;
          const year = document.getElementById('year') ? document.getElementById('year').value : 'all';
          const mileage = document.getElementById('mileage') ? document.getElementById('mileage').value : 'all';
          const color = document.getElementById('color') ? document.getElementById('color').value : 'all';
          const searchTerm = document.getElementById('search') ? document.getElementById('search').value.toLowerCase() : '';
          
          let visibleCount = 0;
          
          vehicleItems.forEach(item => {
              const itemType = item.getAttribute('data-type');
              const itemBrand = item.getAttribute('data-brand');
              const itemPrice = parseInt(item.getAttribute('data-price'));
              const itemYear = item.getAttribute('data-year');
              const itemMileage = parseInt(item.getAttribute('data-mileage'));
              const itemTitle = item.querySelector('h3').textContent.toLowerCase();
              
              let showItem = true;
              
              // Filter by vehicle type
              if (vehicleType !== 'all' && itemType !== vehicleType) {
                  showItem = false;
              }
              
              // Filter by brand
              if (brand !== 'all' && itemBrand !== brand) {
                  showItem = false;
              }
              
              // Filter by price range
              if (priceRange !== 'all') {
                  const [minPrice, maxPrice] = priceRange.split('-').map(Number);
                  if (itemPrice < minPrice || itemPrice > maxPrice) {
                      showItem = false;
                  }
              }
              
              // Filter by year
              if (year !== 'all') {
                  const [minYear, maxYear] = year.split('-').map(Number);
                  const itemYearNum = parseInt(itemYear);
                  if (itemYearNum < minYear || itemYearNum > maxYear) {
                      showItem = false;
                  }
              }
              
              // Filter by mileage
              if (mileage !== 'all') {
                  const maxMileage = parseInt(mileage);
                  if (itemMileage > maxMileage) {
                      showItem = false;
                  }
              }
              
              // Filter by search term
              if (searchTerm && !itemTitle.includes(searchTerm)) {
                  showItem = false;
              }
              
              // Show or hide item
              if (showItem) {
                  item.style.display = 'block';
                  visibleCount++;
              } else {
                  item.style.display = 'none';
              }
          });
          
          // Update results count
          const resultsCount = document.getElementById('results-count');
          if (resultsCount) {
              resultsCount.textContent = visibleCount;
          }
      });
      
      // Reset filters
      const resetBtn = filterForm.querySelector('button[type="reset"]');
      if (resetBtn) {
          resetBtn.addEventListener('click', function() {
              setTimeout(() => {
                  vehicleItems.forEach(item => {
                      item.style.display = 'block';
                  });
                  
                  // Reset results count
                  const resultsCount = document.getElementById('results-count');
                  if (resultsCount) {
                      resultsCount.textContent = vehicleItems.length;
                  }
              }, 10);
          });
      }
  }

  // Sort Functionality
  const sortSelect = document.getElementById('sort-by');
  const vehiclesContainer = document.getElementById('vehicles-container');
  
  if (sortSelect && vehiclesContainer && vehicleItems.length > 0) {
      sortSelect.addEventListener('change', function() {
          const sortValue = this.value;
          const itemsArray = Array.from(vehicleItems);
          
          itemsArray.sort((a, b) => {
              if (sortValue === 'price-low') {
                  return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
              } else if (sortValue === 'price-high') {
                  return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
              } else if (sortValue === 'year-new') {
                  return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
              } else if (sortValue === 'year-old') {
                  return parseInt(a.getAttribute('data-year')) - parseInt(b.getAttribute('data-year'));
              } else if (sortValue === 'mileage-low') {
                  return parseInt(a.getAttribute('data-mileage')) - parseInt(b.getAttribute('data-mileage'));
              }
              return 0;
          });
          
          // Remove all items
          vehicleItems.forEach(item => {
              item.remove();
          });
          
          // Append sorted items
          itemsArray.forEach(item => {
              vehiclesContainer.appendChild(item);
          });
      });
  }

  // Vehicle Details Modal
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
  const modal = document.getElementById('vehicle-modal');
  const closeModal = document.querySelector('.close-modal');
  
  if (viewDetailsBtns.length > 0 && modal) {
      viewDetailsBtns.forEach(btn => {
          btn.addEventListener('click', function(e) {
              e.preventDefault();
              
              const vehicleId = this.getAttribute('data-id');
              const vehicleItem = document.querySelector(`.vehicle-item[data-id="${vehicleId}"]`);
              
              if (vehicleItem) {
                  // Populate modal with vehicle details
                  const title = vehicleItem.querySelector('h3').textContent;
                  const price = vehicleItem.querySelector('.vehicle-price').textContent;
                  const image = vehicleItem.querySelector('.vehicle-image img').src;
                  
                  // Set modal content
                  document.getElementById('vehicle-title').textContent = title;
                  document.getElementById('main-vehicle-image').src = image;
                  document.querySelector('.vehicle-price-large').textContent = price;
                  
                  // Show modal
                  modal.style.display = 'block';
                  document.body.style.overflow = 'hidden'; // Prevent scrolling
              }
          });
      });
      
      // Close modal
      if (closeModal) {
          closeModal.addEventListener('click', function() {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto'; // Enable scrolling
          });
      }
      
      // Close modal when clicking outside
      window.addEventListener('click', function(e) {
          if (e.target === modal) {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto'; // Enable scrolling
          }
      });
  }

  // Image Gallery Functionality
  window.changeMainImage = function(src) {
      const mainImage = document.getElementById('main-vehicle-image');
      if (mainImage) {
          mainImage.src = src;
      }
      
      // Update active thumbnail
      const thumbnails = document.querySelectorAll('.thumbnail');
      thumbnails.forEach(thumb => {
          if (thumb.src === src) {
              thumb.classList.add('active');
          } else {
              thumb.classList.remove('active');
          }
      });
  };

  // Pagination
  const paginationNumbers = document.querySelectorAll('.pagination-number');
  const prevPageBtn = document.querySelector('.pagination-btn.prev-btn');
  const nextPageBtn = document.querySelector('.pagination-btn.next-btn');
  
  if (paginationNumbers.length > 0) {
      let currentPage = 1;
      
      paginationNumbers.forEach(btn => {
          btn.addEventListener('click', function() {
              // Remove active class from all buttons
              paginationNumbers.forEach(btn => btn.classList.remove('active'));
              
              // Add active class to clicked button
              this.classList.add('active');
              
              // Update current page
              currentPage = parseInt(this.textContent);
              
              // Enable/disable prev/next buttons
              if (currentPage === 1) {
                  prevPageBtn.disabled = true;
              } else {
                  prevPageBtn.disabled = false;
              }
              
              if (currentPage === paginationNumbers.length) {
                  nextPageBtn.disabled = true;
              } else {
                  nextPageBtn.disabled = false;
              }
              
              // In a real application, this would load the next page of results
              // For this demo, we'll just scroll to top
              window.scrollTo({
                  top: document.querySelector('.vehicles-grid-section').offsetTop - 100,
                  behavior: 'smooth'
              });
          });
      });
      
      // Previous page
      if (prevPageBtn) {
          prevPageBtn.addEventListener('click', function() {
              if (currentPage > 1) {
                  currentPage--;
                  // Click the corresponding pagination number
                  paginationNumbers[currentPage - 1].click();
              }
          });
      }
      
      // Next page
      if (nextPageBtn) {
          nextPageBtn.addEventListener('click', function() {
              if (currentPage < paginationNumbers.length) {
                  currentPage++;
                  // Click the corresponding pagination number
                  paginationNumbers[currentPage - 1].click();
              }
          });
      }
  }

  // Form Validation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          
          // Basic validation
          let isValid = true;
          const requiredFields = contactForm.querySelectorAll('[required]');
          
          requiredFields.forEach(field => {
              if (!field.value.trim()) {
                  isValid = false;
                  field.style.borderColor = 'red';
              } else {
                  field.style.borderColor = '#ddd';
              }
          });
          
          // Email validation
          const emailField = contactForm.querySelector('input[type="email"]');
          if (emailField && emailField.value) {
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailPattern.test(emailField.value)) {
                  isValid = false;
                  emailField.style.borderColor = 'red';
              }
          }
          
          if (isValid) {
              // Show success message (in a real application, you would submit the form)
              const formContainer = contactForm.closest('.form-container');
              if (formContainer) {
                  formContainer.innerHTML = `
                      <div class="success-message">
                          <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                          <h2>Thank You!</h2>
                          <p>Your message has been sent successfully. We'll get back to you shortly.</p>
                      </div>
                  `;
              }
          }
      });
  }

  // Animate stats numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
      const animateStats = () => {
          statNumbers.forEach(stat => {
              const target = parseInt(stat.getAttribute('data-count'));
              const duration = 2000; // 2 seconds
              const step = target / (duration / 16); // 60fps
              let current = 0;
              
              const updateNumber = () => {
                  current += step;
                  if (current < target) {
                      stat.textContent = Math.floor(current);
                      requestAnimationFrame(updateNumber);
                  } else {
                      stat.textContent = target;
                  }
              };
              
              updateNumber();
          });
      };
      
      // Check if stats section is in viewport
      const statsSection = document.querySelector('.stats');
      if (statsSection) {
          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      animateStats();
                      observer.unobserve(entry.target);
                  }
              });
          }, { threshold: 0.1 });
          
          observer.observe(statsSection);
      }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          if (this.getAttribute('href') !== '#') {
              e.preventDefault();
              
              const targetId = this.getAttribute('href');
              const targetElement = document.querySelector(targetId);
              
              if (targetElement) {
                  window.scrollTo({
                      top: targetElement.offsetTop - 100,
                      behavior: 'smooth'
                  });
              }
          }
      });
  });

  // Initialize based on URL parameters
  const initFromUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      
      // Set transaction type (buy/rent)
      const type = urlParams.get('type');
      if (type && (type === 'buy' || type === 'rent')) {
          const tabBtn = document.querySelector(`.tab-btn[data-type="${type}"]`);
          if (tabBtn) {
              tabBtn.click();
          }
      }
      
      // Set vehicle type
      const vehicle = urlParams.get('vehicle');
      if (vehicle) {
          const vehicleSelect = document.getElementById('vehicle-type');
          if (vehicleSelect) {
              vehicleSelect.value = vehicle;
          }
      }
      
      // Set price range
      const price = urlParams.get('price');
      if (price) {
          const priceSelect = document.getElementById('price-range');
          if (priceSelect) {
              priceSelect.value = price;
          }
      }
      
      // Set brand
      const brand = urlParams.get('brand');
      if (brand) {
          const brandSelect = document.getElementById('brand');
          if (brandSelect) {
              brandSelect.value = brand;
          }
      }
      
      // Apply filters if any parameters were set
      if (type || vehicle || price || brand) {
          const filterForm = document.getElementById('filter-form');
          if (filterForm) {
              // Trigger submit event
              const submitEvent = new Event('submit', { cancelable: true });
              filterForm.dispatchEvent(submitEvent);
          }
      }
  };
  
  // Initialize from URL parameters
  initFromUrlParams();
});