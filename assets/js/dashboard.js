/**
 * FreshBox - Dashboard JavaScript (Customer Portal & Admin Panel)
 * Handles Sidebar toggle, Chart.js Visualizations, Subscription Actions, and Modals
 */

(function () {
  'use strict';

  // --- Mobile Sidebar Toggle ---
  function initSidebarToggle() {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth < 992 && sidebar.classList.contains('show') && !sidebar.contains(e.target) && e.target !== toggleBtn) {
        sidebar.classList.remove('show');
      }
    });
  }

  // --- Admin Chart.js Visualizations ---
  function initAdminCharts() {
    // 1. Revenue Chart
    const revenueCtx = document.getElementById('adminRevenueChart');
    if (revenueCtx && window.Chart) {
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [{
            label: 'Monthly Revenue (₹)',
            data: [420000, 560000, 680000, 810000, 950000, 1120000, 1280000, 1450000],
            borderColor: '#2e7d32',
            backgroundColor: 'rgba(46, 125, 50, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#2e7d32',
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0,0,0,0.05)' },
              ticks: {
                callback: function (value) { return '₹' + (value / 1000) + 'k'; }
              }
            },
            x: {
              grid: { display: false }
            }
          }
        }
      });
    }

    // 2. Subscription Distribution Doughnut
    const subCtx = document.getElementById('adminSubscriptionChart');
    if (subCtx && window.Chart) {
      new Chart(subCtx, {
        type: 'doughnut',
        data: {
          labels: ['Family Essentials', 'Veggie Box', 'Organic Box', 'Premium Box'],
          datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: ['#2e7d32', '#8bc34a', '#ff9800', '#0284c7'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' }
          },
          cutout: '70%'
        }
      });
    }

    // 3. Customer Growth Bar Chart
    const growthCtx = document.getElementById('adminCustomerGrowthChart');
    if (growthCtx && window.Chart) {
      new Chart(growthCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'New Subscribers',
            data: [28, 45, 38, 52, 64, 78, 60],
            backgroundColor: '#4caf50',
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  }

  // --- Customer Portal Action Handlers ---
  function initCustomerActions() {
    // Pause Subscription action
    const pauseBtn = document.getElementById('confirmPauseSubBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('pauseSubModal'));
        if (modal) modal.hide();
        const badge = document.getElementById('subStatusBadge');
        if (badge) {
          badge.className = 'badge bg-warning text-dark px-3 py-2 fs-6';
          badge.textContent = 'Paused (Resumes Sept 15)';
        }
        if (window.showToast) {
          window.showToast('Subscription Paused', 'Your subscription is paused until September 15.', 'warning');
        }
      });
    }

    // Skip Next Delivery action
    const skipBtn = document.getElementById('confirmSkipDeliveryBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('skipDeliveryModal'));
        if (modal) modal.hide();
        const nextDeliveryEl = document.getElementById('nextDeliveryDateText');
        if (nextDeliveryEl) {
          nextDeliveryEl.innerHTML = '<span class="text-danger">Skipped</span> &rarr; Next: <strong>Sept 11, 2026</strong>';
        }
        if (window.showToast) {
          window.showToast('Delivery Skipped', 'Your delivery for Sept 4 has been skipped at no charge.', 'info');
        }
      });
    }

    // Swap Item simulation
    window.swapBoxItem = function (oldName, newName) {
      if (window.showToast) {
        window.showToast('Item Swapped', `Replaced ${oldName} with ${newName} in your upcoming box.`, 'success');
      }
      const modal = bootstrap.Modal.getInstance(document.getElementById('swapItemModal'));
      if (modal) modal.hide();
    };

    // Save Box Changes
    const saveBoxBtn = document.getElementById('saveBoxChangesBtn');
    if (saveBoxBtn) {
      saveBoxBtn.addEventListener('click', () => {
        saveBoxBtn.disabled = true;
        saveBoxBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving Changes...';
        setTimeout(() => {
          saveBoxBtn.disabled = false;
          saveBoxBtn.innerHTML = '<i class="bi bi-check2-circle me-2"></i>Saved Successfully';
          if (window.showToast) {
            window.showToast('Box Updated', 'Your grocery selections for next week have been saved.', 'success');
          }
        }, 800);
      });
    }
  }

  // --- Admin Catalog & Order Actions ---
  function initAdminActions() {
    // Add Product Modal Form Submit
    const addProductForm = document.getElementById('adminAddProductForm');
    if (addProductForm) {
      addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        if (modal) modal.hide();
        if (window.showToast) {
          window.showToast('Product Added', 'New product successfully created in inventory.', 'success');
        }
      });
    }

    // Quick Order Status Change Handlers
    document.querySelectorAll('.admin-order-status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const val = e.target.value;
        if (window.showToast) {
          window.showToast('Order Status Updated', `Order #${e.target.dataset.orderId} marked as ${val.toUpperCase()}`, 'success');
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSidebarToggle();
    initCustomerActions();
  });
})();
