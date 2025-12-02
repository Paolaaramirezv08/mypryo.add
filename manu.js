// ===============================
// MÓDULO DE PRODUCTOS - NAPOLI VERA
// ===============================

// Lista de productos
const productos = [
  {
    id: 1,
    nombre: "Margarita",
    categoria: "clasicas",
    descripcion: "Tomate natural, mozzarella fresca y albahaca.",
    precio: 7800,
    imagen: "img/IMG_2743.JPG"
  },
  {
    id: 2,
    nombre: "Calabresa",
    categoria: "especiales",
    descripcion: "Longaniza calabresa, mozzarella y oliva.",
    precio: 11050,
    imagen: "https://images.unsplash.com/photo-1601924928376-3e7a7ddc67df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    nombre: "Jamón",
    categoria: "clasicas",
    descripcion: "Queso mozzarella y jamón natural.",
    precio: 10400,
    imagen: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    nombre: "Maíz y Champiñones",
    categoria: "veggie",
    descripcion: "Granos de maíz dulce, champiñones y queso.",
    precio: 11050,
    imagen: "https://images.unsplash.com/photo-1541592553160-82008b127ccb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    nombre: "Panceta",
    categoria: "especiales",
    descripcion: "Mozzarella, panceta crocante y oliva.",
    precio: 11050,
    imagen: "https://images.unsplash.com/photo-1601924582971-dbb2f1f2f3dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    nombre: "Cuatro Quesos",
    categoria: "especiales",
    descripcion: "Blend de mozzarella, azul, parmesano y provolone.",
    precio: 12025,
    imagen: "https://images.unsplash.com/photo-1600628422011-47c9c7f2d5b5?auto=format&fit=crop&w=800&q=80"
  }
];

const productsGrid = document.getElementById("productsGrid");

// ===============================
// CARGAR PRODUCTOS EN EL DOM
// ===============================
function cargarProductos(lista) {
  productsGrid.innerHTML = "";

  lista.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-image">
        <img src="${prod.imagen}" alt="${prod.nombre}">
      </div>
      <div class="product-info">
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <p class="product-price">$${prod.precio.toLocaleString("es-AR")}</p>
        <button class="add-to-cart" onclick="addToCart(${prod.id}, '${prod.nombre}', ${prod.precio})">
          Agregar al carrito
        </button>
      </div>
    `;

    productsGrid.appendChild(card);
  });
}

// ===============================
// FILTRO DE PRODUCTOS
// ===============================
function filterProducts(categoria, event) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (categoria === "all") {
    cargarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    cargarProductos(filtrados);
  }
}

// Cargar productos al inicio
cargarProductos(productos);
