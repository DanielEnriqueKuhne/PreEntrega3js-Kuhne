let productos = [
    { id: 1, nombre: "Samsung Galaxy S23", gama: "Alta", color: "Cream", stock: "5", precio: 567000, rutaImagen: "./images/s23.png"},
    { id: 2, nombre: "Samsung Galaxy S22", gama: "Alta", color: "Phantom Black", stock: "7", precio: 460000, rutaImagen: "./images/s22.png"},
    { id: 3, nombre: "Samsung Galaxy S21", gama: "Alta", color: "Graphite", stock: "2", precio: 373000, rutaImagen: "./images/s21.png"},
    { id: 4, nombre: "Samsung Galaxy A54", gama: "Media", color: "Awesome Graphite", stock: "15", precio: 307000, rutaImagen: "./images/a54.png"},
    { id: 5, nombre: "Samsung Galaxy A34", gama: "Media", color: "Awesome Silver", stock: "12", precio: 200000, rutaImagen: "./images/a34.png"},
    { id: 6, nombre: "Samsung Galaxy A24", gama: "Media", color: "Black", stock: "9", precio: 172000, rutaImagen: "./images/a24.png"},
    { id: 7, nombre: "Samsung Galaxy A23", gama: "Baja", color: "Azul", stock: "11", precio: 140000, rutaImagen: "./images/a23.png"},
    { id: 8, nombre: "Samsung Galaxy A14", gama: "Baja", color: "Silver", stock: "22", precio: 140000, rutaImagen: "./images/a14.png"},
    { id: 9, nombre: "Samsung Galaxy A04s", gama: "Baja", color: "Blanco", stock: "7", precio: 112000, rutaImagen: "./images/a04s.png"},
]
//renderizacion de productos del carrito mediante funcion renderizarProductos
let carrito = []
renderizarProductos(productos, carrito)
//filtro por productos segun lo deseado por el usuario mediante funcion filtroProductos
let buscador = document.getElementById("buscador")
let botonBuscar = document.getElementById("buscar")
botonBuscar.addEventListener("click", () => filtroProductos(productos))
//ocultar carrito mediante funcion ocultarCarrito
let botonVerCarrito = document.getElementById("ocultarCarrito")
botonVerCarrito.addEventListener("click", ocultarCarrito)
//recuperar carrito con JSON
let carritoRecuperado = localStorage.getItem("carrito")
if (carritoRecuperado) {
    carrito = JSON.parse(carritoRecuperado)
}
renderizarCarrito(carrito)

//FUNCIONES
//funcion para renderizar productos del carrito
function renderizarProductos(productos, carrito) {
    let contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""
    productos.forEach(producto => {
    let tarjeta = document.createElement("div")
    tarjeta.className = "tarjeta"
    tarjeta.innerHTML = `
    <h3>${producto.nombre}</h3>
    <img class=imagenProducto src=${producto.rutaImagen} />
    <p>$${producto.precio}</p>
    <button id=${producto.id}>Agregar al carrito</button>
    `
    contenedor.appendChild(tarjeta)
    let botonAgregarAlCarrito = document.getElementById(producto.id)
    botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(productos, carrito, e))
})
}
//funcion para filtrar los productos segun su nombre
function filtroProductos(productos) {
    let productosFiltrados = productos.filter(producto => producto.nombre.includes(buscador.value))
    renderizarProductos(productosFiltrados)
}
//funcion para agragar un producto al carrito
function agregarProductoAlCarrito(productos, carrito, e) {
    let productoBuscado = productos.find(producto => producto.id === Number(e.target.id))
    let productoEnCarrito = carrito.find(producto => producto.id === productoBuscado.id)

if (productoBuscado.stock > 0) {
    if (productoEnCarrito) {
    productoEnCarrito.unidades++
    productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
    } else {
    carrito.push({
        id: productoBuscado.id,
        nombre: productoBuscado.nombre,
        precioUnitario: productoBuscado.precio,
        unidades: 1,
        subtotal: productoBuscado.precio
    })
    }
    productoBuscado.stock--
    localStorage.setItem("carrito", JSON.stringify(carrito))
} else {
    alert("No hay más stock de este producto")
}
renderizarCarrito(carrito)
}
//funcion para renderizar el carrito
function renderizarCarrito(productosEnCarrito){
    if (productosEnCarrito.length > 0) {
        let divCarrito = document.getElementById("carrito")
        divCarrito.innerHTML = ""
        productosEnCarrito.forEach(producto => {
        let tarjetaEnCarrito = document.createElement("div")
        tarjetaEnCarrito.className = "tarjetaEnCarrito"
        tarjetaEnCarrito.innerHTML = `
            <h3>${producto.nombre}</h3>
            <img class=imagenProducto src=${producto.rutaImagen} />
            <p>Precio unitario: $${producto.precioUnitario}</p>
            <p>Unidades: ${producto.unidades}</p>
            <p>Subtotal: $${producto.subtotal}</p>
            `
        divCarrito.appendChild(tarjetaEnCarrito)
        })
        /*let boton = document.createElement("button")
        boton.innerHTML = "Finalizar compra"
        boton.addEventListener("click", finalizarCompra)
        divCarrito.appendChild(boton)*/
    }
}

let botonFinalizarCompra = document.getElementById("finalizarCompra")
botonFinalizarCompra.addEventListener("click", finalizarCompra)

function ocultarCarrito() {
    let carrito = document.getElementById("carrito")
    let contenedorProductos = document.getElementById("contenedorProductos")
    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")
}

function finalizarCompra() {
    let carrito = document.getElementById("carrito")
    carrito.innerHTML = ""
    localStorage.removeItem("carrito")
}