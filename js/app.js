const container_product = document.querySelector(".container-products")

// Pintar productos

let Productos = [
    {id: 1, nombre: "Platinum Whey Protein 2lb 1 kb", precio: 150, img: "http://starnutrition.com.ar/images/PD_p_whey_protein_01.jpg"},
    {id: 2, nombre: "Creapure Star x 150 grs", precio: 880, img: "https://www.demusculos.com/shop/2754-medium_default/creapure-150-star-nutrition.jpg"},
    {id: 3, nombre: "Mervick Whey Protein 2lb 1kg", precio: 360, img: "https://correoargentino.vtexassets.com/arquivos/ids/181178-800-auto?v=637734690817000000&width=800&height=auto&aspect=true" },
    {id: 4, nombre: "Mervick Creatine x 300grs", precio: 1050, img: "https://d2r9epyceweg5n.cloudfront.net/stores/001/327/452/products/mervick-creatina3001-a2855695fc1cbfc85916100542521858-640-0.jpg"},
    {id: 5, nombre: "Whey Protein Classic line pro 2.0 x 1kg", precio: 520, img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/774/808/products/productos-web-activa-sport-4-101-e5036ef2489d0dccab16330241688596-1024-1024.png"}
]

for (let producto of Productos){
    let contenedor = document.createElement("div")
    contenedor.innerHTML = 
    `
    <div class="card" style="width: 15rem; height: 400px; max-height: 400px;">
        <div class="card-body text-center">
            <img class="imgs card-img-top" src=${producto.img} alt="Creapure">
            <p class="card-text fs-6" style="height: 30px; margin-top: 5px;" id="product">${producto.nombre}</p>
            <p class="mt-1">Precio: $ ${producto.precio}</p>
            <button class="btn btn-light p-1 " id="btn-carrito" onclick="agregar()">Agregar al carrito</button>
        </div>
    </div>
    `
    container_product.appendChild(contenedor)
} 


// Pre-entrega-2

let carrito = []

function buscarProductos(pro){
    console.log(pro);
    let resultado3 = Productos.find((el) => el.nombre === pro)
    if (resultado3 != null){
        console.log(`El precio es: $${resultado3.precio}`)  
        carrito.push(resultado3)
    }else{
        alert("El producto no se encuentra disponible")
    }
}

let pro
do {
    pro = prompt("Ingrese el producto que quiere informacion especifica (escribir 'escape' para salir): ") 
    if (pro != 'escape'){   
        buscarProductos(pro);
    }
} while (pro != 'escape');

let total = carrito.reduce((accum,producto)=>{
    return accum + producto.precio
}, 0)

console.log(carrito)
alert(`Total: $${total}`)


// FUTURO CARRITO