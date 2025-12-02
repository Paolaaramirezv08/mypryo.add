// ===============================
// CARRITO DE COMPRAS
// ===============================
let cart = [];

const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTotal = document.getElementById("cartTotal");

// ABRIR / CERRAR
function toggleCart() {
  cartSidebar.classList.toggle("open");
  cartOverlay.classList.toggle("open");
}

// AGREGAR PRODUCTO
function addToCart(id, name, price) {
  const product = cart.find(item => item.id === id);
  if (product) product.quantity++;
  else cart.push({ id, name, price, quantity: 1 });
  updateCart();
}

// CAMBIAR CANTIDAD
function changeQuantity(id, amount) {
  const product = cart.find(item => item.id === id);
  if (!product) return;
  product.quantity += amount;
  if (product.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }
  updateCart();
}

// ACTUALIZAR DOM
function updateCart() {
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price}</p>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>`;
    cartItems.appendChild(div);
  });

  cartSubtotal.textContent = subtotal;
  cartTotal.textContent = subtotal;
  cartCount.textContent = cart.reduce((acc, i) => acc + i.quantity, 0);
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  const mensaje = cart.map(i => `${i.quantity}x ${i.name}`).join("%0A");
  const url = `https://wa.me/5491171387123?text=Hola!%20Quiero%20finalizar%20mi%20pedido:%0A${mensaje}`;
  window.open(url);
}




function enviarWhatsApp() {
const url = "https://wa.me/5491171387123?text=Hola,%20quiero%20hacer%20un%20pedido%20en%20Casa%20Battaglia";
window.open(url, "_blank");
}

// ===============================
// FORMULARIO - ENVÍO A WHATSAPP
// ===============================
function enviarFormulario(e) {
e.preventDefault();


const nombre = document.getElementById("c_nombre").value;
const email = document.getElementById("c_email").value;
const mensaje = document.getElementById("c_mensaje").value;


const texto = `Hola! Soy ${nombre}. Mi email es ${email}.%0AQuería consultar lo siguiente:%0A${mensaje}`;


const url = `https://wa.me/5491171387123?text=${texto}`;
window.open(url, "_blank");
}
