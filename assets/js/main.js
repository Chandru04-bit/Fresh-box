/**
 * FreshBox - Main JavaScript Platform Engine
 * Handles Cart, Box Customizer, Shop Catalog, Quick View, Checkout, Coupons, Auth State, Toasts & Live Search
 */

(function () {
  'use strict';

  // Synchronous route protection check
  const AUTH_BOOTSTRAP_KEY = 'freshbox_auth_user';
  const rawAuth = localStorage.getItem(AUTH_BOOTSTRAP_KEY);
  let isCustomer = false;
  if (rawAuth) {
    try {
      const parsed = JSON.parse(rawAuth);
      if (parsed && parsed.role === 'customer') {
        isCustomer = true;
      }
    } catch (e) {}
  }
  const isDashboardPage = window.location.pathname.includes('/dashboard/');
  if (isDashboardPage && !isCustomer) {
    // Determine redirect prefix depending on exact path nesting
    window.location.href = '../login.html';
    return;
  }

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

  // --- Auth & User State Management ---
  const AUTH_KEY = 'freshbox_auth_user';
  const USERS_KEY = 'freshbox_users';

  function getStoredUsers() {
    try {
      const raw = localStorage.getItem(USERS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      const filtered = parsed.filter((user) => {
        if (!user || typeof user !== 'object') return false;
        const email = String(user.email || '').trim().toLowerCase();
        const id = String(user.id || '');
        return email !== 'chandru@freshbox.com' && id !== 'user_default';
      });

      if (filtered.length !== parsed.length) {
        localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
      }

      return filtered;
    } catch (e) {
      return [];
    }
  }

  function saveStoredUsers(users) {
    const cleaned = Array.isArray(users)
      ? users.filter((user) => {
          if (!user || typeof user !== 'object') return false;
          const email = String(user.email || '').trim().toLowerCase();
          const id = String(user.id || '');
          return email !== 'chandru@freshbox.com' && id !== 'user_default';
        })
      : [];
    localStorage.setItem(USERS_KEY, JSON.stringify(cleaned));
  }

  function getAuthUser() {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role === 'customer') {
          const users = getStoredUsers();
          const match = users.find(u => u.email.toLowerCase() === parsed.email.toLowerCase());
          if (match) {
            return {
              role: 'customer',
              id: match.id,
              name: match.name,
              email: match.email,
              phone: match.phone,
              address: match.address || '',
              city: match.city || '',
              state: match.state || '',
              postalCode: match.postalCode || '',
              subscription: match.subscription || null,
              notifications: match.notifications || []
            };
          }
          return parsed;
        }
        return { role: 'guest' };
      } catch (e) { }
    }
    return { role: 'guest' };
  }

  function setAuthUser(user) {
    if (!user || user.role === 'guest') {
      localStorage.setItem(AUTH_KEY, JSON.stringify({ role: 'guest' }));
      localStorage.removeItem(CURRENT_CUSTOMER_KEY);
    } else {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    renderAuthUI();
  }

  function getLoggedUser() {
    const auth = getAuthUser();
    if (!auth || auth.role !== 'customer') return null;
    const users = getStoredUsers();
    return users.find(u => u.email.toLowerCase() === auth.email.toLowerCase()) || null;
  }

  // Account data is created only from actual registration and successful checkout.
  // Do not seed a demo customer into localStorage.

  // --- Notifications Management ---
  function getNotifications() {
    const user = getLoggedUser();
    return user ? (user.notifications || []) : [];
  }

  function addNotification(title, message) {
    const auth = getAuthUser();
    if (!auth || auth.role !== 'customer') return;
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === auth.email.toLowerCase());
    if (user) {
      if (!user.notifications) user.notifications = [];
      user.notifications.unshift({
        id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
        title,
        message,
        date: new Date().toISOString(),
        read: false
      });
      saveStoredUsers(users);
      if (window.renderNotificationsUI) {
        window.renderNotificationsUI();
      }
    }
  }

  function markAllNotificationsRead(e) {
    if (e && e.preventDefault) e.preventDefault();
    const auth = getAuthUser();
    if (!auth || auth.role !== 'customer') return;
    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === auth.email.toLowerCase());
    if (user && user.notifications) {
      user.notifications.forEach(n => n.read = true);
      saveStoredUsers(users);
      if (window.renderNotificationsUI) {
        window.renderNotificationsUI();
      }
    }
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatNotificationTime(dateStr) {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    } catch (e) {
      return '';
    }
  }

  function renderNotificationsUI() {
    const itemsContainer = document.getElementById('notificationItems');
    const badgeEl = document.getElementById('notificationBadge');
    if (!itemsContainer) return;

    const notifications = getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    if (badgeEl) {
      if (unreadCount > 0) {
        badgeEl.textContent = unreadCount;
        badgeEl.classList.remove('d-none');
      } else {
        badgeEl.classList.add('d-none');
      }
    }

    if (notifications.length === 0) {
      itemsContainer.innerHTML = `
        <div class="text-center py-4 text-muted">
          <i class="bi bi-bell-slash display-6 d-block mb-2"></i>
          <p class="mb-0 small">No notifications yet.</p>
        </div>
      `;
      return;
    }

    itemsContainer.innerHTML = notifications.map(n => {
      const timeStr = formatNotificationTime(n.date);
      const bgClass = n.read ? '' : 'bg-light-subtle fw-semibold';
      const indicator = n.read ? '' : '<span class="position-absolute top-50 end-0 translate-middle-y me-3 badge rounded-circle bg-success p-1" style="width: 8px; height: 8px;"><span class="visually-hidden">New</span></span>';
      return `
        <li class="dropdown-item p-3 border-bottom position-relative ${bgClass}" style="white-space: normal;">
          <div class="pe-4">
            <div class="small fw-bold text-dark mb-1">${escapeHTML(n.title)}</div>
            <p class="mb-1 text-muted small" style="line-height: 1.4; font-size: 0.8rem;">${escapeHTML(n.message)}</p>
            <span class="text-secondary small" style="font-size: 0.72rem;">${timeStr}</span>
          </div>
          ${indicator}
        </li>
      `;
    }).join('');
  }

  function initNotificationUI() {
    const isSubfolder = window.location.pathname.includes('/dashboard/');
    if (!isSubfolder) return;

    const themeToggle = document.querySelector('.theme-toggle-btn');
    if (!themeToggle) return;

    if (document.getElementById('notificationBadge')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'dropdown notification-dropdown me-1';
    wrapper.innerHTML = `
      <button class="nav-action-btn position-relative" type="button" data-bs-toggle="dropdown" aria-expanded="false" title="Notifications">
        <i class="bi bi-bell"></i>
        <span id="notificationBadge" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none" style="font-size: 0.65rem; padding: 0.25em 0.4em;">0</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end shadow-sm p-0" style="width: 320px; max-height: 380px; overflow: hidden;" id="notificationList">
        <li class="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
          <h6 class="fw-bold mb-0 text-dark">Notifications</h6>
          <button class="btn btn-sm btn-link text-success p-0 text-decoration-none fw-bold" onclick="freshboxApp.markAllNotificationsRead(event)">Mark all as read</button>
        </li>
        <div id="notificationItems" style="max-height: 300px; overflow-y: auto;">
          <!-- Dynamic notification items -->
        </div>
      </ul>
    `;

    themeToggle.parentNode.insertBefore(wrapper, themeToggle);
    renderNotificationsUI();
  }

  function updateDashboardHeader() {
    const user = getLoggedUser();
    if (!user) return;

    // Update Topbar welcome
    const welcomeEls = document.querySelectorAll('.dashboard-topbar h5, header.dashboard-topbar h5');
    welcomeEls.forEach(el => {
      const welcomeText = el.nextElementSibling;
      if (welcomeText && welcomeText.classList.contains('text-muted') && welcomeText.textContent.includes('Welcome back')) {
        welcomeText.textContent = `Welcome back, ${user.name.split(' ')[0]}`;
      }
    });

    // Update Dropdown name
    const dropdownNames = document.querySelectorAll('.nav-user-dropdown button span.d-none, .nav-user-dropdown button span.d-sm-inline');
    dropdownNames.forEach(el => {
      if (!el.classList.contains('nav-user-avatar')) {
        el.textContent = user.name.split(' ')[0];
      }
    });
  }

  window.renderNotificationsUI = renderNotificationsUI;

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
        const displayName = user.name || 'User';
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
    const payBtn = document.getElementById('placeOrderBtn');

    if (!listEl) return;

    const selectedPlan = getSelectedPlanConfig();
    const subtotal = Number(selectedPlan.price || 0);
    const delivery = 0;
    const finalTotal = subtotal;

    listEl.innerHTML = `
      <div class="checkout-item-row">
        <div class="d-flex align-items-center gap-3 min-width-0 flex-grow-1">
          <div class="checkout-item-img-wrap">
            <img src="assets/images/plans/freshbox-subscription.jpg" alt="${selectedPlan.name}" class="rounded-2" style="width: 44px; height: 44px; object-fit: cover;">
          </div>
          <div class="min-width-0 flex-grow-1">
            <span class="fw-semibold text-dark fs-6 d-block text-truncate">${selectedPlan.name}</span>
            <small class="text-muted d-block text-truncate">1 × ₹${selectedPlan.price} (${selectedPlan.frequencyLabel})</small>
          </div>
        </div>
        <div class="checkout-item-price">
          <span class="fw-bold text-dark">₹${selectedPlan.price}</span>
        </div>
      </div>
    `;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (discountRow) {
      discountRow.classList.add('d-none');
      if (discountEl) discountEl.textContent = '-₹0';
    }
    if (deliveryEl) deliveryEl.textContent = 'FREE';
    if (totalEl) totalEl.textContent = `₹${finalTotal}`;
    if (payBtn) {
      payBtn.innerHTML = `<i class="bi bi-lock-fill me-2"></i> Pay ₹${finalTotal}`;
    }
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

  // --- Order Persistence & Dashboard Data ---
  const ORDERS_KEY = 'freshbox_orders';
  const LATEST_ORDER_KEY = 'freshbox_latest_order';
  const CURRENT_CUSTOMER_KEY = 'freshbox_current_customer';

  function formatCurrency(value) {
    const numericValue = Number(value || 0);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(numericValue);
  }

  function getStoredOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveStoredOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getSelectedPlanConfig() {
    const selectedPlanName = (localStorage.getItem('freshbox_selected_plan') || '').trim();
    const savedFreq = (localStorage.getItem('freshbox_subscription_freq') || localStorage.getItem('freshbox_frequency') || 'weekly').toLowerCase();

    const planMap = {
      weekly: {
        name: 'Weekly Delivery',
        frequency: 'Weekly',
        frequencyLabel: 'Every Week',
        price: 899,
        itemName: 'Weekly Delivery Subscription',
        key: 'weekly'
      },
      biweekly: {
        name: 'Biweekly Delivery',
        frequency: 'Biweekly',
        frequencyLabel: 'Every 2 Weeks',
        price: 949,
        itemName: 'Biweekly Delivery Subscription',
        key: 'biweekly'
      },
      monthly: {
        name: 'Monthly Delivery',
        frequency: 'Monthly',
        frequencyLabel: 'Monthly',
        price: 3399,
        itemName: 'Monthly Delivery Subscription',
        key: 'monthly'
      }
    };

    if (/weekly/i.test(selectedPlanName)) return planMap.weekly;
    if (/biweekly|every 2 weeks/i.test(selectedPlanName)) return planMap.biweekly;
    if (/monthly/i.test(selectedPlanName)) return planMap.monthly;

    if (planMap[savedFreq]) return planMap[savedFreq];

    return planMap.weekly;
  }

  function buildOrderFromCheckout() {
    const form = document.getElementById('checkoutForm');
    const customerName = form ? (document.getElementById('customerFullName')?.value || '').trim() : '';
    const customerEmail = form ? (document.getElementById('customerEmail')?.value || '').trim() : '';
    const customerPhone = form ? (document.getElementById('customerPhone')?.value || '').trim() : '';
    const altPhone = form ? (document.getElementById('customerAltPhone')?.value || '').trim() : '';
    const customerAddress = form ? (document.getElementById('deliveryStreetAddress')?.value || '').trim() : '';
    const city = form ? (document.getElementById('deliveryCity')?.value || '').trim() : '';
    const state = form ? (document.getElementById('deliveryState')?.value || '').trim() : '';
    const postalCode = form ? (document.getElementById('deliveryPostalCode')?.value || '').trim() : '';
    const deliveryAddress = [customerAddress, city, state, postalCode].filter(Boolean).join(', ');
    const selectedPlanConfig = getSelectedPlanConfig();
    const selectedPlan = selectedPlanConfig.name;
    const planPrice = Number(selectedPlanConfig.price || 0);
    const paymentMethod = document.querySelector('input[name="paymentOption"]:checked')?.id || 'payUPI';
    const paymentMethodLabel = paymentMethod === 'payCard' ? 'Card' : paymentMethod === 'payNet' ? 'Net Banking' : paymentMethod === 'payCOD' ? 'Cash on Delivery' : 'UPI';
    const today = new Date();
    const startDate = new Date(today);
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 1);
    const orderTotal = planPrice;

    return {
      orderId: 'ORD-' + String(Math.floor(100000 + Math.random() * 900000)),
      customerName,
      customerEmail,
      customerPhone,
      alternativePhone: altPhone,
      selectedPlan,
      planPrice,
      subscriptionFrequency: selectedPlanConfig.frequencyLabel,
      orderDate: today.toISOString(),
      paymentDate: today.toISOString(),
      paymentMethod: paymentMethodLabel,
      paymentStatus: paymentMethod === 'payCOD' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      deliveryAddress,
      subscriptionStartDate: startDate.toISOString(),
      subscriptionEndDate: endDate.toISOString(),
      amount: orderTotal,
      items: [{
        id: 'plan_' + selectedPlanConfig.key,
        name: selectedPlanConfig.itemName,
        image: 'assets/images/plans/freshbox-subscription.jpg',
        price: planPrice,
        quantity: 1,
        unit: selectedPlanConfig.frequencyLabel
      }],
      subtotal: orderTotal,
      deliveryFee: 0,
      discount: 0,
      totalAmount: orderTotal,
      currency: 'INR'
    };
  }

  function getUserOrders() {
    const user = getCurrentCustomerProfile();
    const normalizedEmail = (user.email || '').trim().toLowerCase();
    const orders = getStoredOrders();

    if (!normalizedEmail) {
      return [];
    }

    return orders
      .filter(order => (order.customerEmail || '').trim().toLowerCase() === normalizedEmail)
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  }

  function renderDashboardStats() {
    const user = getLoggedUser();
    if (!user) return;

    const orders = getUserOrders();
    const latestOrder = orders[0] || null;
    const totalPaid = orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + Number(order.totalAmount || order.amount || 0), 0);

    const setValue = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    // 1. KPI Cards
    setValue('dashboardTotalOrders', String(orders.length));
    setValue('dashboardActiveSubscription', user.subscription && user.subscription.status !== 'Cancelled' ? user.subscription.plan : 'No Active Plan');
    setValue('dashboardLatestOrder', latestOrder ? latestOrder.orderId : 'No Orders');
    setValue('dashboardTotalPaid', formatCurrency(totalPaid));

    // 2. Welcome headers
    const welcomeEl = document.getElementById('dashboardWelcomeName');
    if (welcomeEl) {
      welcomeEl.textContent = `Welcome back, ${user.name}`;
    }

    const profileNameEl = document.getElementById('dashboardProfileName');
    if (profileNameEl) profileNameEl.textContent = user.name;

    const profileMetaEl = document.getElementById('dashboardProfileMeta');
    if (profileMetaEl) {
      const phone = user.phone ? ` • ${user.phone}` : '';
      profileMetaEl.textContent = `${user.email}${phone}`;
    }

    // 3. Next Delivery Card and Progress Timeline
    const nextDeliveryTitle = document.getElementById('nextDeliveryTitle');
    const nextDeliverySchedule = document.getElementById('nextDeliverySchedule');
    const nextDeliveryProgressContainer = document.getElementById('nextDeliveryProgressContainer');
    const nextDeliveryProgressBadge = document.getElementById('nextDeliveryProgressBadge');
    const nextDeliveryProgressBar = document.getElementById('nextDeliveryProgressBar');
    const nextDeliveryActions = document.getElementById('nextDeliveryActions');
    const nextDeliveryStatusCheck = document.getElementById('nextDeliveryStatusCheck');

    if (user.subscription && user.subscription.status !== 'Cancelled') {
      const sub = user.subscription;
      const renewalDateObj = new Date(sub.renewalDate);
      const formattedDate = renewalDateObj.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

      if (nextDeliveryTitle) {
        nextDeliveryTitle.innerHTML = `${sub.plan} Box ${latestOrder ? '#' + latestOrder.orderId : ''}`;
      }
      if (nextDeliverySchedule) {
        nextDeliverySchedule.textContent = `Scheduled for ${formattedDate} • Morning Slot (07:00 AM – 11:00 AM)`;
      }

      if (nextDeliveryStatusCheck) {
        if (sub.status === 'Paused') {
          nextDeliveryStatusCheck.innerHTML = '<i class="bi bi-pause-circle-fill text-warning"></i> Subscription Paused';
        } else {
          nextDeliveryStatusCheck.innerHTML = '<i class="bi bi-shield-check text-success"></i> Payment Confirmed';
        }
      }

      if (nextDeliveryProgressContainer) nextDeliveryProgressContainer.classList.remove('d-none');
      if (nextDeliveryActions) nextDeliveryActions.classList.remove('d-none');

      // Update progress bar
      if (sub.status === 'Paused') {
        if (nextDeliveryProgressBadge) {
          nextDeliveryProgressBadge.textContent = 'Paused';
          nextDeliveryProgressBadge.className = 'badge bg-warning text-dark';
        }
        if (nextDeliveryProgressBar) {
          nextDeliveryProgressBar.style.width = '0%';
          nextDeliveryProgressBar.className = 'progress-bar bg-warning';
        }
      } else {
        // Active
        let progressPercent = 25;
        let badgeText = 'Confirmed';
        let badgeClass = 'badge bg-info';

        if (latestOrder) {
          const status = latestOrder.orderStatus;
          if (status === 'Delivered') {
            progressPercent = 100;
            badgeText = 'Delivered';
            badgeClass = 'badge bg-success';
          } else if (status === 'Shipped') {
            progressPercent = 75;
            badgeText = 'Dispatched';
            badgeClass = 'badge bg-success';
          } else if (status === 'Preparing') {
            progressPercent = 50;
            badgeText = 'Preparing on Farm';
            badgeClass = 'badge bg-primary';
          } else if (status === 'Cancelled') {
            progressPercent = 0;
            badgeText = 'Cancelled';
            badgeClass = 'badge bg-danger';
          }
        }

        if (nextDeliveryProgressBadge) {
          nextDeliveryProgressBadge.textContent = badgeText;
          nextDeliveryProgressBadge.className = badgeClass;
        }
        if (nextDeliveryProgressBar) {
          nextDeliveryProgressBar.style.width = `${progressPercent}%`;
          nextDeliveryProgressBar.className = `progress-bar bg-success progress-bar-striped progress-bar-animated`;
        }
      }
    } else {
      // Cancelled or None
      if (nextDeliveryTitle) nextDeliveryTitle.textContent = 'No Active Subscription';
      if (nextDeliverySchedule) nextDeliverySchedule.textContent = 'Select a weekly subscription plan to start receiving fresh farm-to-table groceries.';
      if (nextDeliveryStatusCheck) nextDeliveryStatusCheck.innerHTML = '<i class="bi bi-exclamation-circle text-danger"></i> Inactive';
      if (nextDeliveryProgressContainer) nextDeliveryProgressContainer.classList.add('d-none');
      if (nextDeliveryActions) {
        nextDeliveryActions.innerHTML = `
          <a href="../plans.html" class="btn btn-primary btn-sm">
            <i class="bi bi-gift-fill"></i> Choose a Subscription Plan
          </a>
        `;
      }
    }

    // 4. Controls Summary Card
    const controlsPlanName = document.getElementById('controlsPlanName');
    const controlsFrequency = document.getElementById('controlsFrequency');
    const controlsAddress = document.getElementById('controlsAddress');
    const controlsPaymentMethod = document.getElementById('controlsPaymentMethod');

    if (user.subscription && user.subscription.status !== 'Cancelled') {
      const sub = user.subscription;
      if (controlsPlanName) controlsPlanName.textContent = `${sub.plan} (${formatCurrency(sub.price)}/${sub.frequency === 'Weekly' ? 'wk' : sub.frequency === 'Biweekly' ? '2wk' : 'mo'})`;
      if (controlsFrequency) controlsFrequency.textContent = `${sub.frequency} (Every Friday)`;
      if (controlsAddress) controlsAddress.textContent = user.address ? `${user.address.substring(0, 20)}...` : 'Not provided';
      if (controlsPaymentMethod) {
        if (latestOrder && latestOrder.paymentMethod) {
          controlsPaymentMethod.innerHTML = `<i class="bi bi-credit-card"></i> ${latestOrder.paymentMethod}`;
        } else {
          controlsPaymentMethod.innerHTML = '<i class="bi bi-credit-card"></i> Visa •••• 4242';
        }
      }
    } else {
      if (controlsPlanName) controlsPlanName.textContent = 'None';
      if (controlsFrequency) controlsFrequency.textContent = 'None';
      if (controlsAddress) controlsAddress.textContent = user.address ? `${user.address.substring(0, 20)}...` : 'Not provided';
      if (controlsPaymentMethod) controlsPaymentMethod.textContent = 'None';
    }

    // 5. Profile Details Card
    const addressLine1 = document.querySelector('.p-3.border.rounded-3.mb-3 p.text-dark');
    const addressLine2 = document.querySelector('.p-3.border.rounded-3.mb-3 p.text-muted');
    if (addressLine1 && addressLine2) {
      if (user.address) {
        addressLine1.textContent = user.name;
        addressLine2.textContent = `${user.address}, ${user.city || ''}, ${user.state || ''} ${user.postalCode || ''}`;
      } else {
        addressLine1.textContent = 'No delivery address saved.';
        addressLine2.textContent = 'Please edit your profile details to add your primary delivery location.';
      }
    }

    const signedInAsEl = document.getElementById('dashboardSignedInAs');
    if (signedInAsEl) {
      signedInAsEl.innerHTML = `Signed in as <strong>${user.name}</strong>`;
    }
  }

  function renderDashboardOrders() {
    const container = document.getElementById('recentOrdersList');
    if (!container) return;

    const orders = getUserOrders().slice(0, 3);
    if (!orders.length) {
      container.innerHTML = `
        <div class="text-center py-5 text-muted">
          <i class="bi bi-bag-x display-5 d-block mb-3 text-secondary"></i>
          <h6 class="fw-bold text-dark">No orders yet</h6>
          <p class="mb-3 small">Choose a subscription plan to start enjoying weekly farm-fresh grocery deliveries!</p>
          <a href="../plans.html" class="btn btn-sm btn-primary px-3 rounded-pill">Choose a Plan</a>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      let badgeClass = 'bg-success-subtle text-success border-success-subtle';
      if (order.orderStatus === 'Cancelled') {
        badgeClass = 'bg-danger-subtle text-danger border-danger-subtle';
      } else if (order.orderStatus === 'Preparing') {
        badgeClass = 'bg-primary-subtle text-primary border-primary-subtle';
      }

      return `
        <div class="border rounded-3 p-3 mb-3 bg-light-subtle">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <div class="fw-bold text-dark">${order.orderId}</div>
              <small class="text-secondary">${new Date(order.orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</small>
            </div>
            <span class="badge ${badgeClass} border px-2 py-1">${order.orderStatus || 'Confirmed'}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="fw-semibold text-dark">${order.selectedPlan}</div>
              <small class="text-muted">${order.subscriptionFrequency || 'Weekly'}</small>
            </div>
            <div class="text-end">
              <div class="fw-bold text-success">${formatCurrency(order.totalAmount || order.amount || 0)}</div>
              <button type="button" class="btn btn-sm btn-outline-primary mt-2 py-1 px-2 rounded-2" data-order-id="${order.orderId}"><i class="bi bi-eye"></i> View Details</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('[data-order-id]').forEach(button => {
      button.addEventListener('click', () => {
        const order = getUserOrders().find(item => item.orderId === button.dataset.orderId);
        if (order) openOrderDetailsModal(order);
      });
    });
  }

  function openOrderDetailsModal(order) {
    let modalEl = document.getElementById('viewOrderModal');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.className = 'modal fade';
      modalEl.id = 'viewOrderModal';
      modalEl.tabIndex = -1;
      modalEl.setAttribute('aria-hidden', 'true');
      modalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title fw-bold text-dark">Order Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body" id="viewOrderModalBody"></div>
          </div>
        </div>
      `;
      document.body.appendChild(modalEl);
    }

    const body = document.getElementById('viewOrderModalBody');
    if (body) {
      const cancelBtnHtml = (order.orderStatus === 'Confirmed' || order.orderStatus === 'Preparing')
        ? `<button type="button" class="btn btn-danger btn-sm w-100" id="cancelOrderModalBtn"><i class="bi bi-x-circle me-1"></i> Cancel This Order</button>`
        : '';
      const orderItems = Array.isArray(order.items) ? order.items : [];
      const itemsHtml = orderItems.length ? orderItems.map(item => {
        const quantity = Number(item.quantity || item.qty || 1);
        const price = Number(item.price || 0);
        const image = item.image ? `<img src="${item.image}" alt="${item.name || 'Product'}" class="rounded border" style="width:48px;height:48px;object-fit:cover;">` : '<div class="rounded border bg-light d-flex align-items-center justify-content-center" style="width:48px;height:48px;"><i class="bi bi-bag"></i></div>';
        return `<div class="d-flex align-items-center gap-2 py-2 border-bottom">${image}<div class="flex-grow-1"><div class="fw-semibold">${item.name || 'Product'}</div><small class="text-muted">${quantity} × ${formatCurrency(price)}</small></div><span class="fw-bold">${formatCurrency(quantity * price)}</span></div>`;
      }).join('') : `<div class="small text-muted">No individual product lines were saved for this legacy order.</div>`;

      body.innerHTML = `
        <div class="row g-3 mb-4">
          <div class="col-sm-6">
            <span class="text-muted small d-block">Order ID</span>
            <span class="fw-bold text-dark fs-6">${order.orderId}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Subscription Plan</span>
            <span class="fw-bold text-dark fs-6">${order.selectedPlan}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Payment Status</span>
            <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">${order.paymentStatus || 'Paid'}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Order Status</span>
            <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">${order.orderStatus || 'Confirmed'}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Order Date</span>
            <span class="fw-bold text-dark">${new Date(order.orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Payment Date</span>
            <span class="fw-bold text-dark">${order.paymentDate ? new Date(order.paymentDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Pending'}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Amount</span>
            <span class="fw-bold text-success fs-5">${formatCurrency(order.totalAmount || order.amount || 0)}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Payment Method</span>
            <span class="fw-bold text-dark fs-6">${order.paymentMethod || 'Not recorded'}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Transaction ID</span>
            <span class="fw-bold text-dark fs-6">${order.transactionId || order.orderId}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Delivery Frequency</span>
            <span class="fw-bold text-dark">${order.subscriptionFrequency || 'Weekly'}</span>
          </div>
          <div class="col-sm-6">
            <span class="text-muted small d-block">Subscription Duration</span>
            <span class="fw-bold text-dark small">Start: ${order.subscriptionStartDate ? new Date(order.subscriptionStartDate).toLocaleDateString('en-IN') : 'N/A'} &bull; End/Renewal: ${order.subscriptionEndDate ? new Date(order.subscriptionEndDate).toLocaleDateString('en-IN') : 'N/A'}</span>
          </div>
          <div class="col-sm-12">
            <span class="text-muted small d-block">Customer Details</span>
            <span class="fw-bold text-dark">${order.customerName || 'Customer'} &bull; ${order.customerEmail} &bull; ${order.customerPhone}</span>
          </div>
          <div class="col-sm-12">
            <span class="text-muted small d-block">Delivery Address</span>
            <span class="fw-bold text-dark">${order.deliveryAddress || 'Address not provided'}</span>
          </div>
          <div class="col-sm-12">
            <span class="text-muted small d-block mb-1">Products &amp; quantities</span>
            <div class="border rounded p-2">${itemsHtml}</div>
          </div>
        </div>
        <div class="d-flex gap-2">
          ${cancelBtnHtml}
          <button type="button" class="btn btn-secondary btn-sm w-100" data-bs-dismiss="modal">Back to Orders</button>
        </div>
      `;

      const cancelBtn = document.getElementById('cancelOrderModalBtn');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          if (confirm(`Are you sure you want to cancel order #${order.orderId}?`)) {
            const allOrders = getStoredOrders();
            const target = allOrders.find(o => o.orderId === order.orderId);
            if (target) {
              target.orderStatus = 'Cancelled';
              target.paymentStatus = 'Refunded';
              saveStoredOrders(allOrders);
              
              addNotification('Order Cancelled', `Your order #${order.orderId} has been successfully cancelled and refunded.`);
              showToast('Order Cancelled', `Order #${order.orderId} was cancelled.`, 'warning');
              
              const modal = bootstrap.Modal.getInstance(modalEl);
              if (modal) modal.hide();

              renderOrdersTable();
              renderDashboardStats();
              renderDashboardOrders();
            }
          }
        });
      }
    }

    if (window.bootstrap && bootstrap.Modal) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  let ordersCurrentPage = 1;
  const ordersItemsPerPage = 5;

  function renderOrdersTable() {
    const tableBody = document.getElementById('customerOrdersTableBody');
    if (!tableBody) return;

    const searchVal = (document.getElementById('orderSearchInput')?.value || '').toLowerCase().trim();
    const statusVal = document.getElementById('orderStatusFilter')?.value || 'all';
    const startDateVal = document.getElementById('orderStartDate')?.value || '';
    const endDateVal = document.getElementById('orderEndDate')?.value || '';
    const sortVal = document.getElementById('orderSortSelect')?.value || 'newest';

    let orders = getUserOrders();

    if (searchVal) {
      orders = orders.filter(o => 
        o.orderId.toLowerCase().includes(searchVal) ||
        (o.selectedPlan && o.selectedPlan.toLowerCase().includes(searchVal)) ||
        (o.customerName && o.customerName.toLowerCase().includes(searchVal))
      );
    }

    if (statusVal !== 'all') {
      orders = orders.filter(o => (o.orderStatus || '').toLowerCase() === statusVal);
    }

    if (startDateVal) {
      const start = new Date(startDateVal + 'T00:00:00');
      orders = orders.filter(o => new Date(o.orderDate) >= start);
    }
    if (endDateVal) {
      const end = new Date(endDateVal + 'T23:59:59');
      orders = orders.filter(o => new Date(o.orderDate) <= end);
    }

    if (sortVal === 'newest') {
      orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    } else {
      orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
    }

    const totalOrders = orders.length;
    const totalPages = Math.ceil(totalOrders / ordersItemsPerPage) || 1;
    if (ordersCurrentPage > totalPages) {
      ordersCurrentPage = totalPages;
    }

    const startIndex = (ordersCurrentPage - 1) * ordersItemsPerPage;
    const endIndex = Math.min(startIndex + ordersItemsPerPage, totalOrders);
    const paginatedOrders = orders.slice(startIndex, endIndex);

    const infoEl = document.getElementById('paginationInfo');
    if (infoEl) {
      if (totalOrders === 0) {
        infoEl.textContent = 'Showing 0 to 0 of 0 entries';
      } else {
        infoEl.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${totalOrders} entries`;
      }
    }

    if (!paginatedOrders.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-5 text-muted">
            <i class="bi bi-bag-x display-6 d-block mb-2"></i>
            No orders found for this account.
          </td>
        </tr>
      `;
      renderPaginationControls(totalPages);
      return;
    }

    tableBody.innerHTML = paginatedOrders.map(order => {
      let badgeClass = 'bg-success-subtle text-success border-success-subtle';
      if (order.orderStatus === 'Cancelled') {
        badgeClass = 'bg-danger-subtle text-danger border-danger-subtle';
      } else if (order.orderStatus === 'Preparing') {
        badgeClass = 'bg-primary-subtle text-primary border-primary-subtle';
      }

      return `
        <tr>
          <td class="fw-bold text-dark">${order.orderId}</td>
          <td>${new Date(order.orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
          <td>${order.selectedPlan}</td>
          <td class="fw-bold text-success">${formatCurrency(order.totalAmount || order.amount || 0)}</td>
          <td><span class="badge ${badgeClass} border">${order.orderStatus || 'Confirmed'}</span></td>
          <td>
            <button class="btn btn-sm btn-outline-primary py-0 px-2 rounded-2" data-order-id="${order.orderId}">
              <i class="bi bi-eye"></i> View Details
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tableBody.querySelectorAll('[data-order-id]').forEach(button => {
      button.addEventListener('click', () => {
        const order = orders.find(item => item.orderId === button.dataset.orderId);
        if (order) openOrderDetailsModal(order);
      });
    });

    renderPaginationControls(totalPages);
  }

  function renderPaginationControls(totalPages) {
    const pagContainer = document.getElementById('ordersPagination');
    if (!pagContainer) return;

    if (totalPages <= 1) {
      pagContainer.innerHTML = '';
      return;
    }

    let html = '';
    
    html += `
      <li class="page-item ${ordersCurrentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${ordersCurrentPage - 1}" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
      html += `
        <li class="page-item ${ordersCurrentPage === i ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }

    html += `
      <li class="page-item ${ordersCurrentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${ordersCurrentPage + 1}" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `;

    pagContainer.innerHTML = html;

    pagContainer.querySelectorAll('a[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page, 10);
        if (page >= 1 && page <= totalPages) {
          ordersCurrentPage = page;
          renderOrdersTable();
        }
      });
    });
  }

  function initOrderHistoryFilters() {
    const searchInput = document.getElementById('orderSearchInput');
    const statusFilter = document.getElementById('orderStatusFilter');
    const startDateFilter = document.getElementById('orderStartDate');
    const endDateFilter = document.getElementById('orderEndDate');
    const sortSelect = document.getElementById('orderSortSelect');

    const triggerRefresh = () => {
      ordersCurrentPage = 1;
      renderOrdersTable();
    };

    searchInput?.addEventListener('input', triggerRefresh);
    statusFilter?.addEventListener('change', triggerRefresh);
    startDateFilter?.addEventListener('change', triggerRefresh);
    endDateFilter?.addEventListener('change', triggerRefresh);
    sortSelect?.addEventListener('change', triggerRefresh);
  }

  function renderSubscriptionPage() {
    const isSubscriptionPage = window.location.pathname.includes('subscription.html');
    if (!isSubscriptionPage) return;

    const user = getLoggedUser();
    if (!user) return;

    const sub = user.subscription;

    const statusBadge = document.getElementById('subStatusBadge');
    const planTitle = document.getElementById('subPlanTitle');
    const planMeta = document.getElementById('subPlanMeta');
    const planPrice = document.getElementById('subPlanPrice');
    const planUnit = document.getElementById('subPlanUnit');
    const planFrequency = document.getElementById('subPlanFrequency');
    const nextDeliveryDateText = document.getElementById('nextDeliveryDateText');
    const paymentMethod = document.getElementById('subPaymentMethod');
    const actionsContainer = document.getElementById('subscriptionActionsContainer');

    if (sub && sub.status !== 'Cancelled') {
      const activeText = sub.status === 'Paused' ? 'Paused' : 'Active Subscription';
      const activeClass = sub.status === 'Paused' ? 'bg-warning-subtle text-warning border border-warning-subtle' : 'bg-success-subtle text-success border border-success-subtle';
      const activeIcon = sub.status === 'Paused' ? '<i class="bi bi-pause-circle-fill me-1"></i>' : '<i class="bi bi-check-circle-fill me-1"></i>';

      if (statusBadge) {
        statusBadge.innerHTML = `${activeIcon} ${activeText}`;
        statusBadge.className = `badge ${activeClass} px-3 py-2 fs-6 mb-2`;
      }

      if (planTitle) planTitle.textContent = `${sub.plan} Box`;
      if (planPrice) planPrice.innerHTML = `&#8377;${sub.price}`;
      if (planUnit) planUnit.textContent = `/ ${sub.frequency === 'Weekly' ? 'weekly' : sub.frequency === 'Biweekly' ? 'biweekly' : 'monthly'} shipment`;
      if (planFrequency) planFrequency.textContent = `${sub.frequency} (Every Friday)`;
      
      const renewalDateObj = new Date(sub.renewalDate);
      if (nextDeliveryDateText) {
        nextDeliveryDateText.textContent = renewalDateObj.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      }

      if (actionsContainer) {
        actionsContainer.innerHTML = `
          <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#changePlanModal">
            <i class="bi bi-arrow-left-right"></i> Change Plan Size
          </button>
          <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#changeFreqModal">
            <i class="bi bi-clock-history"></i> Change Frequency
          </button>
          ${sub.status === 'Paused' 
            ? `<button class="btn btn-success btn-sm" id="resumeSubscriptionBtn"><i class="bi bi-play-circle"></i> Resume Subscription</button>`
            : `<button class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#pauseSubModal"><i class="bi bi-pause-circle"></i> Pause Subscription</button>`
          }
          <button class="btn btn-outline-danger btn-sm ms-md-auto" data-bs-toggle="modal" data-bs-target="#cancelSubModal">
            <i class="bi bi-x-circle"></i> Cancel Subscription
          </button>
        `;
      }
    } else {
      if (statusBadge) {
        statusBadge.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-1"></i> Inactive';
        statusBadge.className = 'badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 fs-6 mb-2';
      }
      if (planTitle) planTitle.textContent = 'No Active Plan';
      if (planMeta) planMeta.textContent = 'Choose a subscription plan to receive fresh harvest boxes weekly.';
      if (planPrice) planPrice.innerHTML = '&#8377;0';
      if (planUnit) planUnit.textContent = '';
      if (planFrequency) planFrequency.textContent = 'None';
      if (nextDeliveryDateText) nextDeliveryDateText.textContent = 'Not Scheduled';

      if (actionsContainer) {
        actionsContainer.innerHTML = `
          <a href="../plans.html" class="btn btn-primary btn-sm">
            <i class="bi bi-gift-fill"></i> Choose Subscription Plan
          </a>
        `;
      }
    }

    const resumeBtn = document.getElementById('resumeSubscriptionBtn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj && userObj.subscription) {
          userObj.subscription.status = 'Active';
          saveStoredUsers(users);
          addNotification('Subscription Resumed', 'Your farm box subscription has been successfully resumed.');
          showToast('Subscription Resumed', 'Your deliveries will start arriving this Friday.', 'success');
          renderSubscriptionPage();
          renderDashboardStats();
        }
      });
    }

    const confirmChangePlanBtn = document.getElementById('confirmChangePlanBtn');
    if (confirmChangePlanBtn) {
      confirmChangePlanBtn.onclick = () => {
        const selectedPlanRadio = document.querySelector('input[name="planSelectOption"]:checked');
        if (!selectedPlanRadio) return;

        const newPlanName = selectedPlanRadio.value;
        let newPlanPrice = 899;
        if (newPlanName === 'Veggie Box') newPlanPrice = 499;
        if (newPlanName === '100% Organic Box') newPlanPrice = 1199;

        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj && userObj.subscription) {
          userObj.subscription.plan = newPlanName;
          userObj.subscription.price = newPlanPrice;
          saveStoredUsers(users);

          addNotification('Plan Upgraded', `Your subscription size has been changed to ${newPlanName}.`);
          showToast('Plan Size Updated', `Successfully changed plan size to ${newPlanName}.`, 'success');

          const modalEl = document.getElementById('changePlanModal');
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();

          renderSubscriptionPage();
          renderDashboardStats();
        }
      };
    }

    const confirmChangeFreqBtn = document.getElementById('confirmChangeFreqBtn');
    if (confirmChangeFreqBtn) {
      confirmChangeFreqBtn.onclick = () => {
        const selectedFreqRadio = document.querySelector('input[name="freqRadio"]:checked');
        if (!selectedFreqRadio) return;

        const newFreq = selectedFreqRadio.value;
        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj && userObj.subscription) {
          userObj.subscription.frequency = newFreq;
          saveStoredUsers(users);

          addNotification('Frequency Changed', `Delivery frequency updated to ${newFreq}.`);
          showToast('Frequency Updated', `Your boxes will now be shipped ${newFreq.toLowerCase()}.`, 'success');

          const modalEl = document.getElementById('changeFreqModal');
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();

          renderSubscriptionPage();
          renderDashboardStats();
        }
      };
    }

    const confirmPauseBtn = document.getElementById('confirmPauseSubBtn');
    if (confirmPauseBtn) {
      confirmPauseBtn.onclick = () => {
        const pauseWeeksSelect = document.getElementById('pauseDurationSelect');
        const weeks = pauseWeeksSelect ? parseInt(pauseWeeksSelect.value, 10) : 2;

        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj && userObj.subscription) {
          userObj.subscription.status = 'Paused';
          
          const currentRenewal = new Date(userObj.subscription.renewalDate);
          currentRenewal.setDate(currentRenewal.getDate() + (weeks * 7));
          userObj.subscription.renewalDate = currentRenewal.toISOString();

          saveStoredUsers(users);

          addNotification('Subscription Paused', `Your subscription has been paused for ${weeks} weeks.`);
          showToast('Subscription Paused', `Deliveries paused. Resume date: ${currentRenewal.toLocaleDateString('en-IN')}`, 'warning');

          const modalEl = document.getElementById('pauseSubModal');
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();

          renderSubscriptionPage();
          renderDashboardStats();
        }
      };
    }

    const confirmCancelBtn = document.getElementById('confirmCancelSubBtn');
    if (confirmCancelBtn) {
      confirmCancelBtn.onclick = () => {
        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj && userObj.subscription) {
          userObj.subscription.status = 'Cancelled';
          saveStoredUsers(users);

          addNotification('Subscription Cancelled', 'Your farm box subscription has been cancelled. We are sorry to see you go!');
          showToast('Subscription Cancelled', 'Your subscription is now inactive.', 'danger');

          const modalEl = document.getElementById('cancelSubModal');
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();

          renderSubscriptionPage();
          renderDashboardStats();
        }
      };
    }
  }

  function renderProfilePage() {
    const isProfilePage = window.location.pathname.includes('profile.html');
    if (!isProfilePage) return;

    const user = getLoggedUser();
    if (!user) return;

    const fullNameInput = document.getElementById('profileFullName');
    const emailInput = document.getElementById('profileEmail');
    const phoneInput = document.getElementById('profilePhone');

    if (fullNameInput) fullNameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
    if (phoneInput) phoneInput.value = user.phone || '';

    const addressInput = document.getElementById('profileAddress');
    const cityInput = document.getElementById('profileCity');
    const stateInput = document.getElementById('profileState');
    const postalCodeInput = document.getElementById('profilePostalCode');

    if (addressInput) addressInput.value = user.address || '';
    if (cityInput) cityInput.value = user.city || '';
    if (stateInput) stateInput.value = user.state || '';
    if (postalCodeInput) postalCodeInput.value = user.postalCode || '';

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.onsubmit = (e) => {
        e.preventDefault();
        const newName = fullNameInput.value.trim();
        const newPhone = phoneInput.value.trim();

        if (!newName || !newPhone) {
          showToast('Failed to Save', 'Name and Phone fields are required.', 'danger');
          return;
        }

        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj) {
          userObj.name = newName;
          userObj.phone = newPhone;
          saveStoredUsers(users);

          const auth = getAuthUser();
          if (auth) {
            auth.name = newName;
            auth.phone = newPhone;
            setAuthUser(auth);
          }

          addNotification('Profile Updated', 'Your personal details have been updated successfully.');
          showToast('Profile Updated', 'Your profile details have been saved.', 'success');
          updateDashboardHeader();
        }
      };
    }

    const addressForm = document.getElementById('addressForm');
    if (addressForm) {
      addressForm.onsubmit = (e) => {
        e.preventDefault();
        const newAddress = addressInput.value.trim();
        const newCity = cityInput.value.trim();
        const newState = stateInput.value.trim();
        const newPostalCode = postalCodeInput.value.trim();

        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj) {
          userObj.address = newAddress;
          userObj.city = newCity;
          userObj.state = newState;
          userObj.postalCode = newPostalCode;
          saveStoredUsers(users);

          addNotification('Address Updated', 'Your primary delivery address has been updated successfully.');
          showToast('Address Saved', 'Your default delivery address has been saved.', 'success');
          renderProfilePage();
          renderDashboardStats();
        }
      };
    }
  }

  function openInvoiceModal(order) {
    const titleEl = document.getElementById('invoiceModalTitle');
    const bodyEl = document.getElementById('invoiceModalBody');
    if (!titleEl || !bodyEl) return;

    titleEl.textContent = `Tax Invoice #${order.orderId.replace('ORD-', 'INV-')}`;

    const totalVal = Number(order.totalAmount || order.amount || 0);
    const subtotal = (totalVal / 1.05).toFixed(2);
    const gst = (totalVal - subtotal).toFixed(2);
    const user = getLoggedUser() || { name: 'Customer', email: 'customer@example.com', phone: 'Not provided' };

    bodyEl.innerHTML = `
      <div class="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3 text-dark">
        <div>
          <h4 class="fw-bold text-success mb-1">FreshBox Technologies Pvt Ltd</h4>
          <small class="text-muted d-block">GSTIN: 29AABCU9603R1ZM</small>
          <small class="text-muted d-block">HSR Layout Sector 1, Bangalore 560102</small>
        </div>
        <div class="text-end">
          <span class="badge ${order.paymentStatus === 'Refunded' ? 'bg-warning text-dark' : 'bg-success text-white'} px-3 py-2">${(order.paymentStatus || 'PAID').toUpperCase()}</span>
          <small class="text-muted d-block mt-1">Date: ${new Date(order.orderDate).toLocaleDateString('en-IN')}</small>
        </div>
      </div>

      <div class="row mb-4 text-dark">
        <div class="col-6">
          <span class="text-muted small d-block">Billed To:</span>
          <h6 class="fw-bold mb-0">${order.customerName || user.name}</h6>
          <small class="text-muted">${order.customerEmail || user.email} • ${order.customerPhone || user.phone}</small>
        </div>
        <div class="col-6 text-end">
          <span class="text-muted small d-block">Payment Transaction ID:</span>
          <code class="fw-bold text-dark">${order.transactionId || 'TXN_' + order.orderId.split('-')[1]}</code>
        </div>
      </div>

      <table class="table table-bordered small mb-3 text-dark">
        <thead class="bg-light">
          <tr>
            <th>Item Description</th>
            <th class="text-center">HSN</th>
            <th class="text-center">Qty</th>
            <th class="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${order.selectedPlan} Weekly Subscription Box (Fresh Produce)</td>
            <td class="text-center">0709</td>
            <td class="text-center">1</td>
            <td class="text-end">&#8377;${subtotal}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end fw-bold text-dark">GST (5%):</td>
            <td class="text-end fw-bold text-dark">&#8377;${gst}</td>
          </tr>
          <tr class="table-success">
            <td colspan="3" class="text-end fw-bold fs-6 text-dark">Grand Total:</td>
            <td class="text-end fw-bold fs-6 text-dark">&#8377;${totalVal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    `;

    const modalEl = document.getElementById('invoiceModal');
    if (window.bootstrap && bootstrap.Modal) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  }

  function renderBillingPage() {
    const isBillingPage = window.location.pathname.includes('billing.html');
    if (!isBillingPage) return;

    const user = getLoggedUser();
    if (!user) return;

    const orders = getUserOrders();
    const totalPaid = orders
      .filter(o => o.paymentStatus === 'Paid')
      .reduce((sum, order) => sum + Number(order.totalAmount || order.amount || 0), 0);

    const sub = user.subscription;

    const rateEl = document.getElementById('billingRatePerShipment');
    const chargeDateEl = document.getElementById('billingNextChargeDate');
    const spentEl = document.getElementById('billingTotalYTDSpent');

    if (sub && sub.status !== 'Cancelled') {
      if (rateEl) rateEl.textContent = `₹${sub.price}`;
      if (chargeDateEl) {
        chargeDateEl.textContent = new Date(sub.renewalDate).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
      }
    } else {
      if (rateEl) rateEl.textContent = 'None';
      if (chargeDateEl) chargeDateEl.textContent = 'None';
    }

    if (spentEl) {
      const boxesCount = orders.filter(o => o.paymentStatus === 'Paid').length;
      spentEl.textContent = `₹${totalPaid} (${boxesCount} Box${boxesCount !== 1 ? 'es' : ''})`;
    }

    const tableBody = document.getElementById('billingInvoicesTableBody');
    if (!tableBody) return;

    if (!orders.length) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-4 text-muted">
            <i class="bi bi-file-earmark-bar-graph display-6 d-block mb-2"></i>
            No invoices found for this account.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = orders.map(order => {
      const invId = order.orderId.replace('ORD-', 'INV-');
      const invoiceDate = new Date(order.orderDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
      let badgeClass = 'bg-success-subtle text-success border border-success-subtle';
      if (order.paymentStatus === 'Refunded') {
        badgeClass = 'bg-warning-subtle text-warning border border-warning-subtle';
      } else if (order.paymentStatus === 'Failed') {
        badgeClass = 'bg-danger-subtle text-danger border border-danger-subtle';
      }

      return `
        <tr>
          <td class="fw-bold text-dark">${invId}</td>
          <td>${invoiceDate}</td>
          <td>${order.selectedPlan} Box Shipment</td>
          <td class="fw-bold text-success">${formatCurrency(order.totalAmount || order.amount || 0)}</td>
          <td>${order.paymentMethod || 'Visa Card'}</td>
          <td><span class="badge ${badgeClass}">${order.paymentStatus || 'Paid'}</span></td>
          <td>
            <button class="btn btn-sm btn-outline-primary py-0 px-2 rounded-2" data-invoice-id="${order.orderId}">
              <i class="bi bi-printer"></i> View & Print
            </button>
          </td>
        </tr>
      `;
    }).join('');

    tableBody.querySelectorAll('[data-invoice-id]').forEach(button => {
      button.addEventListener('click', () => {
        const order = orders.find(o => o.orderId === button.getAttribute('data-invoice-id'));
        if (order) openInvoiceModal(order);
      });
    });
  }

  function initLogoutTrigger() {
    document.querySelectorAll('.sidebar-footer a, a[onclick*="setAuth"]').forEach(link => {
      if (link.textContent.toLowerCase().includes('logout') || link.innerHTML.toLowerCase().includes('power')) {
        link.removeAttribute('onclick');
        link.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem(AUTH_KEY);
          showToast('Logged Out', 'Redirecting to login...', 'info');
          setTimeout(() => {
            const isSubfolder = window.location.pathname.includes('/dashboard/');
            window.location.href = isSubfolder ? '../login.html' : 'login.html';
          }, 500);
        });
      }
    });
  }

  function renderSettingsPage() {
    const isSettingsPage = window.location.pathname.includes('settings.html');
    if (!isSettingsPage) return;

    const user = getLoggedUser();
    if (!user) return;

    const form = document.getElementById('settingsForm');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const currentPass = document.getElementById('settingsCurrentPass')?.value;
        const newPass = document.getElementById('settingsNewPass')?.value;

        if (!currentPass || !newPass) return;

        if (currentPass !== user.password) {
          showToast('Failed to Update', 'Current password is incorrect.', 'danger');
          return;
        }

        const users = getStoredUsers();
        const userObj = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (userObj) {
          userObj.password = newPass;
          saveStoredUsers(users);

          const auth = getAuthUser();
          if (auth) {
            auth.password = newPass;
            setAuthUser(auth);
          }

          showToast('Password Changed', 'Your security password has been updated.', 'success');
          form.reset();
        }
      };
    }
  }

  function prefillCheckoutDetails() {
    const isCheckoutPage = window.location.pathname.includes('checkout.html');
    if (!isCheckoutPage) return;

    const user = getLoggedUser();
    if (user) {
      const nameInput = document.getElementById('customerFullName');
      const emailInput = document.getElementById('customerEmail');
      const phoneInput = document.getElementById('customerPhone');
      const addressInput = document.getElementById('deliveryStreetAddress');
      const cityInput = document.getElementById('deliveryCity');
      const stateInput = document.getElementById('deliveryState');
      const postalCodeInput = document.getElementById('deliveryPostalCode');

      if (nameInput) nameInput.value = user.name || '';
      if (emailInput) emailInput.value = user.email || '';
      if (phoneInput) {
        let phone = user.phone || '';
        if (phone.startsWith('+91')) {
          phone = phone.replace('+91', '').trim();
        }
        phoneInput.value = phone;
      }
      if (addressInput) addressInput.value = user.address || '';
      if (cityInput) cityInput.value = user.city || '';
      if (stateInput) stateInput.value = user.state || '';
      if (postalCodeInput) postalCodeInput.value = user.postalCode || '';
    }
  }

  function processDemoCheckout(e) {
    if (e && e.preventDefault) e.preventDefault();
    const form = document.getElementById('checkoutForm');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = document.getElementById('placeOrderBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing Payment...';
    }

    setTimeout(() => {
      const order = buildOrderFromCheckout();
      order.transactionId = 'TXN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
      const authUser = getAuthUser();
      const currentCustomer = {
        name: order.customerName || authUser?.name || 'Customer',
        email: order.customerEmail || authUser?.email || '',
        phone: order.customerPhone || authUser?.phone || ''
      };

      if (!order.customerName || !order.customerEmail || !order.customerPhone) {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '<i class="bi bi-lock-fill me-2"></i> Pay & Start Subscription';
        }
        form?.reportValidity();
        return;
      }

      // Check if coupon code FAIL is applied
      const coupon = getAppliedCoupon();
      if (coupon && coupon.code.toUpperCase() === 'FAIL') {
        // Simulated payment failed flow
        if (authUser && authUser.role === 'customer') {
          addNotification('Payment failed', `Payment failed for your order subscription checkout.`);
        }
        showToast('Payment Failed', 'Your simulated bank transaction was declined.', 'danger');
        setTimeout(() => {
          window.location.href = 'payment-failed.html';
        }, 500);
        return;
      }

      // Successful checkout flow
      localStorage.setItem(CURRENT_CUSTOMER_KEY, JSON.stringify(currentCustomer));

      // Handle user registration / update
      const users = getStoredUsers();
      let userObj = users.find(u => u.email.toLowerCase() === currentCustomer.email.toLowerCase());
      if (!userObj) {
        // Automatically create account for guest checkout
        userObj = {
          id: 'user_' + Date.now(),
          name: currentCustomer.name,
          email: currentCustomer.email.toLowerCase(),
          phone: currentCustomer.phone,
          password: 'password123',
          address: document.getElementById('deliveryStreetAddress')?.value || '',
          city: document.getElementById('deliveryCity')?.value || '',
          state: document.getElementById('deliveryState')?.value || '',
          postalCode: document.getElementById('deliveryPostalCode')?.value || '',
          subscription: {
            plan: order.selectedPlan,
            price: order.amount,
            frequency: order.subscriptionFrequency,
            startDate: order.subscriptionStartDate,
            renewalDate: order.subscriptionEndDate,
            status: 'Active'
          },
          notifications: []
        };
        users.push(userObj);
      } else {
        // Update user subscription & address
        userObj.address = document.getElementById('deliveryStreetAddress')?.value || '';
        userObj.city = document.getElementById('deliveryCity')?.value || '';
        userObj.state = document.getElementById('deliveryState')?.value || '';
        userObj.postalCode = document.getElementById('deliveryPostalCode')?.value || '';
        userObj.subscription = {
          plan: order.selectedPlan,
          price: order.amount,
          frequency: order.subscriptionFrequency,
          startDate: order.subscriptionStartDate,
          renewalDate: order.subscriptionEndDate,
          status: 'Active'
        };
      }

      // Add notifications to user profile
      const orderId = order.orderId;
      if (!userObj.notifications) userObj.notifications = [];
      userObj.notifications.unshift({
        id: 'notif_checkout_pay_' + Date.now(),
        title: 'Payment Successful',
        message: `Payment of ₹${order.amount} processed successfully for order #${orderId}.`,
        date: new Date().toISOString(),
        read: false
      });
      userObj.notifications.unshift({
        id: 'notif_checkout_conf_' + Date.now(),
        title: 'Order Confirmed',
        message: `Your order #${orderId} has been confirmed. Preparing your fresh harvest.`,
        date: new Date().toISOString(),
        read: false
      });
      userObj.notifications.unshift({
        id: 'notif_checkout_sub_' + Date.now(),
        title: 'Subscription Activated',
        message: `Your ${order.selectedPlan} subscription is now active!`,
        date: new Date().toISOString(),
        read: false
      });

      saveStoredUsers(users);

      // Save order
      const existingOrders = getStoredOrders();
      existingOrders.unshift(order);
      saveStoredOrders(existingOrders);

      localStorage.setItem('freshbox_subscription_active', 'true');
      sessionStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(order));
      localStorage.setItem(LATEST_ORDER_KEY, JSON.stringify(order));

      // Auto login user
      setAuthUser({
        role: 'customer',
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        phone: userObj.phone
      });

      // Clear cart
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(COUPON_KEY);

      showToast('Payment Successful', 'Redirecting to confirmation page...', 'success');
      setTimeout(() => {
        window.location.href = 'payment-success.html';
      }, 500);
    }, 1000);
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
    initNotificationUI();
    updateDashboardHeader();
    initLogoutTrigger();
    updateCartBadges();
    updateWishlistBadges();
    renderCartDrawer();
    renderBoxBuilderSummary();
    renderCartPage();
    renderCheckoutSummary();
    prefillCheckoutDetails();
    renderSubscriptionPage();
    renderProfilePage();
    renderBillingPage();
    renderSettingsPage();
    renderDashboardStats();
    renderDashboardOrders();
    renderOrdersTable();
    initOrderHistoryFilters();
    initLiveSearch();
    updateHowItWorksUI();
  });

  // Keep open dashboard tabs in sync when checkout, profile, or orders change
  // in another tab. The checkout tab also updates its own state immediately.
  window.addEventListener('storage', (event) => {
    if (![AUTH_KEY, USERS_KEY, ORDERS_KEY, LATEST_ORDER_KEY].includes(event.key)) return;
    renderAuthUI();
    updateDashboardHeader();
    renderDashboardStats();
    renderDashboardOrders();
    renderOrdersTable();
    renderBillingPage();
    renderProfilePage();
    renderSettingsPage();
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
    getStoredUsers,
    saveStoredUsers,
    getLoggedUser,
    getNotifications,
    addNotification,
    markAllNotificationsRead,
    renderSubscriptionPage,
    renderProfilePage,
    renderBillingPage,
    renderSettingsPage,
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
