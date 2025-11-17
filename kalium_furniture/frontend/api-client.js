/**
 * API Client for Kalium Furniture
 * Handles all API calls to the REST backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Fetch product by ID
 */
async function fetchProductById(productId) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}

/**
 * Fetch product by slug
 */
async function fetchProductBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
}

/**
 * Fetch product by article number
 */
async function fetchProductByArticleNumber(articleNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/article/${articleNumber}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by article number:', error);
    throw error;
  }
}

/**
 * Fetch all products (optionally filtered by category)
 */
async function fetchProducts(category = null) {
  try {
    let url = `${API_BASE_URL}/products?isActive=true`;
    if (category) {
      url += `&category=${category}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch category by slug
 */
async function fetchCategoryBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    throw error;
  }
}

/**
 * Get product ID from URL parameter
 */
function getURLParameter(name) {
  if (window.URLSearchParams) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Update dynamic content on the page with product data
 */
function updateDynamicContent(productData) {
  // Update product name
  const productNameEl = document.getElementById('dynamic-product-name');
  if (productNameEl) {
    productNameEl.textContent = productData.name;
  }
  
  // Update page title
  document.title = productData.name + " – Furnistør";
  
  // Update meta tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', productData.name);
  }
  
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', productData.features);
  }
  
  // Update product features/description
  const productFeaturesEl = document.getElementById('dynamic-product-features');
  if (productFeaturesEl) {
    const pTag = productFeaturesEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.features;
    } else {
      productFeaturesEl.innerHTML = `<p>${productData.features}</p>`;
    }
  }
  
  // Update product price (handles both regular and sale prices)
  const productPriceEl = document.getElementById('dynamic-product-price');
  if (productPriceEl) {
    if (productData.originalPrice) {
      // Sale price format
      productPriceEl.innerHTML = '<del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' + productData.currencySymbol + '</span>' + productData.originalPrice + '</bdi></span></del> <span class="screen-reader-text">Original price was: ' + productData.currencySymbol + productData.originalPrice + '.</span><ins aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' + productData.currencySymbol + '</span>' + productData.price + '</bdi></span></ins><span class="screen-reader-text">Current price is: ' + productData.currencySymbol + productData.price + '.</span>';
    } else {
      // Regular price format
      productPriceEl.innerHTML = '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' + productData.currencySymbol + '</span>' + productData.price + '</bdi></span>';
    }
  }
  
  // Helper function to update element with text
  const updateElement = (elementId, value) => {
    const el = document.getElementById(elementId);
    if (el && value) {
      const pTag = el.querySelector('p');
      if (pTag) {
        pTag.textContent = value;
      } else {
        el.innerHTML = `<p>${value}</p>`;
      }
    }
  };
  
  updateElement('dynamic-designer-name', productData.designer);
  updateElement('dynamic-country-origin', productData.countryOfOrigin);
  updateElement('dynamic-importer-packer', productData.importerPackerMarketer);
  updateElement('dynamic-article-number', productData.articleNumber);
  
  // Update description
  const descriptionEl = document.getElementById('dynamic-description');
  if (descriptionEl && productData.description) {
    descriptionEl.textContent = productData.description;
  }
  
  updateElement('dynamic-dimensions', productData.dimensions);
  updateElement('dynamic-materials', productData.materials);
  updateElement('dynamic-finish', productData.finish);
  
  // Update product images
  if (productData.images && productData.images.length > 0) {
    const galleryImages = document.querySelectorAll('#dynamic-product-gallery .dynamic-product-image');
    
    // Update each image in the gallery
    galleryImages.forEach(function(img, index) {
      if (productData.images[index]) {
        const imageData = productData.images[index];
        img.src = imageData.src;
        img.alt = imageData.alt || productData.name;
        img.title = imageData.alt || productData.name;
        
        // Update data attributes for lightbox
        if (imageData.thumb) {
          img.setAttribute('data-thumb-image', imageData.thumb);
        }
        if (imageData.src) {
          img.setAttribute('data-full-image', imageData.src);
        }
        
        // Update srcset
        if (img.width) {
          img.setAttribute('srcset', `${imageData.src} ${img.width}w`);
        }
      }
    });
    
    // Update meta og:image
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && productData.images[0]) {
      ogImage.setAttribute('content', productData.images[0].src);
    }
    
    const itemImage = document.querySelector('link[itemprop="image"]');
    if (itemImage && productData.images[0]) {
      itemImage.setAttribute('href', productData.images[0].src);
    }
  }
  
  // Update reviews
  if (productData.reviews && productData.reviews.length > 0) {
    updateReviews(productData.reviews);
  }
}

/**
 * Update reviews section with product reviews
 */
function updateReviews(reviews) {
  const reviewsContainer = document.querySelector('#comments .commentlist');
  if (!reviewsContainer) return;
  
  // Clear existing reviews
  reviewsContainer.innerHTML = '';
  
  // Calculate average rating
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  // Add each review
  reviews.forEach((review, index) => {
    const reviewDate = new Date(review.date);
    const formattedDate = reviewDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const reviewItem = document.createElement('li');
    reviewItem.className = `review ${index % 2 === 0 ? 'even' : 'odd'} ${index % 2 === 0 ? 'thread-even' : 'thread-odd'} depth-1`;
    reviewItem.id = `li-comment-${index + 1}`;
    
    const ratingPercent = (review.rating / 5) * 100;
    
    reviewItem.innerHTML = `
      <div id="comment-${index + 1}" class="comment_container">
        <div class="comment-text">
          <div class="star-rating" role="img" aria-label="Rated ${review.rating} out of 5">
            <span style="width:${ratingPercent}%">Rated <strong class="rating">${review.rating}</strong> out of 5</span>
          </div>
          <p class="meta">
            <strong class="woocommerce-review__author">${review.author}</strong>
            <span class="woocommerce-review__dash">–</span>
            <time class="woocommerce-review__published-date" datetime="${reviewDate.toISOString()}">${formattedDate}</time>
          </p>
          <div class="description">
            <p>${review.comment}</p>
          </div>
        </div>
      </div>
    `;
    
    reviewsContainer.appendChild(reviewItem);
  });
  
  // Update review summary
  const summaryContainer = document.querySelector('.woocommerce-review-rating-summary');
  if (summaryContainer) {
    const avgRatingPercent = (avgRating / 5) * 100;
    summaryContainer.innerHTML = `
      <div class="star-rating" role="img" aria-label="Rated ${avgRating.toFixed(1)} out of 5" style="font-size: 1.2em;">
        <span style="width:${avgRatingPercent}%">Rated <strong class="rating">${avgRating.toFixed(1)}</strong> out of 5</span>
      </div>
      <p style="margin-top: 0.5em; color: #646360;">Based on ${reviews.length} review${reviews.length !== 1 ? 's' : ''}</p>
    `;
  }
}

/**
 * Get filename from current page URL
 */
function getPageFilename() {
  let filename = window.location.pathname.split('/').pop();
  if (!filename || filename === '' || filename === '/') {
    filename = window.location.href.split('/').pop();
  }
  return filename.includes('?') ? filename.split('?')[0] : filename;
}

/**
 * Get product identifier based on current page filename
 */
function getProductIdentifierFromPage() {
  const filename = getPageFilename();
  const pageToProductMap = {
    'index_tact-mirror.html': { slug: 'tact-mirror' },
    'index_tact.html': { slug: 'tact-mirror' },
    'index_mirrors.html': { category: 'mirrors' },
    'index_rugs.html': { category: 'rugs' },
    'index_decor.html': { category: 'decor' },
    'index_newzealand-wool.html': { articleNumber: 'NZ-WOOL-RUNNER-001' }
  };
  return pageToProductMap[filename] || null;
}

/**
 * Initialize product page - fetch and display product data
 */
async function initializeProductPage() {
  try {
    // Try to get product from URL parameters first
    const productId = getURLParameter('id');
    const productSlug = getURLParameter('slug');
    const articleNumber = getURLParameter('article');
    const productParam = getURLParameter('product'); // e.g., product1, product2, product3
    
    let productData = null;
    
    if (productId) {
      productData = await fetchProductById(productId);
    } else if (productSlug) {
      productData = await fetchProductBySlug(productSlug);
    } else if (articleNumber) {
      productData = await fetchProductByArticleNumber(articleNumber);
    } else if (productParam) {
      // Handle product parameter (product1, product2, product3, etc.)
      // Map directly to article numbers for reliability
      const productIndexMatch = productParam.match(/^product(\d+)$/);
      if (productIndexMatch) {
        const productNum = parseInt(productIndexMatch[1]);
        
        // Get category from page filename
        const pageIdentifier = getProductIdentifierFromPage();
        let category = pageIdentifier?.category || null;
        
        // If no category from page identifier, determine from filename
        if (!category) {
          const filename = getPageFilename();
          if (filename.includes('mirror') && !filename.includes('wool')) {
            category = 'mirrors';
          } else if (filename.includes('rug') || filename.includes('wool')) {
            category = 'rugs';
          } else if (filename.includes('decor')) {
            category = 'decor';
          }
        }
        
        // Map product numbers to article numbers by category
        const productArticleMap = {
          'mirrors': {
            1: 'FAM-ALU-2024',
            2: 'TTBM-BRASS-5678',
            3: 'UFM-SOTTSASS-9012'
          },
          'rugs': {
            1: 'RPR-PET-2024',
            2: 'STR-TAPE-7890',
            3: 'BSW-NAT-4567'
          }
        };
        
        // Try to fetch by article number first
        if (category && productArticleMap[category]?.[productNum]) {
          try {
            productData = await fetchProductByArticleNumber(productArticleMap[category][productNum]);
          } catch (error) {
            // Fall through to index-based approach
          }
        }
        
        // Fallback: use index-based approach
        if (!productData) {
          const products = await fetchProducts(category);
          if (products && products.length > productNum && productNum >= 0) {
            productData = products[productNum];
          } else if (products && products.length > 0) {
            productData = products[0];
          }
        }
      }
    } else {
      // Try to get product based on page filename
      const pageIdentifier = getProductIdentifierFromPage();
      
      if (pageIdentifier) {
        if (pageIdentifier.articleNumber) {
          productData = await fetchProductByArticleNumber(pageIdentifier.articleNumber);
        } else if (pageIdentifier.slug) {
          productData = await fetchProductBySlug(pageIdentifier.slug);
        } else if (pageIdentifier.category) {
          // Get first product from the category
          const products = await fetchProducts(pageIdentifier.category);
          if (products && products.length > 0) {
            productData = products[0];
          }
        }
      }
      
      // Fallback: get first available product
      if (!productData) {
        const products = await fetchProducts();
        if (products && products.length > 0) {
          productData = products[0];
        }
      }
    }
    
    if (productData) {
      updateDynamicContent(productData);
    }
  } catch (error) {
    console.error('Error initializing product page:', error);
  }
}

/**
 * Initialize category page - fetch and display category data
 */
async function initializeCategoryPage() {
  try {
    const categoryTitleEl = document.getElementById('dynamic-category-title');
    if (!categoryTitleEl) return;
    
    const filename = getPageFilename();
    const filenameToSlug = {
      'index_decor.html': 'decor',
      'index_mirrors.html': 'mirrors',
      'index_rugs.html': 'rugs'
    };
    
    const categorySlug = filenameToSlug[filename];
    if (!categorySlug) return;
    
    const categoryData = await fetchCategoryBySlug(categorySlug);
    if (categoryData) {
      categoryTitleEl.textContent = categoryData.name;
      document.title = categoryData.name + " – Furnistør";
      
      const categoryDescEl = document.getElementById('dynamic-category-description');
      if (categoryDescEl && categoryData.description) {
        categoryDescEl.textContent = categoryData.description;
      }
    }
  } catch (error) {
    console.error('Error initializing category page:', error);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    initializeProductPage();
    initializeCategoryPage();
  });
} else {
  initializeProductPage();
  initializeCategoryPage();
}

