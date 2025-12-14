let products = [
    // 🟢 FRESCAS
    {
        id: 1,
        name: "Pizza de rúcula, jamón crudo y parmesano",
        price: 8500,
        image: "img/IMG_2743.jpg",
        description: "Pizza fresca de masa biga, salsa pomodoro, mozzarella, rúcula, jamón crudo y parmesano.",
        category: "fresca"
    },
    {
        id: 2,
        name: "Pizza Champiñones",
        price: 8200,
        image: "img/IMG_2728.jpg",
        description: "Pizza fresca con champiñones salteados y mozzarella.",
        category: "fresca"
    },

    // 🟡 CONGELADAS
    {
        id: 3,
        name: "Pizza Calabresa",
        price: 6000,
        image: "img/CC.jpeg",
        description: "Pizza congelada lista para hornear.",
        category: "congelada"
    },
    {
        id: 4,
        name: "Pizza Champiñones",
        price: 5800,
        image: "img/CCH.jpeg",
        description: "Pizza congelada de champiñones, práctica y deliciosa.",
        category: "congelada"
    },
    {
        id: 5,
        name: "Pizza 4 Quesos",
        price: 6200,
        image: "img/C4Q.jpeg",
        description: "Mozzarella, provolone, parmesano y azul.",
        category: "congelada"
    },
    {
        id: 6,
        name: "Pizza Panceta",
        price: 6300,
        image: "img/CT.jpeg",
        description: "Panceta crocante y mozzarella.",
        category: "congelada"
    }
    
];


let cart = [];
let currentFilter = 'all';

// Función para mostrar secciones
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    document.getElementById(sectionId).classList.add('active');
    
    if (sectionId === 'productos') {
        loadProducts();
    }
}

// Función para filtrar productos
function filterProducts(category) {
    currentFilter = category;
    
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProducts();
}

// Función para cargar productos
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjBmMGYwIi8+CjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNkZGRkZGQiIHJ4PSIxMCIvPgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZW48L3RleHQ+Cjwvc3ZnPg=='">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toLocaleString('es-AR')}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Función para agregar al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('¡Producto agregado al carrito!');
}

// Función para mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 9999;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        animation: slideIn 0.5s ease;
    `;
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Función para actualizar la UI del carrito
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Actualizar items del carrito
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
                <button onclick="showSection('productos'); toggleCart();" class="browse-btn">Ver Productos</button>
            </div>
        `;
    } else {
        // Crear tabla del carrito
        const cartTable = document.createElement('div');
        cartTable.className = 'cart-table';
        
        // Encabezado de la tabla
        cartTable.innerHTML = `
            <div class="cart-table-header">
                <div class="header-product">Producto</div>
                <div class="header-price">Precio</div>
                <div class="header-quantity">Cantidad</div>
                <div class="header-total">Total</div>
                <div class="header-action">Acción</div>
            </div>
        `;
        
        // Items del carrito
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartRow = document.createElement('div');
            cartRow.className = 'cart-table-row';
            cartRow.innerHTML = `
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.name}" class="cart-product-image">
                    <div class="cart-product-info">
                        <h4>${item.name}</h4>
                    </div>
                </div>
                <div class="cart-price">$${item.price.toLocaleString('es-AR')}</div>
                <div class="cart-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-total-item">$${itemTotal.toLocaleString('es-AR')}</div>
                <div class="cart-action">
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartTable.appendChild(cartRow);
        });
        
        cartItems.appendChild(cartTable);
    }
    
    // Actualizar totales
    cartSubtotal.textContent = subtotal.toLocaleString('es-AR');
    cartTotal.textContent = subtotal.toLocaleString('es-AR');
}

// Función para actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Función para remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Producto eliminado del carrito');
}

// Función para toggle del carrito
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        updateCartUI();
    }
}

// Función para finalizar compra
function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`¡Gracias por tu compra!\n\nTotal: $${total.toLocaleString('es-AR')}\n\nTe contactaremos pronto para coordinar la entrega.`);
    
    cart = [];
    updateCartUI();
    toggleCart();
}

// Manejo de formularios
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la página
    showSection('inicio');
    updateCartUI();
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Mensaje enviado correctamente! Te responderemos pronto.');
            contactForm.reset();
        });
    }
    
    // Formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            alert(`¡Bienvenido! Has iniciado sesión con: ${email}`);
            loginForm.reset();
        });
    }
});

// Estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

