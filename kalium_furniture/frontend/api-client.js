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
      if (response.status === 404) {
        throw new Error(`Product not found with article number: ${articleNumber}`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const product = await response.json();
    return product;
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
 * Fetch all categories
 */
async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
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
      productFeaturesEl.innerHTML = '<p>' + productData.features + '</p>';
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
  
  // Update designer name
  const designerEl = document.getElementById('dynamic-designer-name');
  if (designerEl && productData.designer) {
    const pTag = designerEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.designer;
    } else {
      designerEl.innerHTML = '<p>' + productData.designer + '</p>';
    }
  }
  
  // Update country of origin
  const countryEl = document.getElementById('dynamic-country-origin');
  if (countryEl && productData.countryOfOrigin) {
    const pTag = countryEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.countryOfOrigin;
    } else {
      countryEl.innerHTML = '<p>' + productData.countryOfOrigin + '</p>';
    }
  }
  
  // Update importer, packer & marketer
  const importerEl = document.getElementById('dynamic-importer-packer');
  if (importerEl && productData.importerPackerMarketer) {
    const pTag = importerEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.importerPackerMarketer;
    } else {
      importerEl.innerHTML = '<p>' + productData.importerPackerMarketer + '</p>';
    }
  }
  
  // Update article number
  const articleEl = document.getElementById('dynamic-article-number');
  if (articleEl && productData.articleNumber) {
    const pTag = articleEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.articleNumber;
    } else {
      articleEl.innerHTML = '<p>' + productData.articleNumber + '</p>';
    }
  }
  
  // Update description
  const descriptionEl = document.getElementById('dynamic-description');
  if (descriptionEl && productData.description) {
    descriptionEl.textContent = productData.description;
  }
  
  // Update dimensions
  const dimensionsEl = document.getElementById('dynamic-dimensions');
  if (dimensionsEl && productData.dimensions) {
    const pTag = dimensionsEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.dimensions;
    } else {
      dimensionsEl.innerHTML = '<p>' + productData.dimensions + '</p>';
    }
  }
  
  // Update materials
  const materialsEl = document.getElementById('dynamic-materials');
  if (materialsEl && productData.materials) {
    const pTag = materialsEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.materials;
    } else {
      materialsEl.innerHTML = '<p>' + productData.materials + '</p>';
    }
  }
  
  // Update finish
  const finishEl = document.getElementById('dynamic-finish');
  if (finishEl && productData.finish) {
    const pTag = finishEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.finish;
    } else {
      finishEl.innerHTML = '<p>' + productData.finish + '</p>';
    }
  }
  
  // Update product images
  if (productData.images && productData.images.length > 0) {
    const galleryImages = document.querySelectorAll('#dynamic-product-gallery .dynamic-product-image');
    const imageItems = document.querySelectorAll('#dynamic-product-gallery .product-gallery__item-image');
    
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
        
        // Update srcset (simplified version)
        const srcset = imageData.src + ' ' + (img.width || 858) + 'w';
        img.setAttribute('srcset', srcset);
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
 * Get product identifier based on current page filename
 */
function getProductIdentifierFromPage() {
  // Get filename from pathname or full href
  let filename = window.location.pathname.split('/').pop();
  if (!filename || filename === '' || filename === '/') {
    filename = window.location.href.split('/').pop();
    // Remove query string if present
    if (filename.includes('?')) {
      filename = filename.split('?')[0];
    }
  }
  
  // Map page filenames to product slugs or article numbers
  const pageToProductMap = {
    'index_tact-mirror.html': { slug: 'tact-mirror' },
    'index_tact.html': { slug: 'tact-mirror' }, // Assuming same product
    'index_mirrors.html': { category: 'mirrors' },
    'index_rugs.html': { category: 'rugs' },
    'index_decor.html': { category: 'decor' },
    'index_newzealand-wool.html': { articleNumber: 'NZ-WOOL-RUNNER-001' } // New Zealand Wool Runner
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
        let category = null;
        
        // Determine category based on page identifier or filename
        if (pageIdentifier) {
          if (pageIdentifier.category) {
            category = pageIdentifier.category;
          } else if (pageIdentifier.slug || pageIdentifier.articleNumber) {
            // For pages with slugs or article numbers, determine category from filename
            const filename = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
            // Remove query string if present
            const cleanFilename = filename.includes('?') ? filename.split('?')[0] : filename;
            
            // Map filenames to categories
            if (cleanFilename.includes('tact-mirror') || (cleanFilename.includes('mirror') && !cleanFilename.includes('wool'))) {
              category = 'mirrors';
            } else if (cleanFilename.includes('rug') || cleanFilename.includes('wool')) {
              category = 'rugs';
            } else if (cleanFilename.includes('decor')) {
              category = 'decor';
            }
          }
        } else {
          // Fallback: try to determine category from filename directly
          const filename = window.location.pathname.split('/').pop() || window.location.href.split('/').pop();
          const cleanFilename = filename.includes('?') ? filename.split('?')[0] : filename;
          
          if (cleanFilename.includes('mirror') && !cleanFilename.includes('wool')) {
            category = 'mirrors';
          } else if (cleanFilename.includes('rug') || cleanFilename.includes('wool')) {
            category = 'rugs';
          } else if (cleanFilename.includes('decor')) {
            category = 'decor';
          }
        }
        
        // Map product numbers to article numbers by category
        const productArticleMap = {
          'mirrors': {
            1: 'FAM-ALU-2024', // Freestanding Aluminium Mirror
            2: 'TTBM-BRASS-5678', // Tilting Table-Top Brass Mirror
            3: 'UFM-SOTTSASS-9012' // Ultrafragola Mirror
          },
          'rugs': {
            1: 'RPR-PET-2024', // Rectangular PET Rug
            2: 'STR-TAPE-7890', // Sticky Tape Rug
            3: 'BSW-NAT-4567' // Bamboo Silk and Wool Rug
          },
          'decor': {
            // Add decor mappings as needed
          }
        };
        
        console.log(`Product parameter detected: product${productNum}, category: ${category}`);
        
        // Try to fetch by article number first (most reliable)
        if (category && productArticleMap[category] && productArticleMap[category][productNum]) {
          const articleNumber = productArticleMap[category][productNum];
          const expectedProductName = productNum === 1 ? 'Rectangular PET Rug' : 
                                     productNum === 2 ? 'Sticky Tape Rug' :
                                     productNum === 3 ? 'Bamboo Silk and Wool Rug' : 'Unknown';
          console.log(`Attempting to fetch product${productNum} by article number: ${articleNumber} (Expected: ${expectedProductName})`);
          try {
            productData = await fetchProductByArticleNumber(articleNumber);
            if (productData) {
              console.log(`Successfully fetched product: ${productData.name} (Article: ${productData.articleNumber}, Expected: ${articleNumber})`);
              // Verify we got the correct product
              if (productData.articleNumber !== articleNumber) {
                console.error(`MISMATCH: Fetched product has article number ${productData.articleNumber}, expected ${articleNumber}`);
                productData = null; // Force fallback if article number doesn't match
              } else if (productData.name !== expectedProductName) {
                console.warn(`Product name mismatch: Got "${productData.name}", expected "${expectedProductName}". Article number matches, proceeding.`);
              }
            } else {
              console.warn(`Article number lookup returned null for: ${articleNumber}`);
              productData = null;
            }
          } catch (error) {
            console.warn(`Failed to fetch product by article number ${articleNumber}:`, error.message);
            productData = null; // Ensure productData is null on error
          }
        } else {
          console.warn(`No article number mapping found for category: ${category}, productNum: ${productNum}`);
          if (!category) {
            console.warn('Category detection failed - category is null or undefined');
          }
        }
        
        // Fallback: use index-based approach if article number lookup failed
        if (!productData) {
          console.log(`Using index-based fallback for category: ${category}, productNum: ${productNum}`);
          const products = await fetchProducts(category);
          // product1 = index 1, product2 = index 2, etc. (index 0 is default product)
          const index = productNum;
          if (products && products.length > index && index >= 0) {
            productData = products[index];
            console.log(`Selected product at index ${index}: ${productData?.name || 'unknown'}`);
          } else if (products && products.length > 0) {
            // Fallback to first product if index is out of range
            console.warn(`Product index ${index} out of range (${products.length} products available), using first product`);
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
    } else {
      console.warn('No product data found');
    }
  } catch (error) {
    console.error('Error initializing product page:', error);
    // Fallback: show error message or use default data
  }
}

/**
 * Initialize category page - fetch and display category data
 */
async function initializeCategoryPage() {
  try {
    // Check if this is a category page by looking for category title element
    const categoryTitleEl = document.getElementById('dynamic-category-title');
    if (!categoryTitleEl) {
      console.log('Category page element not found, skipping category initialization');
      return; // Not a category page
    }
    
    // Determine category slug from filename
    let filename = window.location.pathname.split('/').pop();
    if (!filename || filename === '' || filename === '/') {
      // Fallback for file:// protocol
      filename = window.location.href.split('/').pop();
      // Remove query string and hash if present
      if (filename.includes('?')) {
        filename = filename.split('?')[0];
      }
      if (filename.includes('#')) {
        filename = filename.split('#')[0];
      }
    }
    const cleanFilename = filename.includes('?') ? filename.split('?')[0] : filename;
    
    console.log('Category page detected, filename:', cleanFilename);
    
    let categorySlug = null;
    
    // Map filenames to category slugs
    if (cleanFilename === 'index_decor.html') {
      categorySlug = 'decor';
    } else if (cleanFilename === 'index_mirrors.html') {
      categorySlug = 'mirrors';
    } else if (cleanFilename === 'index_rugs.html') {
      categorySlug = 'rugs';
    }
    
    if (categorySlug) {
      console.log(`Fetching category data for slug: ${categorySlug}`);
      const categoryData = await fetchCategoryBySlug(categorySlug);
      if (categoryData) {
        console.log('Category data received:', categoryData);
        // Update category title
        categoryTitleEl.textContent = categoryData.name;
        
        // Update category description
        const categoryDescEl = document.getElementById('dynamic-category-description');
        if (categoryDescEl && categoryData.description) {
          categoryDescEl.textContent = categoryData.description;
        } else if (categoryDescEl) {
          console.warn('Category description element found but no description in data');
        }
        
        // Update page title
        document.title = categoryData.name + " – Furnistør";
        console.log('Category page initialized successfully');
      } else {
        console.warn(`Category not found: ${categorySlug}`);
      }
    } else {
      console.warn(`No category slug mapped for filename: ${cleanFilename}`);
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

// Also update after a short delay to ensure all elements are loaded
setTimeout(function() {
  initializeProductPage();
  initializeCategoryPage();
}, 100);

