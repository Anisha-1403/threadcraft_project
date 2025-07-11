// Shopping Cart Functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
    // Category Navigation
    const categoryLinks = document.querySelectorAll('.category-link');
    const allSections = document.querySelectorAll('.category-section');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;

            // Hide all sections
            allSections.forEach(section => {
                section.style.display = 'none';
            });

            // Show selected category section
            document.getElementById(`${category}-section`).style.display = 'block';

            // Hide hero section when viewing categories
            document.querySelector('.hero').style.display = 'none';
            document.querySelector('.featured').style.display = 'none';
        });
    });

    // Home navigation (would need to add this to your logo/home link)
    function showHomePage() {
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        document.querySelector('.hero').style.display = 'flex';
        document.querySelector('.featured').style.display = 'block';

        // Remove active class from all category links
        document.querySelectorAll('.category-link').forEach(link => {
            link.classList.remove('active');
        });
    }

    // Logo click handler
    document.querySelector('.logo').addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    // Home link handler
    document.getElementById('home-link').addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span:last-child');
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutButton = document.querySelector('.checkout-btn');

    let cart = [];
    let total = 0;

    // Open cart
    cartIcon.addEventListener('click', () => {
        cartOverlay.classList.add('active');
    });

    // Close cart
    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    // Add to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.price span:first-child').textContent.replace('₹', ''));
            const productImage = productCard.querySelector('img').src;

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            updateCart();
            showAddedToCartAnimation(button);
        });
    });

    // Update cart UI
    function updateCart() {
        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Reset total
        total = 0;

        // Update cart count
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = itemCount;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is currently empty.</p>';
            checkoutButton.disabled = true;
        } else {
            // Add each cart item to the UI
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                            <div class="cart-item-info">
                                <h4>${item.name}</h4>
                                <span class="cart-item-price">₹${item.price.toFixed(2)}</span>
                                <div class="quantity-controls">
                                    <button class="quantity-decrease">-</button>
                                    <span class="quantity">${item.quantity}</span>
                                    <button class="quantity-increase">+</button>
                                </div>
                                <span class="cart-item-remove">Remove</span>
                            </div>
                        `;

                cartItemsContainer.appendChild(cartItemElement);

                // Add event listeners for quantity controls
                const quantityDecrease = cartItemElement.querySelector('.quantity-decrease');
                const quantityIncrease = cartItemElement.querySelector('.quantity-increase');
                const quantityDisplay = cartItemElement.querySelector('.quantity');
                const removeButton = cartItemElement.querySelector('.cart-item-remove');

                quantityIncrease.addEventListener('click', () => {
                    item.quantity++;
                    updateCart();
                });

                quantityDecrease.addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                        updateCart();
                    }
                });

                removeButton.addEventListener('click', () => {
                    cart = cart.filter(cartItem => cartItem.name !== item.name);
                    updateCart();
                });
            });

            checkoutButton.disabled = false;
        }

        // Update total
        cartTotal.textContent = `₹${total.toFixed(2)}`;
    }

    // Checkout
    checkoutButton.addEventListener('click', () => {
        alert(`Checkout completed! Total: ₹${total.toFixed(2)}`);
        cart = [];
        updateCart();
    });

    // Show added to cart animation
    function showAddedToCartAnimation(button) {
        button.textContent = 'Added!';
        button.style.backgroundColor = 'var(--success)';

        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = 'var(--primary)';
        }, 1500);
    }
});
// Search Filter

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();
    const heroSection = document.querySelector('.hero'); // <-- Added
    const allVisibleProducts = document.querySelectorAll(
        '.category-section:not([style*="display: none"]) .product-card, .container .product-card'
    );

    // Hide hero section when searching
    if (searchValue.trim() !== "") {
        heroSection.style.display = 'none';
    } else {
        heroSection.style.display = 'flex';
    }

    allVisibleProducts.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchValue)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
});


