/**
 * FreshBox - Main JavaScript Platform Engine
 * Handles Cart, Box Customizer, Shop Catalog, Quick View, Checkout, Coupons, Auth State, Toasts & Live Search
 */

(function () {
  'use strict';

  // Central social destination configuration. Replace these with FreshBox's
  // verified profile URLs when they are available; every social control on the
  // site is populated from this one object.
  const SOCIAL_LINKS = Object.freeze({
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
    x: 'https://x.com/',
    youtube: 'https://www.youtube.com/'
  });

  function initSocialLinks() {
    document.querySelectorAll('[data-social-platform]').forEach((link) => {
      const url = SOCIAL_LINKS[link.dataset.socialPlatform];
      if (url) link.href = url;
      link.parentElement.classList.add('social-links');
    });
  }

  // --- Comprehensive Grocery Product Database ---
  const PRODUCTS = [
    {
      id: 'prod-1',
      name: 'Fresh Vine Tomatoes',
      category: 'vegetables',
      categoryName: 'Vegetables',
      price: 60,
      originalPrice: 75,
      unit: '1 kg',
      rating: 4.9,
      reviewsCount: 42,
      badge: 'Organic',
      inStock: true,
      image: 'assets/images/products/fresh-vine-tomatoes.jpg',
      description: 'Hand-picked vine ripened organic tomatoes grown without synthetic pesticides in certified eco-greenhouses.',
      nutrition: { calories: '18 kcal', carbs: '3.9g', protein: '0.9g', fiber: '1.2g', vitaminC: '28%' }
    },
    {
      id: 'prod-2',
      name: 'Organic Baby Spinach',
      category: 'vegetables',
      categoryName: 'Vegetables',
      price: 45,
      originalPrice: 55,
      unit: '250 g',
      rating: 4.8,
      reviewsCount: 38,
      badge: 'Hydroponic',
      inStock: true,
      image: 'assets/images/products/organic-baby-spinach.jpg',
      description: 'Crisp, washed, and tender organic baby spinach leaves, packed immediately after harvest in compostable bags.',
      nutrition: { calories: '23 kcal', carbs: '3.6g', protein: '2.9g', fiber: '2.2g', iron: '15%' }
    },
    {
      id: 'prod-3',
      name: 'Royal Gala Apples',
      category: 'fruits',
      categoryName: 'Fruits',
      price: 120,
      originalPrice: 140,
      unit: '1 kg',
      rating: 4.9,
      reviewsCount: 56,
      badge: 'Seasonal',
      inStock: true,
      image: 'assets/images/products/royal-gala-apples.jpg',
      description: 'Sweet, fragrant, and crunchy Royal Gala apples sourced directly from Himachal orchard cooperatives.',
      nutrition: { calories: '52 kcal', carbs: '14g', protein: '0.3g', fiber: '2.4g', vitaminC: '14%' }
    },
    {
      id: 'prod-4',
      name: 'Fresh Nagpur Oranges',
      category: 'fruits',
      categoryName: 'Fruits',
      price: 90,
      originalPrice: 110,
      unit: '1 kg',
      rating: 4.7,
      reviewsCount: 29,
      badge: 'Farm Fresh',
      inStock: true,
      image: 'assets/images/products/fresh-nagpur-oranges.jpg',
      description: 'Juicy, sunshine-ripened Nagpur sweet oranges bursting with natural electrolytes and immunity-boosting Vitamin C.',
      nutrition: { calories: '47 kcal', carbs: '12g', protein: '0.9g', fiber: '2.4g', vitaminC: '64%' }
    },
    {
      id: 'prod-5',
      name: 'Farm Fresh A2 Organic Milk',
      category: 'dairy',
      categoryName: 'Dairy',
      price: 75,
      originalPrice: 85,
      unit: '1 L',
      rating: 5.0,
      reviewsCount: 88,
      badge: 'A2 Certified',
      inStock: true,
      image: 'assets/images/products/farm-fresh-a2-milk.jpg',
      description: 'Pure, unprocessed A2 milk from grass-fed indigenous cows, delivered in sterilized returnable glass bottles.',
      nutrition: { calories: '62 kcal', fat: '3.6g', protein: '3.2g', calcium: '28%' }
    },
    {
      id: 'prod-6',
      name: 'Artisan Greek Yogurt',
      category: 'dairy',
      categoryName: 'Dairy',
      price: 65,
      originalPrice: 75,
      unit: '400 g',
      rating: 4.8,
      reviewsCount: 34,
      badge: 'Probiotic',
      inStock: true,
      image: 'assets/images/products/artisan-greek-yogurt.jpg',
      description: 'Thick, probiotic-rich Greek style strained curd made from whole farm milk with zero added stabilizers.',
      nutrition: { calories: '97 kcal', carbs: '3.9g', protein: '9.0g', calcium: '22%' }
    },
    {
      id: 'prod-7',
      name: 'Whole Grain Sourdough Loaf',
      category: 'bakery',
      categoryName: 'Bakery',
      price: 95,
      originalPrice: 120,
      unit: '500 g',
      rating: 4.9,
      reviewsCount: 47,
      badge: 'Artisan',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      description: 'Naturally fermented for 24 hours using wild sourdough culture and stone-ground organic whole wheat flour.',
      nutrition: { calories: '160 kcal', carbs: '32g', protein: '6g', fiber: '4g' }
    },
    {
      id: 'prod-8',
      name: 'French Butter Croissants (2-pack)',
      category: 'bakery',
      categoryName: 'Bakery',
      price: 80,
      originalPrice: 95,
      unit: '2 pcs',
      rating: 4.7,
      reviewsCount: 22,
      badge: 'Fresh Baked',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
      description: 'Flaky, buttery layered artisan croissants baked fresh every dawn using cultured dairy butter.',
      nutrition: { calories: '230 kcal', carbs: '26g', fat: '12g', protein: '4.5g' }
    },
    {
      id: 'prod-9',
      name: 'Cold Pressed Virgin Olive Oil',
      category: 'pantry',
      categoryName: 'Pantry',
      price: 340,
      originalPrice: 390,
      unit: '500 ml',
      rating: 4.9,
      reviewsCount: 65,
      badge: 'Cold Pressed',
      inStock: true,
      image: 'assets/images/products/cold-pressed-groundnut-oil.jpg',
      description: 'Single-estate extra virgin olive oil extracted within 4 hours of tree harvest. Zero chemical refinement.',
      nutrition: { calories: '120 kcal / tbsp', healthyFats: '14g', acidity: '< 0.3%' }
    },
    {
      id: 'prod-10',
      name: 'Organic Royal Quinoa',
      category: 'pantry',
      categoryName: 'Pantry',
      price: 180,
      originalPrice: 220,
      unit: '500 g',
      rating: 4.8,
      reviewsCount: 31,
      badge: 'Superfood',
      inStock: true,
      image: 'assets/images/products/organic-brown-rice.jpg',
      description: '100% pre-washed whole royal quinoa grain rich in complete protein and essential dietary minerals.',
      nutrition: { calories: '222 kcal', carbs: '39g', protein: '8g', fiber: '5g' }
    },
    {
      id: 'prod-11',
      name: 'Wild Forest Raw Honey',
      category: 'organic',
      categoryName: 'Organic',
      price: 260,
      originalPrice: 300,
      unit: '350 g',
      rating: 5.0,
      reviewsCount: 92,
      badge: 'Unpasteurized',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop&q=80',
      description: 'Pure, unfiltered wild honey collected ethically from reserved forest flora with natural pollen intact.',
      nutrition: { calories: '64 kcal / tbsp', sugars: '17g', minerals: 'Enzymes & Pollen' }
    },
    {
      id: 'prod-12',
      name: 'Organic Hass Avocados (2-pack)',
      category: 'organic',
      categoryName: 'Organic',
      price: 160,
      originalPrice: 190,
      unit: '2 pcs',
      rating: 4.9,
      reviewsCount: 54,
      badge: '100% Organic',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80',
      description: 'Creamy Hass avocados grown in organic highland soils, hand-checked for optimal buttery texture.',
      nutrition: { calories: '160 kcal', healthyFats: '15g', potassium: '14%', fiber: '7g' }
    },
    {
      id: 'prod-13',
      name: 'Roasted Almond & Berry Granola',
      category: 'snacks',
      categoryName: 'Snacks',
      price: 195,
      originalPrice: 240,
      unit: '350 g',
      rating: 4.8,
      reviewsCount: 41,
      badge: 'No Refined Sugar',
      inStock: true,
      image: 'assets/images/products/roasted-almond-berry-granola.jpg',
      description: 'Slow-baked rolled oats tossed with California almonds, dried cranberries, chia seeds, and raw maple syrup.',
      nutrition: { calories: '190 kcal', carbs: '28g', protein: '5g', fiber: '4.5g' }
    },
    {
      id: 'prod-14',
      name: 'Organic Mixed California Nuts',
      category: 'snacks',
      categoryName: 'Snacks',
      price: 280,
      originalPrice: 320,
      unit: '250 g',
      rating: 4.9,
      reviewsCount: 63,
      badge: 'Premium',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&auto=format&fit=crop&q=80',
      description: 'Lightly air-roasted walnuts, cashews, almonds, and pumpkin seeds lightly seasoned with pink Himalayan salt.',
      nutrition: { calories: '170 kcal', healthyFats: '15g', protein: '6g' }
    },
    {
      id: 'prod-15',
      name: 'Cold-Pressed Green Detox Juice',
      category: 'beverages',
      categoryName: 'Beverages',
      price: 95,
      originalPrice: 120,
      unit: '300 ml',
      rating: 4.7,
      reviewsCount: 36,
      badge: 'Zero Sugar',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&auto=format&fit=crop&q=80',
      description: 'Cold-pressed raw kale, green apple, cucumber, celery, mint, and ginger. Zero preservatives or pasteurization.',
      nutrition: { calories: '42 kcal', vitaminC: '45%', vitaminK: '80%' }
    },
    {
      id: 'prod-16',
      name: 'Fresh Tender Coconut Water',
      category: 'beverages',
      categoryName: 'Beverages',
      price: 60,
      originalPrice: 70,
      unit: '200 ml',
      rating: 5.0,
      reviewsCount: 77,
      badge: '100% Pure',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
      description: 'Naturally sweet pure coconut water bio-extracted and bottled immediately to preserve native electrolytes.',
      nutrition: { calories: '45 kcal', potassium: '470mg', electrolytes: '100%' }
    }
  ];

  // --- Auth State Management ---
  const AUTH_KEY = 'freshbox_auth_user';

  function getAuthUser() {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    // Default demo logged-in user: Chandru
    return {
      role: 'customer',
      name: 'Chandru',
      email: 'chandru@freshbox.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
  }

  function setAuthUser(user) {
    if (!user || user.role === 'guest') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ role: 'guest' }));
    } else {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    renderAuthUI();
  }

  function renderAuthUI() {
    const user = getAuthUser();
    const isSubfolder = window.location.pathname.includes('/dashboard/');
    const basePath = isSubfolder ? '../' : './';

    const authContainers = document.querySelectorAll('.nav-auth-slot');
    authContainers.forEach(slot => {
      if (!user || user.role === 'guest') {
        slot.innerHTML = `
          <a href="${basePath}login.html" class="btn btn-outline-primary btn-sm">
            <i class="bi bi-box-arrow-in-right"></i> Sign In
          </a>
        `;
      } else {
        const displayName = user.name || 'Chandru';
        slot.innerHTML = `
          <div class="dropdown nav-user-dropdown">
            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
              <span class="nav-user-avatar">
                <i class="bi bi-person-fill"></i>
              </span>
              <span>${displayName}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <a class="dropdown-item" href="${basePath}dashboard/index.html">
                  <i class="bi bi-grid-fill text-success"></i>
                  <span>My Dashboard</span>
                </a>
              </li>
              <li><hr class="dropdown-divider my-1"></li>
              <li>
                <a class="dropdown-item text-danger logout-btn" href="#">
                  <i class="bi bi-power"></i>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
          </div>
        `;
      }
    });

    // Attach logout event
    document.querySelectorAll('.logout-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setAuthUser({ role: 'guest' });
        showToast('Logged Out', 'You have been signed out successfully.', 'info');
        setTimeout(() => {
          window.location.href = `${basePath}login.html`;
        }, 400);
      });
    });
  }

  // --- Cart & Box Management ---
  const CART_KEY = 'freshbox_cart_items';
  const COUPON_KEY = 'freshbox_applied_coupon';

  const defaultItems = [
    { id: 'prod-1', name: 'Fresh Vine Tomatoes', category: 'vegetables', price: 60, unit: '1 kg', qty: 1, image: 'assets/images/products/fresh-vine-tomatoes.jpg' },
    { id: 'prod-2', name: 'Organic Baby Spinach', category: 'vegetables', price: 45, unit: '250 g', qty: 2, image: 'assets/images/products/organic-baby-spinach.jpg' },
    { id: 'prod-3', name: 'Royal Gala Apples', category: 'fruits', price: 120, unit: '1 kg', qty: 1, image: 'assets/images/products/royal-gala-apples.jpg' },
    { id: 'prod-5', name: 'Farm Fresh A2 Organic Milk', category: 'dairy', price: 75, unit: '1 L', qty: 2, image: 'assets/images/products/farm-fresh-a2-milk.jpg' }
  ];

  function getCart() {
    const saved = localStorage.getItem(CART_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Sanitize: Purge any corrupted, missing, or 'undefined' items
          const valid = parsed.filter(item => 
            item && 
            item.id && 
            String(item.id) !== 'undefined' && 
            item.name && 
            String(item.name) !== 'undefined' && 
            !isNaN(item.price)
          );
          if (valid.length !== parsed.length) {
            localStorage.setItem(CART_KEY, JSON.stringify(valid));
          }
          return valid;
        }
      } catch (e) { }
    }
    return defaultItems;
  }

  function saveCart(cart) {
    // Sanitize before saving
    const cleanCart = (cart || []).filter(item => 
      item && 
      item.id && 
      String(item.id) !== 'undefined' && 
      item.name && 
      String(item.name) !== 'undefined' && 
      !isNaN(item.price)
    );
    localStorage.setItem(CART_KEY, JSON.stringify(cleanCart));
    updateCartBadges();
    renderCartDrawer();
    renderBoxBuilderSummary();
    renderCartPage();
    renderCheckoutSummary();
  }

  function addToCart(itemOrId, notify = true) {
    let item = itemOrId;
    // Handle String ID invocations (e.g. freshboxApp.addToCart('prod-1'))
    if (typeof itemOrId === 'string') {
      const found = PRODUCTS.find(p => String(p.id) === String(itemOrId));
      if (found) {
        item = found;
      } else {
        console.warn('Product not found for ID:', itemOrId);
        return;
      }
    }
    if (!item || !item.id || String(item.id) === 'undefined') return;

    const cart = getCart();
    const existing = cart.find(i => String(i.id) === String(item.id));
    if (existing) {
      existing.qty += (item.qty || 1);
    } else {
      cart.push({ ...item, qty: item.qty || 1 });
    }
    saveCart(cart);
    if (notify) {
      showToast('Added to Box', `${item.name} added to your grocery box!`, 'success');
    }
  }

  function removeFromCart(id) {
    let cart = getCart();
    const targetIdStr = String(id);
    const item = cart.find(i => String(i.id) === targetIdStr);
    
    // Filter out target item as well as any invalid/undefined items
    cart = cart.filter(i => 
      i && 
      i.id && 
      String(i.id) !== targetIdStr && 
      String(i.id) !== 'undefined' && 
      String(i.name) !== 'undefined'
    );
    
    saveCart(cart);
    if (item && item.name && String(item.name) !== 'undefined') {
      showToast('Item Removed', `${item.name} removed from your box.`, 'warning');
    } else {
      showToast('Item Removed', 'Item removed from your box.', 'warning');
    }
  }

  function updateItemQty(id, delta) {
    const cart = getCart();
    const targetIdStr = String(id);
    const item = cart.find(i => String(i.id) === targetIdStr);
    if (item) {
      item.qty += delta;
      if (item.qty <= 0) {
        removeFromCart(id);
        return;
      }
      saveCart(cart);
    } else if (targetIdStr === 'undefined') {
      removeFromCart(id);
    }
  }

  function getCartSubtotal() {
    return getCart().reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const qty = parseInt(item.qty, 10) || 0;
      return sum + (price * qty);
    }, 0);
  }

  function getAppliedCoupon() {
    const saved = localStorage.getItem(COUPON_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { }
    }
    return null;
  }

  function applyCouponCode(code) {
    const clean = (code || '').toUpperCase().trim();
    if (!clean) {
      showToast('Enter Coupon', 'Please enter a valid coupon code.', 'warning');
      return false;
    }

    let coupon = null;
    if (clean === 'FRESH50' || clean === '50OFF' || clean === 'FLAT50') {
      coupon = { code: clean, type: 'fixed', value: 50, desc: '₹50 Flat Welcome Discount' };
    } else if (clean === 'WELCOME20' || clean === '20OFF' || clean === 'SAVE20') {
      coupon = { code: clean, type: 'percent', value: 0.20, desc: '20% Subscriber Discount' };
    } else if (clean === 'ORGANIC10' || clean === '10OFF' || clean === 'SAVE10' || clean === 'FRESH10') {
      coupon = { code: clean, type: 'percent', value: 0.10, desc: '10% Organic Harvest Special' };
    } else {
      const match = clean.match(/(\d+)/);
      if (match) {
        const val = parseInt(match[1], 10);
        if (val > 0 && val <= 50) {
          coupon = { code: clean, type: 'percent', value: val / 100, desc: `${val}% Special Promo Discount` };
        } else if (val > 50) {
          coupon = { code: clean, type: 'fixed', value: val, desc: `₹${val} Special Promo Discount` };
        }
      }
    }

    if (coupon) {
      localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
      saveCart(getCart());
      showToast('Coupon Applied', `Coupon ${coupon.code} applied successfully!`, 'success');
      return true;
    } else {
      showToast('Invalid Coupon', 'Coupon code not valid. Try FRESH50 or WELCOME20.', 'danger');
      return false;
    }
  }

  function removeCouponCode() {
    localStorage.removeItem(COUPON_KEY);
    saveCart(getCart());
    showToast('Coupon Removed', 'Coupon discount has been removed.', 'info');
  }

  function updateCartBadges() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    document.querySelectorAll('.cart-badge:not(.wishlist-badge)').forEach(badge => {
      badge.textContent = count;
    });
  }

  function initCartDrawerTriggers() {
    document.querySelectorAll('[data-cart-drawer-trigger]').forEach((trigger) => {
      trigger.addEventListener('click', (event) => {
        const drawer = document.getElementById('cartDrawer');

        if (drawer && window.bootstrap && window.bootstrap.Offcanvas) {
          event.preventDefault();
          event.stopImmediatePropagation();
          window.bootstrap.Offcanvas.getOrCreateInstance(drawer).show();
          return;
        }

        // Keep the cart reachable even if the drawer library is unavailable.
        window.location.href = 'cart.html';
      });
    });
  }

  function renderCartDrawer() {
    const cartList = document.getElementById('cartDrawerItems');
    const subtotalEl = document.getElementById('cartDrawerSubtotal');
    const totalEl = document.getElementById('cartDrawerTotal');
    const deliveryEl = document.getElementById('cartDrawerDelivery');

    if (!cartList) return;

    const cart = getCart();
    if (cart.length === 0) {
      cartList.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-basket3 text-muted display-3 mb-3"></i>
          <h5 class="fw-bold">Your Box is Empty</h5>
          <p class="text-muted small">Explore fresh groceries to fill your weekly subscription box.</p>
          <a href="shop.html" class="btn btn-primary btn-sm mt-2">Browse All Groceries</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (totalEl) totalEl.textContent = '₹0';
      if (deliveryEl) deliveryEl.textContent = '₹0';
      return;
    }

    let html = '';
    cart.forEach(item => {
      html += `
        <div class="d-flex align-items-center gap-3 p-3 border-bottom">
          <img src="${item.image}" alt="${item.name}" class="rounded-3 flex-shrink-0" style="width: 50px; height: 50px; object-fit: cover;">
          <div class="flex-grow-1 overflow-hidden">
            <h6 class="mb-0 fw-bold fs-6 text-dark text-truncate">${item.name}</h6>
            <span class="text-muted small">${item.unit} • ₹${item.price}</span>
            <div class="d-flex align-items-center justify-content-between mt-2">
              <div class="quantity-control quantity-control-sm">
                <button class="qty-btn qty-btn-sm" onclick="freshboxApp.updateQty('${item.id}', -1)">-</button>
                <span class="qty-input qty-input-sm">${item.qty}</span>
                <button class="qty-btn qty-btn-sm" onclick="freshboxApp.updateQty('${item.id}', 1)">+</button>
              </div>
              <span class="fw-bold text-success">₹${item.price * item.qty}</span>
            </div>
          </div>
          <button class="btn btn-sm text-danger p-0 ms-1 flex-shrink-0" onclick="freshboxApp.removeItem('${item.id}')" title="Remove">
            <i class="bi bi-trash3 fs-6"></i>
          </button>
        </div>
      `;
    });
    cartList.innerHTML = html;

    const subtotal = getCartSubtotal();
    const delivery = subtotal > 500 ? 0 : 50;
    const total = subtotal + delivery;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
    if (totalEl) totalEl.textContent = `₹${total}`;
  }

  function renderBoxBuilderSummary() {
    const summaryContainer = document.getElementById('boxBuilderItemsList');
    const summarySubtotal = document.getElementById('boxBuilderSubtotal');
    const summaryTotal = document.getElementById('boxBuilderTotal');
    const summaryItemCount = document.getElementById('boxBuilderItemCount');
    const summaryDelivery = document.getElementById('boxBuilderDelivery');

    if (!summaryContainer) return;

    const cart = getCart();
    const subtotal = getCartSubtotal();
    const delivery = subtotal > 500 ? 0 : 50;
    const total = subtotal + delivery;
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    if (cart.length === 0) {
      if (summaryItemCount) summaryItemCount.textContent = '0 Items';
      if (summarySubtotal) summarySubtotal.textContent = '₹0';
      if (summaryTotal) summaryTotal.textContent = '₹0';
      if (summaryDelivery) {
        summaryDelivery.textContent = '₹0';
        summaryDelivery.className = 'text-dark fw-bold small';
      }

      summaryContainer.innerHTML = `
        <div class="text-center py-4 px-2">
          <div class="mb-3 text-success opacity-75">
            <i class="bi bi-basket3 display-4"></i>
          </div>
          <h6 class="fw-bold text-dark mb-1">Your box is empty</h6>
          <p class="text-muted small mb-3">Start adding fresh groceries to build your weekly box.</p>
          <a href="#categoryFilterContainer" class="btn btn-outline-primary btn-sm rounded-pill px-3"><i class="bi bi-search me-1"></i> Explore Fresh Products</a>
        </div>
      `;
      return;
    }



    if (summaryItemCount) summaryItemCount.textContent = `${count} Items`;
    if (summarySubtotal) summarySubtotal.textContent = `₹${subtotal}`;
    if (summaryTotal) summaryTotal.textContent = `₹${total}`;
    if (summaryDelivery) {
      if (delivery === 0) {
        summaryDelivery.textContent = 'FREE';
        summaryDelivery.className = 'text-success fw-bold small';
      } else {
        summaryDelivery.textContent = `₹${delivery}`;
        summaryDelivery.className = 'text-dark fw-bold small';
      }
    }

    let html = '';
    cart.forEach(item => {
      html += `
        <div class="box-item-row d-flex align-items-center justify-content-between py-2.5 border-bottom gap-2">
          <div class="d-flex align-items-center gap-2.5 overflow-hidden flex-grow-1">
            <img src="${item.image}" alt="${item.name}" class="rounded-3 flex-shrink-0" style="width: 48px; height: 48px; object-fit: cover;">
            <div class="overflow-hidden flex-grow-1">
              <span class="fw-bold text-dark text-truncate d-block mb-1" style="font-size: 0.88rem; line-height: 1.25;" title="${item.name}">${item.name}</span>
              <div class="d-flex align-items-center gap-2">
                <div class="quantity-control quantity-control-sm">
                  <button class="qty-btn qty-btn-sm" onclick="freshboxApp.updateQty('${item.id}', -1)">-</button>
                  <span class="qty-input qty-input-sm">${item.qty}</span>
                  <button class="qty-btn qty-btn-sm" onclick="freshboxApp.updateQty('${item.id}', 1)">+</button>
                </div>
                <span class="text-muted small" style="font-size: 0.78rem;">× ₹${item.price}</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-2.5 flex-shrink-0 ms-1">
            <span class="fw-bold text-success" style="font-size: 0.95rem;">₹${item.price * item.qty}</span>
            <button class="btn btn-link text-danger p-0 border-0 ms-1" onclick="freshboxApp.removeItem('${item.id}')" title="Remove item">
              <i class="bi bi-trash" style="font-size: 1.05rem;"></i>
            </button>
          </div>
        </div>
      `;
    });
    summaryContainer.innerHTML = html;
  }

  function renderCartPage() {
    const tableBody = document.getElementById('cartPageTableBody');
    const subtotalEl = document.getElementById('cartPageSubtotal');
    const discountEl = document.getElementById('cartPageDiscount');
    const discountRow = document.getElementById('cartPageDiscountRow');
    const deliveryEl = document.getElementById('cartPageDelivery');
    const totalEl = document.getElementById('cartPageTotal');

    if (!tableBody) return;

    const cart = getCart();
    if (cart.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-5">
            <i class="bi bi-basket3 text-muted display-4 d-block mb-3"></i>
            <h5>Your grocery box is currently empty</h5>
            <p class="text-muted small">Explore our farm fresh organic catalogue and add items to your cart.</p>
            <a href="shop.html" class="btn btn-primary btn-sm mt-2">Go to Shop</a>
          </td>
        </tr>
      `;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (deliveryEl) deliveryEl.textContent = '₹0';
      if (totalEl) totalEl.textContent = '₹0';
      return;
    }

    let html = '';
    cart.forEach(item => {
      html += `
        <tr>
          <td class="align-middle">
            <div class="d-flex align-items-center gap-3">
              <img src="${item.image}" alt="${item.name}" class="rounded-3 shadow-xs" style="width: 60px; height: 60px; object-fit: cover;">
              <div>
                <a href="product-details.html?id=${item.id}" class="fw-bold text-dark text-decoration-none d-block">${item.name}</a>
                <span class="text-muted small">${item.unit}</span>
              </div>
            </div>
          </td>
          <td class="align-middle fw-semibold">₹${item.price}</td>
          <td class="align-middle">
            <div class="quantity-control d-inline-flex">
              <button class="qty-btn" onclick="freshboxApp.updateQty('${item.id}', -1)">-</button>
              <span class="qty-input">${item.qty}</span>
              <button class="qty-btn" onclick="freshboxApp.updateQty('${item.id}', 1)">+</button>
            </div>
          </td>
          <td class="align-middle fw-bold text-success">₹${item.price * item.qty}</td>
          <td class="align-middle text-end">
            <button class="btn btn-sm text-danger" onclick="freshboxApp.removeItem('${item.id}')" title="Remove">
              <i class="bi bi-trash3 fs-5"></i>
            </button>
          </td>
        </tr>
      `;
    });
    tableBody.innerHTML = html;

    const subtotal = getCartSubtotal();
    const coupon = getAppliedCoupon();
    let discount = 0;
    if (coupon) {
      discount = coupon.type === 'percent' ? Math.round(subtotal * coupon.value) : Math.min(coupon.value, subtotal);
    }
    const delivery = (subtotal > 500 || subtotal === 0) ? 0 : 50;
    const finalTotal = Math.max(0, subtotal - discount + delivery);

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (discountRow) {
      if (discount > 0 && coupon) {
        discountRow.classList.remove('d-none');
        if (discountEl) discountEl.textContent = `-₹${discount} (${coupon.code})`;
      } else {
        discountRow.classList.add('d-none');
      }
    }
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
    if (totalEl) totalEl.textContent = `₹${finalTotal}`;

    // Render active coupon badge in cart page
    const couponStatusEl = document.getElementById('appliedCouponContainer');
    if (couponStatusEl) {
      if (coupon && discount > 0) {
        couponStatusEl.innerHTML = `
          <div class="d-flex align-items-center justify-content-between p-2.5 px-3 bg-success-subtle border border-success-subtle rounded-3 text-success small">
            <div>
              <i class="bi bi-patch-check-fill me-1 fs-6"></i>
              Applied Coupon: <strong>${coupon.code}</strong> (${coupon.desc || 'Discount'}) — <strong>-₹${discount} OFF</strong>
            </div>
            <button type="button" class="btn btn-sm btn-link text-danger p-0 fw-bold text-decoration-none ms-2" onclick="freshboxApp.removeCoupon()">
              <i class="bi bi-x-circle-fill me-1"></i>Remove
            </button>
          </div>
        `;
        couponStatusEl.classList.remove('d-none');
      } else {
        couponStatusEl.innerHTML = '';
        couponStatusEl.classList.add('d-none');
      }
    }
  }

  function renderCheckoutSummary() {
    const listEl = document.getElementById('checkoutOrderItemsList');
    const subtotalEl = document.getElementById('checkoutSubtotal');
    const discountEl = document.getElementById('checkoutDiscount');
    const discountRow = document.getElementById('checkoutDiscountRow');
    const deliveryEl = document.getElementById('checkoutDelivery');
    const totalEl = document.getElementById('checkoutTotal');

    if (!listEl) return;

    const cart = getCart();
    if (cart.length === 0) {
      listEl.innerHTML = '<p class="text-muted small text-center my-3">No items in your order.</p>';
      return;
    }

    let html = '';
    cart.forEach(item => {
      html += `
        <div class="checkout-item-row">
          <div class="d-flex align-items-center gap-3 min-width-0 flex-grow-1">
            <div class="checkout-item-img-wrap">
              <img src="${item.image}" alt="${item.name}" class="rounded-2" style="width: 44px; height: 44px; object-fit: cover;">
            </div>
            <div class="min-width-0 flex-grow-1">
              <span class="fw-semibold text-dark fs-6 d-block text-truncate">${item.name}</span>
              <small class="text-muted d-block text-truncate">${item.qty} × ₹${item.price} (${item.unit})</small>
            </div>
          </div>
          <div class="checkout-item-price">
            <span class="fw-bold text-dark">₹${item.price * item.qty}</span>
          </div>
        </div>
      `;
    });
    listEl.innerHTML = html;

    const subtotal = getCartSubtotal();
    const coupon = getAppliedCoupon();
    let discount = 0;
    if (coupon) {
      discount = coupon.type === 'percent' ? Math.round(subtotal * coupon.value) : Math.min(coupon.value, subtotal);
    }
    const delivery = subtotal > 500 ? 0 : 50;
    const finalTotal = Math.max(0, subtotal - discount + delivery);

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (discountRow) {
      if (discount > 0) {
        discountRow.classList.remove('d-none');
        if (discountEl) discountEl.textContent = `-₹${discount} (${coupon.code})`;
      } else {
        discountRow.classList.add('d-none');
      }
    }
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE' : `₹${delivery}`;
    if (totalEl) totalEl.textContent = `₹${finalTotal}`;
  }

  // --- Quick View Modal Helper ---
  function openQuickView(prodId) {
    const prod = PRODUCTS.find(p => p.id === prodId);
    if (!prod) return;

    let modalEl = document.getElementById('quickViewModal');
    if (!modalEl) {
      const modalHtml = `
        <div class="modal fade" id="quickViewModal" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow-lg" style="border-radius: var(--radius-xl);">
              <div class="modal-body p-4 position-relative" id="quickViewModalContent"></div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modalEl = document.getElementById('quickViewModal');
    }

    const content = document.getElementById('quickViewModalContent');
    content.innerHTML = `
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal"></button>
      <div class="row g-4 align-items-center">
        <div class="col-md-6">
          <img src="${prod.image}" alt="${prod.name}" class="img-fluid rounded-4 shadow-sm w-100" style="height: 320px; object-fit: cover;">
        </div>
        <div class="col-md-6">
          <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 mb-2">${prod.categoryName}</span>
          <h3 class="fw-bold text-dark mb-1">${prod.name}</h3>
          <div class="d-flex align-items-center gap-2 mb-3">
            <div class="text-warning">
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
            </div>
            <span class="text-muted small">(${prod.reviewsCount} reviews)</span>
          </div>
          <div class="d-flex align-items-baseline gap-2 mb-3">
            <span class="fs-3 fw-bold text-success">₹${prod.price}</span>
            ${prod.originalPrice ? `<span class="text-muted text-decoration-line-through">₹${prod.originalPrice}</span>` : ''}
            <span class="text-muted small">/ ${prod.unit}</span>
          </div>
          <p class="text-muted small mb-4">${prod.description}</p>
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="quantity-control">
              <button class="qty-btn" id="qvQtyMinus">-</button>
              <span class="qty-input" id="qvQty">1</span>
              <button class="qty-btn" id="qvQtyPlus">+</button>
            </div>
            <button class="btn btn-primary flex-grow-1" id="qvAddToCartBtn">
              <i class="bi bi-basket2-fill"></i> Add to Box
            </button>
          </div>
          <div class="d-flex gap-2">
            <a href="product-details.html?id=${prod.id}" class="btn btn-outline-secondary btn-sm w-100">
              <i class="bi bi-box-arrow-up-right"></i> View Full Details
            </a>
          </div>
        </div>
      </div>
    `;

    let qvQuantity = 1;
    const qtySpan = document.getElementById('qvQty');
    document.getElementById('qvQtyMinus').onclick = () => { if (qvQuantity > 1) { qvQuantity--; qtySpan.textContent = qvQuantity; } };
    document.getElementById('qvQtyPlus').onclick = () => { qvQuantity++; qtySpan.textContent = qvQuantity; };
    document.getElementById('qvAddToCartBtn').onclick = () => {
      addToCart({ id: prod.id, name: prod.name, category: prod.category, price: prod.price, unit: prod.unit, image: prod.image, qty: qvQuantity });
      const modal = bootstrap.Modal.getInstance(modalEl);
      if (modal) modal.hide();
    };

    if (window.bootstrap && bootstrap.Modal) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  // --- Toast Notification Helper ---
  function showToast(title, message, type = 'success') {
    let container = document.querySelector('.fresh-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'fresh-toast-container toast-container position-fixed bottom-0 end-0 p-3';
      document.body.appendChild(container);
    }

    const toastId = 'toast-' + Date.now();
    const iconClass = type === 'success' ? 'bi-check-circle-fill text-success' :
                      type === 'warning' ? 'bi-exclamation-triangle-fill text-warning' :
                      type === 'danger' ? 'bi-x-circle-fill text-danger' : 'bi-info-circle-fill text-primary';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center shadow-lg border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <i class="bi ${iconClass} me-2 fs-5"></i>
          <strong class="me-auto">${title}</strong>
          <small class="text-muted">Just now</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body bg-white text-dark">
          ${message}
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    if (window.bootstrap && bootstrap.Toast) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
      toast.show();
      toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    }
  }

  // --- Sticky Navbar Scroll ---
  function initStickyNavbar() {
    const navbar = document.querySelector('.fresh-navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Live Search Overlay ---
  function initLiveSearch() {
    const searchInput = document.getElementById('globalSearchInput');
    const searchResults = document.getElementById('globalSearchResults');
    if (!searchInput || !searchResults) return;

    const sampleSearchData = [
      { title: 'Veggie Subscription Box', category: 'Plans', url: 'plans.html' },
      { title: 'Family Essentials Box', category: 'Plans', url: 'plans.html' },
      { title: '100% Organic Box', category: 'Plans', url: 'plans.html' },
      { title: 'Fresh Vine Tomatoes', category: 'Vegetables', url: 'product-details.html?id=prod-1' },
      { title: 'Organic Baby Spinach', category: 'Vegetables', url: 'product-details.html?id=prod-2' },
      { title: 'Royal Gala Apples', category: 'Fruits', url: 'product-details.html?id=prod-3' },
      { title: 'Farm Fresh A2 Organic Milk', category: 'Dairy', url: 'product-details.html?id=prod-5' },
      { title: 'Whole Grain Sourdough Loaf', category: 'Bakery', url: 'product-details.html?id=prod-7' },
      { title: 'Cold Pressed Virgin Olive Oil', category: 'Pantry', url: 'product-details.html?id=prod-9' },
      { title: 'Wild Forest Raw Honey', category: 'Organic', url: 'product-details.html?id=prod-11' },
      { title: 'Cold-Pressed Green Detox Juice', category: 'Beverages', url: 'product-details.html?id=prod-15' },
      { title: 'How Grocery Subscriptions Work', category: 'Guide', url: 'how-it-works.html' },
      { title: '10 Secrets to Keeping Farm Greens Crisp', category: 'Blog', url: 'blog-details.html' }
    ];

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        searchResults.innerHTML = '<p class="text-muted text-center py-4">Type to search produce, plans, or recipes...</p>';
        return;
      }
      const matched = sampleSearchData.filter(item => item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q));
      if (matched.length === 0) {
        searchResults.innerHTML = `<p class="text-muted text-center py-4">No results found for "<strong>${q}</strong>".</p>`;
        return;
      }
      let html = '<div class="list-group list-group-flush">';
      matched.forEach(item => {
        html += `
          <a href="${item.url}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3">
            <div>
              <h6 class="mb-0 fw-bold">${item.title}</h6>
              <span class="badge bg-light text-success border border-success-subtle mt-1">${item.category}</span>
            </div>
            <i class="bi bi-chevron-right text-muted"></i>
          </a>
        `;
      });
      html += '</div>';
      searchResults.innerHTML = html;
    });

    // Keyboard shortcut (Ctrl+K / Cmd+K) to open search modal
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const modalEl = document.getElementById('searchModal');
        if (modalEl && window.bootstrap) {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
          setTimeout(() => searchInput && searchInput.focus(), 300);
        }
      }
    });
  }

  // --- Demo Checkout Processor ---
  function processDemoCheckout(e) {
    if (e && e.preventDefault) e.preventDefault();
    const btn = document.getElementById('placeOrderBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing Payment...';
    }
    setTimeout(() => {
      const orderId = 'FB-' + Math.floor(100000 + Math.random() * 900000);
      const subtotal = getCartSubtotal();
      sessionStorage.setItem('freshbox_latest_order', JSON.stringify({
        orderId: orderId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: getCart(),
        subtotal: subtotal,
        delivery: subtotal > 500 ? 0 : 50,
        total: subtotal + (subtotal > 500 ? 0 : 50)
      }));
      window.location.href = 'payment-success.html';
    }, 1200);
  }

  // --- How It Works Step Navigation Handlers ---
  function handleCustomizeStepClick(e) {
    // Direct navigation to Shop Catalog (shop.html)
    return true;
  }

  function handleFrequencyStepClick(e) {
    const auth = getAuthUser();
    // If guest clicks frequency/settings, can go directly to delivery-frequency.html or login
    if (auth && auth.role === 'customer') {
      // customer logged in
      return true;
    }
    return true;
  }

  function handleEnjoyStepClick(e) {
    if (e && e.preventDefault) e.preventDefault();
    const auth = getAuthUser();
    const latestOrder = sessionStorage.getItem('freshbox_latest_order');
    const hasActiveSub = localStorage.getItem('freshbox_subscription_active') === 'true';

    if (auth && auth.role === 'customer') {
      showToast('Welcome Subscriber', 'Redirecting to your delivery schedule and subscription portal...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard/subscription.html';
      }, 400);
    } else if (latestOrder || hasActiveSub) {
      showToast('Order Found', 'Opening your active subscription dashboard...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard/index.html';
      }, 400);
    } else {
      showToast('No Active Subscription', 'Choose a subscription plan to start enjoying weekly farm-fresh deliveries!', 'info');
      setTimeout(() => {
        window.location.href = 'plans.html';
      }, 600);
    }
    return false;
  }

  // Update How It Works dynamic status labels on DOM ready
  function updateHowItWorksUI() {
    const auth = getAuthUser();
    const step4ActionLabel = document.getElementById('step4ActionLabel');
    if (step4ActionLabel) {
      if (auth && auth.role === 'customer') {
        step4ActionLabel.innerHTML = 'My Subscription <i class="bi bi-arrow-right"></i>';
      } else {
        step4ActionLabel.innerHTML = 'View Plans & Pricing <i class="bi bi-arrow-right"></i>';
      }
    }
  }

  // --- Wishlist Management ---
  const WISHLIST_KEY = 'freshbox_wishlist_items';

  function normalizeProdId(id) {
    if (!id) return 'prod-1';
    const cleanId = String(id).trim();
    if (cleanId.startsWith('prod-')) return cleanId;
    const num = cleanId.replace(/\D/g, '');
    if (num) return 'prod-' + num;
    return cleanId;
  }

  function getWishlist() {
    const saved = localStorage.getItem(WISHLIST_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(id => normalizeProdId(id));
        }
      } catch (e) { }
    }
    return ['prod-1', 'prod-3']; // Default wishlist items
  }

  function toggleWishlist(prodId) {
    const normId = normalizeProdId(prodId);
    let wishlist = getWishlist();
    const index = wishlist.indexOf(normId);
    let isAdded = false;

    if (index > -1) {
      wishlist.splice(index, 1);
      isAdded = false;
    } else {
      wishlist.push(normId);
      isAdded = true;
    }

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    updateWishlistBadges();
    
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const btnId = normalizeProdId(btn.getAttribute('data-wishlist-id'));
      if (btnId === normId) {
        if (isAdded) {
          btn.classList.add('active');
          btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        } else {
          btn.classList.remove('active');
          btn.innerHTML = '<i class="bi bi-heart"></i>';
        }
      }
    });

    const prod = PRODUCTS.find(p => p.id === normId) || PRODUCTS[0];
    const prodName = prod ? prod.name : 'Item';

    if (isAdded) {
      showToast('Added to Wishlist', `${prodName} has been saved to your wishlist.`, 'success');
    } else {
      showToast('Removed from Wishlist', `${prodName} removed from your wishlist.`, 'warning');
    }
    return isAdded;
  }

  function isWishlisted(prodId) {
    const normId = normalizeProdId(prodId);
    return getWishlist().includes(normId);
  }

  function updateWishlistBadges() {
    const count = getWishlist().length;
    document.querySelectorAll('.wishlist-badge').forEach(badge => {
      badge.textContent = count;
    });
  }

  // --- Scroll Animation Observer ---
  function initScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    } else {
      document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
    }
  }

  // --- Statistics Count-Up Engine ---
  function initStatCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    if (counters.length === 0) return;

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-count') || el.textContent.replace(/\D/g, '')) || 100;
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      let start = 0;
      const duration = 1400;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          el.textContent = prefix + target + suffix;
          clearInterval(timer);
        } else {
          el.textContent = prefix + Math.floor(start) + suffix;
        }
      }, stepTime);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      counters.forEach(counter => observer.observe(counter));
    } else {
      counters.forEach(counter => animateCounter(counter));
    }
  }

  // --- Sticky Navbar Scroll Effect ---
  function initStickyNavbar() {
    const navbar = document.querySelector('.fresh-navbar');
    if (!navbar) return;
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --- Initialize on DOMContentLoaded ---
  document.addEventListener('DOMContentLoaded', () => {
    initSocialLinks();
    initStickyNavbar();
    initCartDrawerTriggers();
    initScrollAnimations();
    initStatCounters();
    renderAuthUI();
    updateCartBadges();
    updateWishlistBadges();
    renderCartDrawer();
    renderBoxBuilderSummary();
    renderCartPage();
    renderCheckoutSummary();
    initLiveSearch();
    updateHowItWorksUI();
  });

  // Global Export
  window.PRODUCTS = PRODUCTS;
  window.SOCIAL_LINKS = SOCIAL_LINKS;
  window.freshboxApp = {
    products: PRODUCTS,
    getCart,
    addToCart,
    removeItem: removeFromCart,
    updateQty: updateItemQty,
    getWishlist,
    toggleWishlist,
    isWishlisted,
    normalizeProdId,
    getAuth: getAuthUser,
    setAuth: setAuthUser,
    applyCoupon: applyCouponCode,
    removeCoupon: removeCouponCode,
    openQuickView,
    processCheckout: processDemoCheckout,
    handleCustomizeStep: handleCustomizeStepClick,
    handleFrequencyStep: handleFrequencyStepClick,
    handleEnjoyStep: handleEnjoyStepClick,
    initScrollAnimations,
    showToast
  };
  window.showToast = showToast;
})();
