let productoDetalle = localStorage.getItem("detalle")
let detalleP = JSON.parse(productoDetalle) // Corregido: era "productoDetale"
 let contador = 0
function cargarproductos(){
    // Verificar que el elemento contenedor existe
    let contenedor = document.getElementById("boxproductos");
    if (!contenedor) {
        console.error("No se encontró el elemento con ID 'boxproductos'");
        return;
    }

    // Verificar que hay datos del producto
    if (!detalleP) {
        console.error("No hay datos del producto en localStorage");
        return;
    }

    let parrafo = document.createElement("div")
    parrafo.id = "boxproducto"
    parrafo.innerHTML = `     
        <h2 id="nombreProducto">${detalleP.nombre}</h2>
        <img src="${detalleP.imagen}" alt="${detalleP.nombre}" id="imagenProducto">
        <p id="descripcionProducto">${detalleP.descripcion}</p>
        <h3 id="precioProducto">$${detalleP.precio}</h3>
        <p id="stockProducto">Stock disponible: ${detalleP.stock}</p>
        <div id="boxContador">
            <button id="btnRestarProducto" onclick="restarcontador()">-</button>
            <p id="contadorProducto">1</p>
            <button id="btnSumarProducto">+</button>
        </div>
        <button id="btnAgregarCarrito">Agregar al carrito</button>`
    
    contenedor.appendChild(parrafo)

    // Agregar funcionalidad a los botones
    agregarEventosContador();
}

function agregarEventosContador() {
    const btnSumar = document.getElementById("btnSumarProducto");
    const btnRestar = document.getElementById("btnRestarProducto");
    const contador = document.getElementById("contadorProducto");
    
    if (btnSumar && btnRestar && contador) {
        btnSumar.addEventListener("click", () => {
            let cantidad = parseInt(contador.textContent);
            if (cantidad < detalleP.stock) {
                contador.textContent = cantidad + 1;
            }
        });

        btnRestar.addEventListener("click", () => {
            let cantidad = parseInt(contador.textContent);
            if (cantidad > 1) {
                contador.textContent = cantidad - 1;
            }
        });
    }
}

// Verificar que el DOM esté cargado antes de ejecutar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cargarproductos);
} else {
    cargarproductos();
  
    function sumarcontador(){
        contador = contador + 1;
        document.getElementById("contadorProducto").innerHTML = contador
    }

}
function restarcontador(){
    if(contador>0){
        contador = contador + 1;
        document.getElementById("contadorProducto").innerHTML = contador
    }
    
    }
