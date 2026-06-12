document.documentElement.classList.add('js-enabled');

(function () {
    const savedDir = localStorage.getItem('cacao_dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
})();

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. DIRECTION TOGGLE (RTL / LTR)
       ========================================================================== */
    const dirToggle = document.getElementById('dir-toggle');
    if (dirToggle) {
        const html = document.documentElement;
        dirToggle.textContent = html.getAttribute('dir') === 'rtl' ? 'LTR' : 'RTL';
        dirToggle.addEventListener('click', () => {
            const current = html.getAttribute('dir');
            const next = current === 'rtl' ? 'ltr' : 'rtl';
            html.setAttribute('dir', next);
            localStorage.setItem('cacao_dir', next);
            dirToggle.textContent = next === 'rtl' ? 'LTR' : 'RTL';
        });
    }

    /* ==========================================================================
       2. STICKY HEADER & SCROLL STATE
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    function checkScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run once at start in case of reload

    /* ==========================================================================
       2. MOBILE HAMBURGER MENU
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open on mobile
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    /* ==========================================================================
       3. SILENT CART FLOW & E-COMMERCE LOGIC
       ========================================================================== */
    let cart = JSON.parse(localStorage.getItem('cacao_cart')) || [];
    const cartCountBadge = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalVal = document.querySelector('.cart-total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    let toastTimeout = null;
    const cartToast = createCartToast();

    function createCartToast() {
        let toast = document.querySelector('.cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'cart-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }
        return toast;
    }

    function showCartToast(message) {
        if (!cartToast) return;
        cartToast.textContent = message;
        cartToast.classList.add('visible');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            cartToast.classList.remove('visible');
        }, 2200);
    }

    function animateAddButton(btn) {
        if (!btn) return;
        const originalContent = btn.innerHTML;
        btn.disabled = true;
        btn.classList.add('btn-adding');

        if (btn.classList.contains('add-to-cart-icon')) {
            btn.innerHTML = '<span class="button-checkmark">&#10003;</span>';
        } else {
            btn.textContent = 'Added';
        }

        setTimeout(() => {
            btn.disabled = false;
            btn.classList.remove('btn-adding');
            btn.innerHTML = originalContent;
        }, 900);
    }

    // Add To Cart Event Delegation (works for dynamic content too)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            e.preventDefault();
            const name = btn.getAttribute('data-name');
            const price = parseFloat(btn.getAttribute('data-price'));

            let imageSrc = 'images/hero.png';
            const itemCard = btn.closest('.truffle-feature-card') ||
                             btn.closest('.truffle-item-card') ||
                             btn.closest('.product-card') ||
                             btn.closest('.product-detail-grid') ||
                             btn.closest('.recipe-card-wrapper') ||
                             btn.closest('.modal-wrapper');

            if (itemCard) {
                const img = itemCard.querySelector('img');
                if (img) imageSrc = img.getAttribute('src');
            } else {
                const mainImg = document.getElementById('main-product-image');
                if (mainImg) imageSrc = mainImg.getAttribute('src');
            }

            addToCart(name, price, imageSrc);
            animateAddButton(btn);
            showCartToast(`${name} added to bag`);
        }
    });

    function addToCart(name, price, image) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name,
                price,
                image,
                quantity: 1
            });
        }
        updateCart();
    }

    function changeQuantity(name, amount) {
        const item = cart.find(item => item.name === name);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                removeFromCart(name);
                return;
            }
            updateCart();
        }
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCart();
    }

    function renderCartItems() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    <p>Your bag is currently empty.</p>
                    <a href="shop.html" class="btn btn-secondary-pill">Continue Shopping</a>
                </div>
            `;
            if (cartSubtotalVal) cartSubtotalVal.textContent = '$0.00';
            return;
        }

        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('cart-item');
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    ${item.desc ? `<p class="cart-item-desc" style="font-size: 0.72rem; color: var(--color-text-secondary); margin: 3px 0 6px 0; font-family: var(--font-sans); line-height: 1.3; font-weight: 300;">${item.desc}</p>` : ''}
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                    <div class="cart-item-quantity">
                        <button class="qty-btn dec-btn" data-name="${item.name}">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn inc-btn" data-name="${item.name}">+</button>
                        <button class="cart-item-remove" data-name="${item.name}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    function updateCart() {
        localStorage.setItem('cacao_cart', JSON.stringify(cart));

        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountBadge) {
            cartCountBadge.textContent = totalCount;
            cartCountBadge.classList.add('count-bounce');
            setTimeout(() => cartCountBadge.classList.remove('count-bounce'), 320);
        }

        if (cartSubtotalVal) {
            const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            cartSubtotalVal.textContent = `$${subtotal.toFixed(2)}`;
        }

        renderCartItems();
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const name = e.target.getAttribute('data-name');
            if (!name) return;
            if (e.target.classList.contains('inc-btn')) {
                changeQuantity(name, 1);
            } else if (e.target.classList.contains('dec-btn')) {
                changeQuantity(name, -1);
            } else if (e.target.classList.contains('cart-item-remove')) {
                removeFromCart(name);
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            checkoutBtn.textContent = 'Preparing checkout...';
            checkoutBtn.disabled = true;
            setTimeout(() => {
                alert('Thank you for choosing CACAO ARTISANAL! Checkout is currently simulated.');
                cart = [];
                updateCart();
                checkoutBtn.textContent = 'Proceed to Checkout';
                checkoutBtn.disabled = false;
            }, 1500);
        });
    }

    // Initial load update
    updateCart();


    /* ==========================================================================
       4. TESTIMONIAL SLIDER LOGIC
       ========================================================================== */
    const sliderContainer = document.querySelector('.slider-wrapper');
    if (sliderContainer) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        let currentSlide = 0;
        let sliderInterval;

        function showSlide(index) {
            if (slides.length === 0) return;
            // Remove active class from current slides/dots
            if (slides[currentSlide]) slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
            
            // Loop indexes
            currentSlide = (index + slides.length) % slides.length;
            
            // Add active class to target slide/dot
            if (slides[currentSlide]) slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetTimer();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetTimer();
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                showSlide(index);
                resetTimer();
            });
        });

        // Auto Cycle
        function startTimer() {
            sliderInterval = setInterval(nextSlide, 6000);
        }

        function resetTimer() {
            clearInterval(sliderInterval);
            startTimer();
        }

        startTimer();

        // Pause on hover
        sliderContainer.addEventListener('mouseenter', () => clearInterval(sliderInterval));
        sliderContainer.addEventListener('mouseleave', startTimer);
    }


    /* ==========================================================================
       5. SIGNATURE RECIPE MODAL
       ========================================================================== */
    const recipeBtn = document.getElementById('recipe-btn');
    const recipeModal = document.getElementById('recipe-modal');
    const recipeModalClose = document.getElementById('recipe-modal-close');
    const recipeModalOverlay = document.getElementById('recipe-modal-overlay');

    if (recipeBtn && recipeModal) {
        recipeBtn.addEventListener('click', () => {
            recipeModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeModal = () => {
            recipeModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        recipeModalClose.addEventListener('click', closeModal);
        recipeModalOverlay.addEventListener('click', closeModal);
    }


    /* ==========================================================================
       6. INTERSECTION OBSERVER FOR FADE-UP SCROLL ANIMATIONS
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in-element');
    
    const revealOnScrollOptions = {
        threshold: 0.02,
        rootMargin: '0px 0px -10px 0px'
    };

    if ('IntersectionObserver' in window) {
        const revealOnScrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, revealOnScrollOptions);

        fadeElements.forEach(el => {
            revealOnScrollObserver.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        fadeElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }


    /* ==========================================================================
       7. NEWSLETTER SUBSCRIPTION FORM SUBMIT
       ========================================================================== */
    const newsletterForm = document.getElementById('newsletter-form');
    const formFeedback = document.getElementById('form-feedback');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const submitBtn = newsletterForm.querySelector('.newsletter-btn');
            const email = input.value.trim();

            if (!email) return;

            // Simple loading state
            submitBtn.disabled = true;
            formFeedback.textContent = 'Adding to Salon...';
            formFeedback.className = 'form-feedback';

            setTimeout(() => {
                submitBtn.disabled = false;
                input.value = '';
                
                // Show elegant validation feedback
                formFeedback.textContent = 'Welcome. Check your inbox for limited release invitations.';
                formFeedback.classList.add('form-success');
                
                // Clear feedback after 5 seconds
                setTimeout(() => {
                    formFeedback.textContent = '';
                    formFeedback.className = 'form-feedback';
                }, 5000);
            }, 1200);
        });
    }

    /* ==========================================================================
       8. MULTIPAGE INTERACTIVE LOGIC
       ========================================================================== */

    // A. Active Page Navigator Highlighter
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-menu a, .footer-links-col a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkPath = href.split('?')[0].split('/').pop();
        if (linkPath === currentPath || (currentPath === 'index.html' && linkPath === 'index.html') || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active-page');
        }
    });

    // B. Shop Page Interaction
    const shopGrid = document.getElementById('shop-product-grid');
    if (shopGrid && typeof CACAO_DATA !== 'undefined') {
        const searchInput = document.getElementById('shop-search');
        const sortSelect = document.getElementById('shop-sort');
        const categoryChecks = document.querySelectorAll('.filter-category-checkbox');
        const originChecks = document.querySelectorAll('.filter-origin-checkbox');
        const intensityChecks = document.querySelectorAll('.filter-intensity-checkbox');
        const activeFiltersRow = document.getElementById('active-filters-row');

        let activeCategories = [];
        let activeOrigins = [];
        let activeIntensities = [];
        let searchQuery = '';
        let activeSort = 'default';

        // Helper: get Cacao Intensity Group
        function getCacaoIntensityGroup(p) {
            const pct = p.percentage.toLowerCase();
            if (pct.includes('white') || pct.includes('milk') || pct.includes('38') || pct.includes('mixed')) {
                return 'milk';
            }
            const match = pct.match(/\d+/);
            if (match) {
                const num = parseInt(match[0]);
                if (num >= 75) return 'intense';
                if (num >= 60) return 'medium';
            }
            if (p.category === 'truffles' && !pct.includes('white')) {
                return 'medium';
            }
            return 'milk';
        }

        // Deep-linking setup
        const urlParams = new URLSearchParams(window.location.search);
        const urlCategory = urlParams.get('category');
        if (urlCategory) {
            categoryChecks.forEach(chk => {
                if (chk.getAttribute('data-category') === urlCategory) {
                    chk.checked = true;
                    activeCategories.push(urlCategory);
                }
            });
        }

        // Update Filters State and Render
        function updateCheckboxFilterState() {
            activeCategories = Array.from(categoryChecks).filter(c => c.checked).map(c => c.getAttribute('data-category'));
            activeOrigins = Array.from(originChecks).filter(o => o.checked).map(o => o.getAttribute('data-origin'));
            activeIntensities = Array.from(intensityChecks).filter(i => i.checked).map(i => i.getAttribute('data-intensity'));
            
            renderShop();
            renderActiveFilterPills();
        }

        function handleCheckboxChange() {
            // Live-filter immediately on desktop; defer on mobile until Apply is clicked
            if (window.innerWidth >= 992) {
                updateCheckboxFilterState();
            }
        }

        // Sync checkboxes to currently applied active filters
        function syncCheckboxesToActiveState() {
            categoryChecks.forEach(chk => {
                const cat = chk.getAttribute('data-category');
                chk.checked = activeCategories.includes(cat);
            });
            originChecks.forEach(chk => {
                const ori = chk.getAttribute('data-origin');
                chk.checked = activeOrigins.includes(ori);
            });
            intensityChecks.forEach(chk => {
                const inten = chk.getAttribute('data-intensity');
                chk.checked = activeIntensities.includes(inten);
            });
        }

        categoryChecks.forEach(chk => chk.addEventListener('change', handleCheckboxChange));
        originChecks.forEach(chk => chk.addEventListener('change', handleCheckboxChange));
        intensityChecks.forEach(chk => chk.addEventListener('change', handleCheckboxChange));

        // Active Filter Pills
        function renderActiveFilterPills() {
            if (!activeFiltersRow) return;
            activeFiltersRow.innerHTML = '';
            
            const totalFilters = activeCategories.length + activeOrigins.length + activeIntensities.length;
            if (totalFilters === 0) {
                activeFiltersRow.style.display = 'none';
                return;
            }
            
            activeFiltersRow.style.display = 'flex';
            
            // Category pills
            activeCategories.forEach(cat => {
                const label = cat === 'truffles' ? 'Truffles' : cat === 'bars' ? 'Bars' : 'Tasting Boxes';
                createPill(activeFiltersRow, label, () => {
                    const chk = Array.from(categoryChecks).find(c => c.getAttribute('data-category') === cat);
                    if (chk) chk.checked = false;
                    updateCheckboxFilterState();
                });
            });
            
            // Origin pills
            activeOrigins.forEach(ori => {
                createPill(activeFiltersRow, ori, () => {
                    const chk = Array.from(originChecks).find(o => o.getAttribute('data-origin') === ori);
                    if (chk) chk.checked = false;
                    updateCheckboxFilterState();
                });
            });
            
            // Intensity pills
            activeIntensities.forEach(inten => {
                const label = inten === 'milk' ? 'Sweet Cacao' : inten === 'medium' ? 'Medium Dark' : 'Intense Dark';
                createPill(activeFiltersRow, label, () => {
                    const chk = Array.from(intensityChecks).find(i => i.getAttribute('data-intensity') === inten);
                    if (chk) chk.checked = false;
                    updateCheckboxFilterState();
                });
            });
            
            // Clear All
            const clearBtn = document.createElement('button');
            clearBtn.className = 'active-filter-clear-all';
            clearBtn.textContent = 'Clear All';
            clearBtn.addEventListener('click', () => {
                categoryChecks.forEach(c => c.checked = false);
                originChecks.forEach(o => o.checked = false);
                intensityChecks.forEach(i => i.checked = false);
                updateCheckboxFilterState();
            });
            activeFiltersRow.appendChild(clearBtn);
        }
        
        function createPill(container, text, onRemove) {
            const pill = document.createElement('div');
            pill.className = 'active-filter-pill';
            pill.innerHTML = `
                <span>${text}</span>
                <button type="button" aria-label="Remove filter">&times;</button>
            `;
            pill.querySelector('button').addEventListener('click', onRemove);
            container.appendChild(pill);
        }

        // Search listener
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.toLowerCase().trim();
                renderShop();
            });
        }

        // Sort listener
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                activeSort = e.target.value;
                renderShop();
            });
        }

        // Mobile Filter Toggle Drawer
        const mobileTrigger = document.getElementById('mobile-filter-trigger');
        const sidebarClose = document.getElementById('sidebar-close-btn');
        const sidebar = document.getElementById('shop-sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const applyFiltersBtn = document.getElementById('apply-filters-btn');
        
        function openMobileSidebar() {
            if (!sidebar) return;
            syncCheckboxesToActiveState(); // Ensure drawer matches active filters
            sidebar.classList.add('active');
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
            document.body.classList.add('filter-sidebar-open');
        }
        
        function closeMobileSidebar(apply = false) {
            if (!sidebar) return;
            sidebar.classList.remove('active');
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            document.body.classList.remove('filter-sidebar-open');
            if (!apply) {
                syncCheckboxesToActiveState(); // Rollback to currently applied filters on dismiss
            }
        }
        
        if (mobileTrigger) {
            mobileTrigger.addEventListener('click', openMobileSidebar);
        }
        
        if (sidebarClose) {
            sidebarClose.addEventListener('click', () => closeMobileSidebar(false));
        }
        
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => closeMobileSidebar(false));
        }
        
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => {
                updateCheckboxFilterState();
                closeMobileSidebar(true);
            });
        }

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
                closeMobileSidebar(false);
            }
        });

        // Quick View Modal
        const qvModal = document.getElementById('quickview-modal');
        const qvOverlay = document.getElementById('quickview-overlay');
        const qvClose = document.getElementById('quickview-close-btn');
        
        function openQuickView(prodId) {
            const product = CACAO_DATA.products.find(p => p.id === prodId);
            if (!product || !qvModal) return;
            
            document.getElementById('qv-image').src = product.image;
            document.getElementById('qv-image').alt = product.name;
            
            const badge = document.getElementById('qv-badge');
            if (product.badge) {
                badge.textContent = product.badge;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
            
            document.getElementById('qv-title').textContent = product.name;
            document.getElementById('qv-percentage').textContent = product.percentage;
            document.getElementById('qv-origin').textContent = product.origin;
            document.getElementById('qv-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('qv-desc').textContent = product.shortDesc || product.description;
            
            // Palate indicators
            const profile = product.tastingProfile || { sweetness: 3, intensity: 4, fruitiness: 3, woodiness: 3 };
            const keys = ['sweetness', 'intensity', 'fruitiness', 'woodiness'];
            keys.forEach(key => {
                const value = profile[key] || 0;
                const fill = document.getElementById(`qv-fill-${key}`);
                const textVal = document.getElementById(`qv-val-${key}`);
                if (fill && textVal) {
                    fill.style.width = `${(value / 5) * 100}%`;
                    textVal.textContent = `${value}/5`;
                }
            });
            
            const addBtn = document.getElementById('qv-add-btn');
            if (addBtn) {
                addBtn.setAttribute('data-name', product.name);
                addBtn.setAttribute('data-price', product.price);
            }
            
            const detailsLink = document.getElementById('qv-details-link');
            if (detailsLink) {
                detailsLink.href = `product-details.html?id=${product.id}`;
            }
            
            qvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeQuickView() {
            if (qvModal) {
                qvModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        if (qvClose) qvClose.addEventListener('click', closeQuickView);
        if (qvOverlay) qvOverlay.addEventListener('click', closeQuickView);
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeQuickView();
        });

        function renderShop() {
            let products = [...CACAO_DATA.products];

            // 1. Filter by category
            if (activeCategories.length > 0) {
                products = products.filter(p => activeCategories.includes(p.category));
            }

            // 2. Filter by origin
            if (activeOrigins.length > 0) {
                products = products.filter(p => activeOrigins.includes(p.origin) || activeOrigins.some(ori => p.origin.includes(ori)));
            }

            // 3. Filter by intensity
            if (activeIntensities.length > 0) {
                products = products.filter(p => {
                    const group = getCacaoIntensityGroup(p);
                    return activeIntensities.includes(group);
                });
            }

            // 4. Filter by search
            if (searchQuery !== '') {
                products = products.filter(p => 
                    p.name.toLowerCase().includes(searchQuery) || 
                    p.shortDesc.toLowerCase().includes(searchQuery) ||
                    p.origin.toLowerCase().includes(searchQuery)
                );
            }

            // 5. Sort products
            if (activeSort === 'price-low') {
                products.sort((a, b) => a.price - b.price);
            } else if (activeSort === 'price-high') {
                products.sort((a, b) => b.price - a.price);
            }

            // 6. Render output
            shopGrid.innerHTML = '';
            if (products.length === 0) {
                shopGrid.innerHTML = `
                    <div class="no-results-msg fade-in-element is-visible" style="grid-column: 1 / -1; text-align: center; padding: 60px 0;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px; color: var(--color-accent);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <h3 style="font-size:1.5rem; margin-bottom:10px; font-family: var(--font-serif);">No delicacies matching criteria</h3>
                        <p style="font-weight:300;">Try clearing your filters or refining your search parameters.</p>
                    </div>
                `;
                return;
            }

            products.forEach((p, idx) => {
                const card = document.createElement('div');
                card.className = `product-card fade-in-element is-visible`;
                card.style.transitionDelay = `${idx * 0.05}s`;
                
                const badgeHtml = p.badge ? `<span class="prod-badge" style="position: absolute; top: 15px; left: 15px; z-index: 5;">${p.badge}</span>` : '';
                
                card.innerHTML = `
                    <div class="product-img-container">
                        ${badgeHtml}
                        <img src="${p.image}" alt="${p.name}" class="product-image">
                        <button class="quickview-overlay-btn" data-id="${p.id}" aria-label="Quick preview of ${p.name}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="3"/>
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            </svg>
                        </button>
                        <div class="product-origin">${p.origin}</div>
                    </div>
                    <div class="product-info">
                        <span class="product-percentage">${p.percentage}</span>
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.shortDesc}</p>
                        <a href="product-details.html?id=${p.id}" class="product-detail-link">View Details →</a>
                        <div class="product-footer">
                            <span class="product-price">$${p.price.toFixed(2)}</span>
                            <button class="btn btn-small add-to-cart-btn" data-name="${p.name}" data-price="${p.price}">Add to Bag</button>
                        </div>
                    </div>
                `;
                shopGrid.appendChild(card);
            });

            // Quick view click listeners
            const qvBtns = shopGrid.querySelectorAll('.quickview-overlay-btn');
            qvBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const prodId = btn.getAttribute('data-id');
                    openQuickView(prodId);
                });
            });
        }

        // Run initial render & tags
        updateCheckboxFilterState();
    }

    // C. Product Details Page Logic
    const prodDetailPage = document.getElementById('product-detail-page');
    if (prodDetailPage && typeof CACAO_DATA !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id') || 'grand-cru';
        const product = CACAO_DATA.products.find(p => p.id === productId) || CACAO_DATA.products[0];

        // Populate elements
        document.getElementById('main-product-image').src = product.image;
        document.getElementById('main-product-image').alt = product.name;
        
        const badge = document.getElementById('prod-detail-badge');
        if (product.badge) {
            badge.textContent = product.badge;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
        
        document.getElementById('prod-detail-title').textContent = product.name;
        document.getElementById('prod-detail-origin').textContent = product.origin;
        document.getElementById('prod-detail-percentage').textContent = product.percentage;
        document.getElementById('prod-detail-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('prod-detail-desc').textContent = product.description;
        
        // Add to Box button attributes
        const buyBtn = document.getElementById('prod-detail-add-btn');
        buyBtn.setAttribute('data-name', product.name);
        buyBtn.setAttribute('data-price', product.price);

        // Populate tasting profile fills
        const profile = product.tastingProfile || {};
        Object.keys(profile).forEach(key => {
            const fill = document.getElementById(`tb-fill-${key}`);
            const val = document.getElementById(`tb-val-${key}`);
            if (fill && val) {
                const score = profile[key];
                fill.style.width = `${score * 20}%`;
                val.textContent = `${score}/5`;
            }
        });

        // Populate Specs Tab
        const specsContainer = document.getElementById('specs-tab-content');
        if (specsContainer && product.specs) {
            const ul = document.createElement('ul');
            product.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                ul.appendChild(li);
            });
            specsContainer.innerHTML = '';
            specsContainer.appendChild(ul);
        }

        // Populate Details Tab
        const detailsContainer = document.getElementById('details-tab-content');
        if (detailsContainer && product.details) {
            detailsContainer.innerHTML = `<p>${product.details}</p>`;
        }

        // Render Variant options
        const variantOptions = document.getElementById('prod-variant-options');
        if (variantOptions && product.variants) {
            variantOptions.innerHTML = '';
            product.variants.forEach((v, idx) => {
                const btn = document.createElement('button');
                btn.className = `variant-btn ${idx === 0 ? 'active' : ''}`;
                btn.textContent = v;
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Update price if variant contains dollar sign
                    const match = v.match(/\$\d+(\.\d{2})?/);
                    if (match) {
                        const parsedPrice = parseFloat(match[0].replace('$', ''));
                        document.getElementById('prod-detail-price').textContent = `$${parsedPrice.toFixed(2)}`;
                        buyBtn.setAttribute('data-price', parsedPrice);
                        buyBtn.setAttribute('data-name', `${product.name} (${v.split(' - ')[0]})`);
                    }
                });
                variantOptions.appendChild(btn);
            });
        }

        // Product Page Quantity Counter
        const qtyDec = document.getElementById('qty-dec');
        const qtyInc = document.getElementById('qty-inc');
        const qtyVal = document.getElementById('qty-val');

        if (qtyDec && qtyInc && qtyVal) {
            qtyDec.addEventListener('click', () => {
                let current = parseInt(qtyVal.textContent);
                if (current > 1) {
                    qtyVal.textContent = current - 1;
                }
            });
            qtyInc.addEventListener('click', () => {
                let current = parseInt(qtyVal.textContent);
                qtyVal.textContent = current + 1;
            });
            
            // Adjust the standard buyBtn function to read quantity
            buyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const qty = parseInt(qtyVal.textContent);
                const name = buyBtn.getAttribute('data-name');
                const price = parseFloat(buyBtn.getAttribute('data-price'));
                
                // Add in loops
                for(let i=0; i < qty; i++) {
                    addToCart(name, price, product.image);
                }
                
                // Reset counter
                qtyVal.textContent = '1';
            });
        }

        // Accordion functionality
        const tabBtns = document.querySelectorAll('.tab-header-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab');
                const panel = document.getElementById(targetId);
                const isActive = btn.classList.contains('active');

                // Close all
                tabBtns.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-panel-content').forEach(p => p.classList.remove('active'));

                // Open targeted
                if (!isActive) {
                    btn.classList.add('active');
                    panel.classList.add('active');
                }
            });
        });

        // Related Products Grid
        const relatedGrid = document.getElementById('related-products-grid');
        if (relatedGrid) {
            const related = CACAO_DATA.products
                .filter(p => p.id !== product.id && (p.category === product.category || p.category === 'bars'))
                .slice(0, 3);
            
            relatedGrid.innerHTML = '';
            related.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card fade-in-element is-visible';
                card.innerHTML = `
                    <div class="product-img-container">
                        <img src="${p.image}" alt="${p.name}" class="product-image">
                        <div class="product-origin">${p.origin}</div>
                    </div>
                    <div class="product-info">
                        <span class="product-percentage">${p.percentage}</span>
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.shortDesc}</p>
                        <a href="product-details.html?id=${p.id}" class="product-detail-link">View Details →</a>
                        <div class="product-footer">
                            <span class="product-price">$${p.price.toFixed(2)}</span>
                            <button class="btn btn-small add-to-cart-btn" data-name="${p.name}" data-price="${p.price}">Add to Bag</button>
                        </div>
                    </div>
                `;
                relatedGrid.appendChild(card);
            });
        }
    }

    // D. Blog Page Logic (Premium Journal Filters + Cinematic Cards)
    const blogPostsGrid = document.getElementById('blog-posts-grid');
    if (blogPostsGrid && typeof CACAO_DATA !== 'undefined') {
        const blogTabs = document.querySelectorAll('.blog-tab-nav .blog-tab');
        const blogResultsCount = document.getElementById('blog-results-count');
        const blogEmptyState = document.getElementById('blog-empty-state');
        let activeCategory = 'all';
        let renderTimeout = null;

        // Tab click handlers
        blogTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                blogTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeCategory = tab.getAttribute('data-category');
                renderBlogJournal();
            });
        });

        function renderBlogJournal() {
            // Filter posts — case-insensitive match for robustness
            let posts = [...CACAO_DATA.blogPosts];
            if (activeCategory !== 'all') {
                posts = posts.filter(post =>
                    post.category.toLowerCase() === activeCategory.toLowerCase()
                );
            }

            // Update results count text
            if (blogResultsCount) {
                const label = activeCategory === 'all' ? 'All Articles' : activeCategory;
                blogResultsCount.textContent = posts.length > 0
                    ? `${posts.length} Article${posts.length !== 1 ? 's' : ''} — ${label}`
                    : '';
            }

            // Show/hide empty state
            if (blogEmptyState) {
                blogEmptyState.style.display = posts.length === 0 ? 'block' : 'none';
            }

            // Fade out existing cards then re-render
            const existingCards = blogPostsGrid.querySelectorAll('.blog-journal-card');
            existingCards.forEach(c => {
                c.classList.remove('card-visible');
                c.style.opacity = '0';
                c.style.transform = 'translateY(16px)';
            });

            clearTimeout(renderTimeout);
            renderTimeout = setTimeout(() => {
                blogPostsGrid.innerHTML = '';

                if (posts.length === 0) return;

                posts.forEach((post, idx) => {
                    const card = document.createElement('article');
                    card.className = 'blog-journal-card';
                    const authorInitial = (post.author || 'A').charAt(0).toUpperCase();

                    card.innerHTML = `
                        <div class="bjc-img-wrap">
                            <img src="${post.image}" alt="${post.title}" loading="lazy">
                            <span class="bjc-badge">${post.category}</span>
                        </div>
                        <div class="bjc-body">
                            <div class="bjc-meta">
                                <span>${post.date}</span>
                                <span class="bjc-meta-dot"></span>
                                <span>${post.readTime}</span>
                            </div>
                            <h3 class="bjc-title">${post.title}</h3>
                            <p class="bjc-excerpt">${post.excerpt}</p>
                            <div class="bjc-footer">
                                <div class="bjc-author">
                                    <div class="bjc-author-avatar">${authorInitial}</div>
                                    <span class="bjc-author-name">${post.author || 'Cacao Artisanal'}</span>
                                </div>
                                <a href="blog-details.html?post=${post.id}" class="bjc-read-link">
                                    Read More
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </a>
                            </div>
                        </div>
                    `;

                    blogPostsGrid.appendChild(card);

                    // Staggered fade-in using requestAnimationFrame
                    const delay = idx * 80;
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            card.classList.add('card-visible');
                        });
                    }, delay);
                });
            }, existingCards.length > 0 ? 180 : 0);
        }

        // Initial render on page load
        renderBlogJournal();
    }


    // E. Blog Details Page Logic
    const blogDetailsPage = document.getElementById('blog-details-page');
    if (blogDetailsPage && typeof CACAO_DATA !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get('post') || 'tempering';
        const post = CACAO_DATA.blogPosts.find(p => p.id === postId) || CACAO_DATA.blogPosts[0];

        // Populate text
        document.getElementById('blog-article-cat').textContent = post.category;
        document.getElementById('blog-article-title').textContent = post.title;
        document.getElementById('blog-article-date').textContent = post.date;
        document.getElementById('blog-article-readtime').textContent = post.readTime;
        document.getElementById('blog-article-image').style.backgroundImage = `url(${post.image})`;
        document.getElementById('blog-article-image').style.backgroundSize = 'cover';
        document.getElementById('blog-article-image').style.backgroundPosition = 'center';
        
        document.getElementById('blog-author-name').textContent = post.author;
        document.getElementById('blog-author-role').textContent = post.authorRole;
        document.getElementById('blog-author-avatar').textContent = post.author.charAt(0);

        if (post.recipeDetails) {
            // Prepend the multiplier controls dynamically
            const scalerHtml = `
                <div class="recipe-scaler" style="margin-top: 10px; margin-bottom: 25px;">
                    <span style="font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-right: 15px; color: var(--color-black);">Recipe Scale:</span>
                    <button class="scaler-btn active" data-scale="1">1x (Original)</button>
                    <button class="scaler-btn" data-scale="2">2x (Double)</button>
                    <button class="scaler-btn" data-scale="0.5">0.5x (Half)</button>
                </div>
            `;
            document.getElementById('blog-body-container').innerHTML = scalerHtml + post.content;
            
            // Initialize scaler immediately
            const recipeContainer = document.querySelector('.recipe-ingredients-block');
            if (recipeContainer) {
                const scalerWrapper = document.querySelector('.recipe-scaler');
                if (scalerWrapper) {
                    const buttons = scalerWrapper.querySelectorAll('.scaler-btn');
                    const amountSpans = recipeContainer.querySelectorAll('ul li');
                    const ingredientItems = Array.from(amountSpans).map(li => {
                        const text = li.textContent.trim();
                        // Find matching starting quantity (e.g. 120g, 15ml, 2 pieces, 1 egg)
                        const match = text.match(/^(\d+(?:\.\d+)?(?:-\d+)?\s*(?:g|ml|tbsp|tsp|cup|piece|egg|pc)?)\s*(.*)/i) || 
                                      text.match(/^(\d+)\s+(.*)/);
                        
                        if (match) {
                            const numberPart = match[1].match(/\d+(?:\.\d+)?/);
                            if (numberPart) {
                                return {
                                    element: li,
                                    originalNum: parseFloat(numberPart[0]),
                                    unitAndRest: text.replace(numberPart[0], '')
                                };
                            }
                        }
                        return { element: li, originalNum: null, text: text };
                    });

                    buttons.forEach(btn => {
                        btn.addEventListener('click', () => {
                            buttons.forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');

                            const scale = parseFloat(btn.dataset.scale);
                            ingredientItems.forEach(item => {
                                if (item.originalNum !== null) {
                                    const newNum = (item.originalNum * scale).toFixed(1);
                                    // Avoid showing decimals if it is a whole integer
                                    const formattedNum = newNum.endsWith('.0') ? parseInt(newNum) : newNum;
                                    item.element.innerHTML = `<strong>${formattedNum}</strong>${item.unitAndRest}`;
                                }
                            });
                        });
                    });
                }
            }
        } else {
            document.getElementById('blog-body-container').innerHTML = post.content;
        }

        // Render Related articles
        const relatedGrid = document.getElementById('related-articles-grid');
        if (relatedGrid) {
            const related = CACAO_DATA.blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 3);
            
            relatedGrid.innerHTML = '';
            related.forEach(p => {
                const card = document.createElement('article');
                card.className = 'blog-card fade-in-element is-visible';
                card.innerHTML = `
                    <div class="blog-img-container">
                        <img src="${p.image}" alt="${p.title}">
                        <span class="blog-cat-tag">${p.category}</span>
                    </div>
                    <div class="blog-card-body">
                        <div class="blog-card-meta">
                            <span>${p.date}</span>
                            <span>•</span>
                            <span>${p.readTime}</span>
                        </div>
                        <h3 class="blog-card-title">${p.title}</h3>
                        <p class="blog-card-excerpt">${p.excerpt}</p>
                        <a href="blog-details.html?post=${p.id}" class="blog-read-btn">Read More</a>
                    </div>
                `;
                relatedGrid.appendChild(card);
            });
        }
    }

    // F. Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const feedback = document.getElementById('contact-form-feedback');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                contactForm.reset();
                
                feedback.textContent = 'Thank you. Your message has been received. Our salon manager will contact you within 24 hours.';
                feedback.className = 'form-feedback form-success';
                
                setTimeout(() => {
                    feedback.textContent = '';
                    feedback.className = 'form-feedback';
                }, 8000);
            }, 1500);
        });

    }


    // ==========================================================================
    // G. SENSORY CHOCOLATE QUIZ CONTROLLER (index.html)
    // ==========================================================================
    const quizWrapper = document.getElementById('quiz-wrapper');
    if (quizWrapper) {
        let currentStep = 1;
        const totalSteps = 3;
        const answers = { taste: '', pairing: '', intensity: '' };
        
        const steps = quizWrapper.querySelectorAll('.quiz-step');
        const progressFill = quizWrapper.querySelector('.quiz-progress-fill');
        const prevBtn = quizWrapper.querySelector('#quiz-prev-btn');
        const nextBtn = quizWrapper.querySelector('#quiz-next-btn');

        // Handle option selection
        quizWrapper.addEventListener('click', (e) => {
            const option = e.target.closest('.quiz-option');
            if (!option) return;

            // Clear selections in the current step
            const currentStepEl = quizWrapper.querySelector(`.quiz-step[data-step="${currentStep}"]`);
            currentStepEl.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
            
            // Select clicked option
            option.classList.add('selected');
            const key = option.dataset.key;
            const value = option.dataset.value;
            answers[key] = value;

            // Auto advance on options (unless it's the last step)
            if (currentStep < totalSteps) {
                setTimeout(() => {
                    navigateQuiz(1);
                }, 300);
            }
        });

        // Prev/Next Navigation
        prevBtn.addEventListener('click', () => navigateQuiz(-1));
        nextBtn.addEventListener('click', () => {
            if (currentStep === totalSteps) {
                calculateQuizResult();
            } else {
                navigateQuiz(1);
            }
        });

        function navigateQuiz(direction) {
            steps.forEach(step => step.classList.remove('active'));
            currentStep += direction;

            const nextStepEl = quizWrapper.querySelector(`.quiz-step[data-step="${currentStep}"]`);
            nextStepEl.classList.add('active');

            // Update progress bar
            progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

            // Update buttons
            if (currentStep === 1) {
                prevBtn.style.visibility = 'hidden';
            } else {
                prevBtn.style.visibility = 'visible';
            }

            if (currentStep === totalSteps) {
                nextBtn.textContent = 'Reveal My Profile';
            } else {
                nextBtn.textContent = 'Next Step';
            }
        }

        function calculateQuizResult() {
            // Hide quiz controls and steps
            quizWrapper.querySelector('.quiz-progress-bar').style.display = 'none';
            steps.forEach(step => step.classList.remove('active'));
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';

            // Result calculation logic
            let productMatch = CACAO_DATA.products[0]; // Default: Grand Cru
            let profileName = "The Harmonious Explorer";
            let profileDesc = "You appreciate balanced textures, delicate sweet layers, and a rich, rounded finish.";

            if (answers.taste === 'dark' && answers.intensity === 'high') {
                productMatch = CACAO_DATA.products.find(p => p.id === 'almond-bar') || CACAO_DATA.products[5];
                profileName = "The Bold Purist";
                profileDesc = "You prefer high cocoa percentages, minimal sugar, robust earthy flavors, and deep roasted profiles.";
            } else if (answers.taste === 'sweet' && answers.pairing === 'spirits') {
                productMatch = CACAO_DATA.products.find(p => p.id === 'whiskey-box') || CACAO_DATA.products[9];
                profileName = "The Sensory Decadent";
                profileDesc = "You love rich, spirits-infused centers, caramel notes, and bold pairings that challenge the palate.";
            } else if (answers.taste === 'floral' || answers.pairing === 'tea') {
                productMatch = CACAO_DATA.products.find(p => p.id === 'wild-lavender') || CACAO_DATA.products[2];
                profileName = "The Botanical Dreamer";
                profileDesc = "You are drawn to light, creamy profiles infused with wild rosemary, fresh lavender, or orchard fruits.";
            } else if (answers.pairing === 'coffee') {
                productMatch = CACAO_DATA.products.find(p => p.id === 'espresso-bar') || CACAO_DATA.products[4];
                profileName = "The Roasted Connoisseur";
                profileDesc = "You love the interplay of cracked coffee beans, bright citrus orange peel, and dark chocolate snap.";
            }

            // Display results page
            const resultStep = quizWrapper.querySelector('.quiz-step[data-step="result"]');
            resultStep.classList.add('active');
            
            resultStep.innerHTML = `
                <div class="quiz-result-card">
                    <span class="editorial-tag">Your Profile Result</span>
                    <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-top: 5px;">${profileName}</h2>
                    <p style="font-weight: 300; max-width: 500px; margin: 10px auto 30px auto;">${profileDesc}</p>
                    
                    <div class="quiz-result-product fade-in-element is-visible">
                        <img src="${productMatch.image}" alt="${productMatch.name}">
                        <h3 style="font-size: 1.2rem; margin-bottom: 5px;">${productMatch.name}</h3>
                        <span class="editorial-tag" style="color: var(--color-accent-gold);">${productMatch.origin}</span>
                        <p style="font-size: 0.8rem; margin: 10px 0; color: var(--color-text-secondary);">${productMatch.shortDesc}</p>
                        <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 15px;">$${productMatch.price.toFixed(2)}</div>
                        <button class="btn btn-black-pill add-to-cart-btn" data-name="${productMatch.name}" data-price="${productMatch.price}">Add Recommended to Box</button>
                    </div>
                    
                    <button class="btn btn-line-pill" style="margin-top: 30px;" onclick="window.location.reload()">Retake Quiz</button>
                </div>
            `;
        }
    }

    // ==========================================================================
    // H. TERROIR MAP EXPLORER CONTROLLER (about.html / index.html)
    // ==========================================================================
    const terroirMap = document.getElementById('terroir-map');
    if (terroirMap) {
        const pins = terroirMap.querySelectorAll('.terroir-pin');
        const titleEl = document.getElementById('terroir-title');
        const descEl = document.getElementById('terroir-desc');
        const notesEl = document.getElementById('terroir-notes');
        const cacaoEl = document.getElementById('terroir-cacao');
        const altitudeEl = document.getElementById('terroir-altitude');

        const terroirData = {
            ecuador: {
                name: "Guayas Province, Ecuador",
                altitude: "320m above sea level",
                cacao: "Ancient Nacional Sourcing",
                notes: "Floral jasmines, honeyed sweetness, and soft wood-smoke",
                desc: "Sourced from Vicente Norero's Camino Verde estate. The slow sun-drying yields a chocolate with singular floral complexity and a glossy finish."
            },
            peru: {
                name: "San Martin, Peru",
                altitude: "450m above sea level",
                cacao: "Rare Criollo Pods",
                notes: "Citrus lemon-grass, wild rosemary, and smooth herbal undertones",
                desc: "Sourced from remote mountain foothill cooperatives. Criollo cacao is highly delicate and provides low bitterness, ideal for high percentage botanical infusions."
            },
            madagascar: {
                name: "Sambirano Valley, Madagascar",
                altitude: "120m above sea level",
                cacao: "Organic Trinitario Beans",
                notes: "Vibrant raspberry, red berries, and bright citrus peel",
                desc: "The fertile soils along the Sambirano river produce cacao beans with unparalleled fruit-forward acidity. Roasted lightly to preserve its energetic, zesty finish."
            }
        };

        pins.forEach(pin => {
            pin.addEventListener('click', () => {
                pins.forEach(p => p.classList.remove('active'));
                pin.classList.add('active');

                const key = pin.dataset.terroir;
                const data = terroirData[key];

                if (data) {
                    // Smooth transition effect
                    const box = document.querySelector('.terroir-details-box');
                    if (box) {
                        box.style.opacity = '0';
                        setTimeout(() => {
                            titleEl.textContent = data.name;
                            altitudeEl.textContent = data.altitude;
                            cacaoEl.textContent = data.cacao;
                            notesEl.textContent = data.notes;
                            descEl.textContent = data.desc;
                            box.style.opacity = '1';
                        }, 250);
                    }
                }
            });
        });
    }

    // ==========================================================================
    // I. BUILD-YOUR-OWN BOX CUSTOMIZER (collections.html)
    // ==========================================================================
    const builderBox = document.getElementById('custom-box-builder');
    if (builderBox) {
        const boxSlots = builderBox.querySelectorAll('.box-slot');
        const truffCards = builderBox.querySelectorAll('.truffle-selection-card');
        const countLabel = builderBox.querySelector('#builder-count');
        const checkoutBtn = builderBox.querySelector('#builder-checkout-btn');
        const maxTruffles = 8;
        
        // Initialize custom box slots to null (empty)
        let selectedTruffles = Array(maxTruffles).fill(null);

        // Click selection card to add truffle
        truffCards.forEach(card => {
            card.addEventListener('click', () => {
                const filledCount = selectedTruffles.filter(t => t !== null).length;
                if (filledCount >= maxTruffles) {
                    showCartToast('Your custom truffle box is full. Remove an item to replace it.');
                    return;
                }

                // Tactile feedback micro-animation on selection card
                card.classList.remove('clicked');
                void card.offsetWidth; // Trigger reflow to restart keyframe animation
                card.classList.add('clicked');
                setTimeout(() => card.classList.remove('clicked'), 300);

                const name = card.dataset.name;
                const img = card.dataset.img;
                
                // Find first empty slot and set truffle
                const firstEmptyIdx = selectedTruffles.indexOf(null);
                if (firstEmptyIdx !== -1) {
                    selectedTruffles[firstEmptyIdx] = { name, img };
                    updateBuilderUI();
                }
            });
        });

        // Click slots to remove truffle
        boxSlots.forEach((slot, idx) => {
            slot.addEventListener('click', () => {
                if (selectedTruffles[idx] !== null) {
                    // Smooth visual fade-out/scale-down animation on removal
                    const filledDiv = slot.querySelector('.box-slot-filled');
                    if (filledDiv) {
                        filledDiv.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
                        filledDiv.style.transform = 'scale(0.7)';
                        filledDiv.style.opacity = '0';
                    }
                    
                    setTimeout(() => {
                        selectedTruffles[idx] = null;
                        updateBuilderUI();
                    }, 200);
                }
            });
        });

        function updateBuilderUI() {
            // Re-render slots matching the array state
            boxSlots.forEach((slot, idx) => {
                const truff = selectedTruffles[idx];
                if (truff !== null) {
                    slot.innerHTML = `
                        <div class="box-slot-filled">
                            <img src="${truff.img}" alt="${truff.name}">
                            <div class="box-slot-remove">Remove</div>
                        </div>
                    `;
                    slot.classList.add('filled');
                } else {
                    slot.innerHTML = `<span class="box-slot-empty">+</span>`;
                    slot.classList.remove('filled');
                }
            });

            // Calculate dynamic values
            const filledCount = selectedTruffles.filter(t => t !== null).length;
            const remaining = maxTruffles - filledCount;

            // Update text label dynamically
            countLabel.textContent = `${filledCount} / ${maxTruffles} Pieces Selected`;

            // Update bottom action button text & state
            if (filledCount === maxTruffles) {
                checkoutBtn.removeAttribute('disabled');
                checkoutBtn.textContent = 'Add Custom Box to Cart';
            } else {
                checkoutBtn.setAttribute('disabled', 'true');
                checkoutBtn.textContent = `Fill Box (${remaining} More)`;
            }

            // Update selection state highlights and quantity badges on truffle cards
            truffCards.forEach(card => {
                const name = card.dataset.name;
                const count = selectedTruffles.filter(t => t && t.name === name).length;
                
                if (count > 0) {
                    card.classList.add('is-selected');
                    let badge = card.querySelector('.truffle-card-count');
                    if (!badge) {
                        badge = document.createElement('div');
                        badge.className = 'truffle-card-count';
                        card.appendChild(badge);
                    }
                    badge.textContent = `x${count}`;
                } else {
                    card.classList.remove('is-selected');
                    const badge = card.querySelector('.truffle-card-count');
                    if (badge) {
                        badge.remove();
                    }
                }
            });
        }

        // Add completed custom box to cart
        checkoutBtn.addEventListener('click', () => {
            const filledCount = selectedTruffles.filter(t => t !== null).length;
            if (filledCount !== maxTruffles) return;

            const nameList = selectedTruffles.map(t => t.name).join(', ');
            
            // Push directly to global cart array with correct property format
            cart.push({
                name: 'Bespoke Custom Box (8 Pieces)',
                price: 32.00,
                image: 'images/collection.png',
                quantity: 1,
                desc: `Custom Assortment: ${nameList}`
            });

            // Reset builder state
            selectedTruffles = Array(maxTruffles).fill(null);
            updateBuilderUI();

            // Save and sync header/sidebar cart totals
            updateCart();
            showCartToast('Custom chocolate box added to bag');
        });
        
        // Run once on load to ensure initial state matches
        updateBuilderUI();
    }

    /* ==========================================================================
       7. FLAVOR PAIRING FILTERS
       ========================================================================== */
    const pairingSection = document.querySelector('.pairing-section');
    if (pairingSection) {
        const filterButtons = pairingSection.querySelectorAll('#pairing-filter-group .filter-pill');
        const cards = pairingSection.querySelectorAll('.pairing-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filter = button.dataset.filter;

                cards.forEach(card => {
                    card.style.display = filter === 'all' || card.dataset.category === filter ? 'grid' : 'none';
                });
            });
        });
    }

    /* ==========================================================================
       8. SEASONAL LAUNCH COUNTDOWN
       ========================================================================== */
    const seasonalTimer = document.querySelector('[data-countdown]');
    if (seasonalTimer) {
        const targetDate = new Date(seasonalTimer.dataset.countdown);

        function updateCountdown() {
            const now = new Date();
            const diff = Math.max(0, targetDate - now);
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            seasonalTimer.innerHTML = `
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            `;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    /* ==========================================================================
       9. SUBSCRIPTION PLAN SELECTOR
       ========================================================================== */
    const subscriptionArea = document.querySelector('.subscription-section');
    if (subscriptionArea) {
        const planCards = subscriptionArea.querySelectorAll('.plan-card');
        const selectedPlanEl = subscriptionArea.querySelector('#selected-plan');
        const selectedPriceEl = subscriptionArea.querySelector('#selected-price');
        const selectedFrequencyEl = subscriptionArea.querySelector('#selected-frequency');
        const subscribeButton = subscriptionArea.querySelector('#subscribe-button');
        let activePlan = {
            name: 'Explorer',
            price: 45,
            frequency: 'Monthly'
        };

        function updateSubscriptionSummary(plan) {
            if (selectedPlanEl) selectedPlanEl.textContent = plan.name;
            if (selectedPriceEl) selectedPriceEl.textContent = `$${plan.price} / ${plan.frequency.toLowerCase()}`;
            if (selectedFrequencyEl) selectedFrequencyEl.textContent = plan.frequency;
        }

        planCards.forEach(card => {
            if (card.dataset.plan === activePlan.name) {
                card.classList.add('active');
            }

            card.addEventListener('click', () => {
                planCards.forEach(item => item.classList.remove('active'));
                card.classList.add('active');
                activePlan = {
                    name: card.dataset.plan,
                    price: parseFloat(card.dataset.price),
                    frequency: card.dataset.frequency
                };
                updateSubscriptionSummary(activePlan);
            });
        });

        if (planCards.length > 0 && !subscriptionArea.querySelector('.plan-card.active')) {
            const initialCard = planCards[0];
            initialCard.classList.add('active');
            activePlan = {
                name: initialCard.dataset.plan,
                price: parseFloat(initialCard.dataset.price),
                frequency: initialCard.dataset.frequency
            };
            updateSubscriptionSummary(activePlan);
        }

        if (subscribeButton) {
            subscribeButton.addEventListener('click', () => {
                const itemName = `${activePlan.name} Chocolate Subscription`;
                const itemPrice = activePlan.price;
                addToCart(itemName, itemPrice, 'images/pairing.png');
                showCartToast(`${activePlan.name} subscription added to bag`);
            });
        }
    }

    /* ==========================================================================
       10. GIFT BOX CUSTOMIZER
       ========================================================================== */
    const giftPage = document.querySelector('.gift-page');
    if (giftPage) {
        const productCards = document.querySelectorAll('.gift-product-card');
        const packagingButtons = document.querySelectorAll('#packaging-options .selection-pill');
        const ribbonButtons = document.querySelectorAll('#ribbon-options .swatch');
        const cardButtons = document.querySelectorAll('#card-options .selection-pill');
        const quantityInput = document.getElementById('gift-quantity');
        const previewCount = document.getElementById('preview-item-count');
        const previewPackaging = document.getElementById('preview-packaging');
        const previewRibbon = document.getElementById('preview-ribbon');
        const previewCard = document.getElementById('preview-card');
        const previewTotal = document.getElementById('preview-total');
        const giftAddButton = document.getElementById('gift-add-to-cart');

        let selectedProduct = null;
        let selectedPackaging = 'Velvet Box';
        let selectedRibbon = 'Caramel';
        let selectedCard = 'Classic Note';

        function updateGiftPreview() {
            const qty = Math.max(1, parseInt(quantityInput.value) || 1);
            previewCount.textContent = selectedProduct ? `${qty} box${qty > 1 ? 'es' : ''} selected` : '0 items selected';
            previewPackaging.textContent = selectedPackaging;
            previewRibbon.textContent = selectedRibbon;
            previewCard.textContent = selectedCard;
            const productPrice = selectedProduct ? selectedProduct.price : 0;
            const total = (productPrice * qty) + 12;
            previewTotal.textContent = `$${total.toFixed(2)}`;
        }

        productCards.forEach(card => {
            card.addEventListener('click', () => {
                productCards.forEach(item => item.classList.remove('selected'));
                card.classList.add('selected');
                selectedProduct = {
                    name: card.dataset.name,
                    price: parseFloat(card.dataset.price),
                    image: card.querySelector('img')?.src || 'images/hero.png'
                };
                updateGiftPreview();
            });
        });

        packagingButtons.forEach(button => {
            button.addEventListener('click', () => {
                packagingButtons.forEach(item => item.classList.remove('active'));
                button.classList.add('active');
                selectedPackaging = button.dataset.value;
                updateGiftPreview();
            });
        });

        ribbonButtons.forEach(button => {
            button.addEventListener('click', () => {
                ribbonButtons.forEach(item => item.classList.remove('active'));
                button.classList.add('active');
                selectedRibbon = button.dataset.color;
                updateGiftPreview();
            });
        });

        cardButtons.forEach(button => {
            button.addEventListener('click', () => {
                cardButtons.forEach(item => item.classList.remove('active'));
                button.classList.add('active');
                selectedCard = button.dataset.value;
                updateGiftPreview();
            });
        });

        quantityInput.addEventListener('input', updateGiftPreview);

        giftAddButton.addEventListener('click', () => {
            if (!selectedProduct) {
                showCartToast('Choose a signature chocolate before adding this gift box.');
                return;
            }

            const qty = Math.max(1, parseInt(quantityInput.value) || 1);
            const itemName = `${selectedPackaging} Gift Box • ${selectedProduct.name}`;
            const itemPrice = selectedProduct.price * qty + 12;
            const itemImage = selectedProduct.image;
            addToCart(itemName, itemPrice, itemImage);
            showCartToast('Customized gift box added to bag');
        });

        updateGiftPreview();
    }

    /* ==========================================================================
       THEME TOGGLE CONTROLLER
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    
    function updateThemeUI(theme) {
        if (!themeToggle) return;
        
        // Update aria-label based on target theme (what user can switch to)
        if (theme === 'dark') {
            themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
        }
    }

    // Initialize UI theme states on page load
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateThemeUI(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('cacao_theme', newTheme);
            updateThemeUI(newTheme);
        });
    }

    // Synchronize theme changes across open tabs/windows
    window.addEventListener('storage', (e) => {
        if (e.key === 'cacao_theme') {
            const newTheme = e.newValue || 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeUI(newTheme);
        }
    });

    /* ==========================================================================
       AUTHENTICATION SYSTEM (Sign In / Sign Up / Session)
       ========================================================================== */

    const AUTH_KEYS = {
        users: 'cacao_users',
        session: 'cacao_session'
    };

    function getUsers() {
        return JSON.parse(localStorage.getItem(AUTH_KEYS.users)) || [];
    }

    function saveUsers(users) {
        localStorage.setItem(AUTH_KEYS.users, JSON.stringify(users));
    }

    function getSession() {
        return JSON.parse(localStorage.getItem(AUTH_KEYS.session)) || null;
    }

    function saveSession(user) {
        const sessionData = user ? { email: user.email, name: user.name } : null;
        if (sessionData) {
            localStorage.setItem(AUTH_KEYS.session, JSON.stringify(sessionData));
        } else {
            localStorage.removeItem(AUTH_KEYS.session);
        }
    }

    function getCurrentUser() {
        const session = getSession();
        if (!session) return null;
        const users = getUsers();
        return users.find(u => u.email === session.email) || null;
    }

    function updateAuthUI() {
        const user = getCurrentUser();
        const authBtn = document.querySelector('.auth-btn');

        if (!authBtn) return;

        if (user) {
            const firstName = user.name.split(' ')[0];
            authBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
                <span class="auth-name">${firstName}</span>
            `;
            authBtn.href = '#';
            authBtn.classList.add('logged-in');
        } else {
            authBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
            authBtn.href = 'signin.html';
            authBtn.classList.remove('logged-in');
        }
    }

    // Password visibility toggle
    document.querySelectorAll('.password-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const wrapper = btn.closest('.password-wrapper');
            const input = wrapper.querySelector('input');
            const openIcon = btn.querySelector('.eye-open');
            const closedIcon = btn.querySelector('.eye-closed');
            const isPassword = input.getAttribute('type') === 'password';
            input.setAttribute('type', isPassword ? 'text' : 'password');
            openIcon.style.display = isPassword ? 'none' : '';
            closedIcon.style.display = isPassword ? '' : 'none';
        });
    });

    // Sign In Form Handler
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signin-email').value.trim();
            const password = document.getElementById('signin-password').value.trim();
            const feedback = document.getElementById('signin-form-feedback');
            const submitBtn = signinForm.querySelector('button[type="submit"]');

            feedback.textContent = '';
            feedback.className = 'form-feedback';

            if (!email || !password) {
                feedback.textContent = 'Please fill in all fields.';
                feedback.classList.add('form-error');
                return;
            }

            const users = getUsers();
            const user = users.find(u => u.email === email);

            if (!user) {
                feedback.textContent = 'No account found with this email address.';
                feedback.classList.add('form-error');
                return;
            }

            if (user.password !== password) {
                feedback.textContent = 'Incorrect password. Please try again.';
                feedback.classList.add('form-error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Signing in...';

            setTimeout(() => {
                saveSession(user);
                updateAuthUI();
                feedback.textContent = 'Welcome back! Redirecting...';
                feedback.classList.add('form-success');
                setTimeout(() => {
                    window.location.href = 'shop.html';
                }, 800);
            }, 600);
        });
    }

    // Sign Up Form Handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value.trim();
            const confirm = document.getElementById('signup-confirm').value.trim();
            const terms = document.getElementById('signup-terms').checked;
            const feedback = document.getElementById('signup-form-feedback');
            const submitBtn = signupForm.querySelector('button[type="submit"]');

            feedback.textContent = '';
            feedback.className = 'form-feedback';

            if (!name || !email || !password || !confirm) {
                feedback.textContent = 'Please fill in all fields.';
                feedback.classList.add('form-error');
                return;
            }

            if (password.length < 6) {
                feedback.textContent = 'Password must be at least 6 characters.';
                feedback.classList.add('form-error');
                return;
            }

            if (password !== confirm) {
                feedback.textContent = 'Passwords do not match.';
                feedback.classList.add('form-error');
                return;
            }

            if (!terms) {
                feedback.textContent = 'Please agree to the Terms & Conditions and Privacy Policy.';
                feedback.classList.add('form-error');
                return;
            }

            const users = getUsers();
            if (users.find(u => u.email === email)) {
                feedback.textContent = 'An account with this email already exists.';
                feedback.classList.add('form-error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating account...';

            setTimeout(() => {
                const newUser = { name, email, password };
                users.push(newUser);
                saveUsers(users);
                saveSession(newUser);
                updateAuthUI();
                feedback.textContent = 'Account created successfully! Redirecting...';
                feedback.classList.add('form-success');
                setTimeout(() => {
                    window.location.href = 'shop.html';
                }, 800);
            }, 600);
        });
    }

    // Sign Out (on click when logged in)
    document.addEventListener('click', (e) => {
        const authBtn = e.target.closest('.auth-btn');
        if (authBtn && authBtn.classList.contains('logged-in')) {
            e.preventDefault();
            saveSession(null);
            updateAuthUI();
            if (window.location.pathname.includes('signin') || window.location.pathname.includes('signup')) {
                window.location.href = 'index.html';
            }
        }
    });

    // Initialize auth UI on page load
    updateAuthUI();

    // Sync auth state across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === AUTH_KEYS.session || e.key === AUTH_KEYS.users) {
            updateAuthUI();
        }
    });

});
