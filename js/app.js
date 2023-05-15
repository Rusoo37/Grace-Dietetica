/* En esta pre-entrega, pongo en practica el carrito de compras con la ayuda del pedazito de codigo de Omar, de subtotal y cantidad. Si
el usuario "ingresa" se guarda en el localStorage y puede efectuar la compra, utilice sweet alert para no usar los alerts comunes.
Ademas, de la barra de busqueda que utilizo un filter. Tambien, muestro todos los productos y si apreta en la seccion de especies y demas, 
se filtraran por categoria (yo creo que esa parte del codigo se puede optimizar, es de las ultimas del app.js).
Me queda hacer un scroll en los resultados de la busqueda que lo estare terminando para la entrega final
Espero cumplir los requisitos y ya estar listo para la entrega final.
*/

//DIV PRODUCTOS
const container_product = document.querySelector(".container-products")
//TITULO PRODUCTOS
const tit_productos = document.querySelector(".tit-productos");
//DIV CARRITO
const container_carrito = document.querySelector(".container-carrito")
//DIV TOTAL-CARRITO
const container_total = document.querySelector("#tot")
// BTN DE LA IMG DEL CARRO
const btn_carro = document.querySelector("#btn-carro")
//DIV PRODUCTO AMPLIADO
const container_prod_ampliado = document.querySelector(".container-img-ampliada")
//DIV SLIDER
const slider = document.querySelector(".slide")
//DIV LOGIN
const login = document.querySelector("#container-ingreso");
//DIV SRC
const resultados_src = document.querySelector(".resultados-src")

let compraValida = false


/* ARRAYS DE PRODUCTO Y CARRITO */

let Productos = [
    { id: 1, categoria: 5, nombre: "Platinum Whey Protein 2lb 1 kb", descripcion: "Whey Protein es un suplemento dietario en polvo dietético para preparar bebida a base de proteínas de suero.", precio: 150, img: "http://starnutrition.com.ar/images/PD_p_whey_protein_01.jpg" },
    { id: 2, categoria: 5, nombre: "Creapure Star x 150 grs", descripcion: "Creapure Star es la nueva creatina monohidrato ultramicronizada de Star Nutrition con sello Creapure ® que garantiza alta calidad de los productos.", precio: 880, img: "https://www.demusculos.com/shop/2754-medium_default/creapure-150-star-nutrition.jpg" },
    { id: 3, categoria: 5, nombre: "Mervick Whey Protein 2lb 1kg", descripcion: "Mervick es una proteína de suero de alta cálidad y elevadísimo valor biológico destinado a quienes deseen incrementar la masa muscular.", precio: 360, img: "https://correoargentino.vtexassets.com/arquivos/ids/181178-800-auto?v=637734690817000000&width=800&height=auto&aspect=true" },
    { id: 4, categoria: 5, nombre: "Mervick Creatine x 300grs", descripcion: "Mervick Creatine es una creatina de 300 gramos ultra micronizada y de monohidrato. Ideal para aumentar la energía, resistencia, prevenir la fatiga muscular y recuperarte más rápidamente.", precio: 1050, img: "https://d2r9epyceweg5n.cloudfront.net/stores/001/327/452/products/mervick-creatina3001-a2855695fc1cbfc85916100542521858-640-0.jpg" },
    { id: 5, categoria: 5, nombre: "Whey Protein Classic line pro 2.0 x 1kg", descripcion: "Es un suplemento nutricional a base de proteínas, vitaminas y minerales. Post Entreno de rápida absorción, ideal para la recuperación. Excelente fuente de proteínas. Contribuye al crecimiento de la masa muscular.", precio: 520, img: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/774/808/products/productos-web-activa-sport-4-101-e5036ef2489d0dccab16330241688596-1024-1024.png" },
    { id: 6, categoria: 1, nombre: "Almohaditas de frutilla 250grs", descripcion: "Producto alimenticio compuesto por diferentes tipos de harinas de cereal, que tienen la particularidad de contar con un delicioso relleno.", precio: 400, img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/101/709/products/almohaditas-frutilla1-d49c6d7df1c6fc5e9c16007530438515-640-0.png"},
    { id: 7, categoria: 1, nombre: "Almohaditas de frutilla 100grs", descripcion: "Producto alimenticio compuesto por diferentes tipos de harinas de cereal, que tienen la particularidad de contar con un delicioso relleno.", precio: 350, img:"https://d2r9epyceweg5n.cloudfront.net/stores/495/644/products/almohaditas-de-chocolate-3973e1d3d92a83a53415132622410867-1024-1024.jpg"},
    { id: 8, categoria: 1, nombre: "Avena", descripcion: "La avena es un cereal saludable ya que contiene importantes nutrientes, vitaminas y minerales.", precio: 200, img:"https://http2.mlstatic.com/D_NQ_NP_2X_993283-MLA43990277418_112020-F.webp"},
    { id: 9, categoria: 1, nombre: "Germen de trigo", descripcion: "Es la parte de la semilla que germinará y de la que nacerá una nueva planta", precio: 350, img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/la-tranquilina-411-a3063be7f8942b5a6316764718058426-640-0.webp"},
    { id: 10,categoria: 1, nombre: "Quinoa inflada", descripcion: "Contiene una alta cantidad de proteínas pero, a su vez, su grado de hidratos de carbono y de fibra hace que sea una gran fuente de energía de liberación lenta. Es rica en minerales, como el hierro, el fósforo, el magnesio, el manganeso, el potasio, el cobre, el zinc y vitaminas B2 y B3.", precio: 450, img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/040/363/products/la-tranquilina-481-896e53e757f7043b2216764731912389-640-0.webp"},
    { id: 11, categoria: 2, nombre: "Canela", descripcion: "La canela es rica en calcio, manganeso y fibra. Tiene propiedades antioxidantes que fortalecen el sistema inmunológico y ayudan a prevenir cáncer y enfermedades del corazón.", precio: 300, img:"https://res.cloudinary.com/estebandiaz/image/upload/f_auto/cocinario-beta-foods/5f22b5cc6eb30acead5eb9a5.png"},
    { id: 12, categoria: 2, nombre: "Nuez moscada", descripcion: "La nuez moscada se ha usado para sazonar los platos, gracias a su aroma y sabor tan especial. Como ya decíamos, casa muy bien con carnes, pescados y postres, pero también con guisos, caldos y sopas. Además se puede usar para bebidas como chocolates, cafés, tés o para complementar la leche.", precio: 200, img:"https://www.cocinista.es/download/bancorecursos/ingredientes/ingrediente-nuez-moscada.jpg"},
    { id: 13, categoria: 2, nombre: "Oregano", descripcion: "El orégano (Origanum vulgare) es una hierba que se utiliza para dar sabor a los alimentos. Se considera seguro en cantidades comunes de alimentos, pero tiene poca evidencia de beneficios para la salud. El orégano tiene hojas de color verde oliva y flores de color púrpura.", precio: 90, img:"https://5.imimg.com/data5/SELLER/Default/2022/8/EQ/LX/HH/28485242/oregano-leaves-500x500.jpg"},
    { id: 14, categoria: 2, nombre: "Pimenton", descripcion: "El pimentón es un condimento muy utilizado en las cocinas españolas, elaborado a partir de la trituración de pimientos secos.", precio: 150, img:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Piment%C3%B3n_Tap_de_Cort%C3%AD.jpg/377px-Piment%C3%B3n_Tap_de_Cort%C3%AD.jpg"},
    { id: 15, categoria: 3, nombre: "Almendra", descripcion: "Se trata de la semilla del árbol del almendro, nativo del Medio Oriente. El fruto de esta especie no es comestible. Contienen minerales como calcio, hierro, magnesio, fósforo, potasio, sodio, zinc, cobre, manganeso y selenio.", precio: 310, img:"https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/a/l/almendra-pelada_1_1.jpg"},
    { id: 16, categoria: 3, nombre: "Castaña", descripcion: "Además del favorecer el equilibrio de la glucosa y por lo tanto el equilibrio hormonal, las castañas aportan minerales como calcio, magnesio, potasio, hierro, fósforo, sodio, yodo, selenio y zinc. También contienen vitaminas como la vitamina E, vitaminas del grupo B y ácido fólico.", precio: 240, img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzWuQ0pbX5-1vUTdeKXrVLbUFUalALMOeYmj0NWR5OVD2Cv-TvVZInWnPZWb0PayU72Wc&usqp=CAU"},
    { id: 17, categoria: 3, nombre: "Nuez", descripcion: "Las nueces, uno de los frutos secos más apreciados por su exquisito sabor, es a su vez uno de los alimentos más saludables y recomendados por los expertos debido a la calidad de sus grasas y sus componentes antioxidantes.", precio: 170, img:"https://laopinion.com/wp-content/uploads/sites/3/2016/10/nuez-walnut-shutterstock_407822113-copy.jpg?quality=75&strip=all&w=768"},
    { id: 18, categoria: 3, nombre: "Pasas de uvas", descripcion: "Las pasas de uva son un tipo de fruta deshidratada que procede de las uvas secas. ", precio: 290, img:"https://cdn.newgarden.com.ar/media/catalog/product/cache/dda7253a1a2f6711745de410175d10f8/3/3/334334-pasa-de-uva-negra-gigante-_jumbo_.jpg"},
    { id: 19, categoria: 4, nombre: "Avellana", descripcion: "Es un fruto con cantidades abundantes de minerales y vitaminas, tales como el calcio, fósforo o el magnesio", precio: 530, img:"https://assets.elgourmet.com/wp-content/uploads/2023/03/diccio_1736.jpg.webp"},
    { id: 20, categoria: 4, nombre: "Chia", descripcion: "Su contenido en proteínas de rápida digestión, proporciona también los 9 aminoácidos esenciales, mientras que su alto contenido en fibra soluble, acelera y prolonga la saciedad, reduciendo los antojos entre comidas y mejorando el tracto digestivo, por lo que estimula la tasa metabólica a lo largo del día.", precio: 300, img:"https://www.cocinista.es/download/bancorecursos/ingredientes/ingrediente-semilla-chia.jpg"},
    { id: 20, categoria: 4, nombre: "Quinoa", descripcion: "La quinoa se considera una fuente de proteína de calidad y de alto valor biológico", precio: 400, img:"https://d3ugyf2ht6aenh.cloudfront.net/stores/001/157/846/products/quinoa1-f5c2e42d92a1bc1b2b15871712588385-640-0.webp"},
    { id: 20, categoria: 4, nombre: "Sesamo", descripcion: "El sesamo es una especie originaria de India y África y antiguamente era utilizado por su alto contenido en óleo.", precio: 150, img:"https://www.cocinista.es/download/bancorecursos/ingredientes/ingrediente-sesamo.jpg"}
]

let carrito = []
let total
const productosStr = []

/* PINTAR PRODUCTOS */

function mostrarProductos(){
    Productos.forEach(producto => {
        tit_productos.innerHTML = "Productos"
        let contenedor = document.createElement("div")
        contenedor.innerHTML =
            `
        <div class="mt-2 card card1 d-flex align-items-center" style="width: 14rem; height: 450px;">
            <button class=" items ampliarImagen" class="mt-3" style="border:none; background-color: white;" onclick="ampliar()">
                <div class="card-body text-center">
                    <img class="imgs card-img-top" src=${producto.img} alt="Creapure">
                    <p class="card-text fs-6 mt-3" style="height: 30px; margin-top: 5px;" id="product">${producto.nombre}</p>
                    <p class="mt-4">Precio: $ ${producto.precio}</p>
                </div>
                <button class="btn btn-light p-1 btnSub add-to-cart" id="btn-carrito" style="width: 80%">Agregar al carrito</button>
            </button>
        </div>
        `
        container_product.appendChild(contenedor)
    })
}
mostrarProductos();

const div_toast_body = document.querySelector(".toast-body");

function agregar(p) {
    const existeP = carrito.find((el) => el.id === p.id)
    if (existeP){
        existeP.cantidad++;
        existeP.subtotal+= existeP.precio;
        const divExiste = document.querySelector(`#producto-${existeP.id}`);
        console.log(divExiste);
        divExiste.querySelector(".cantidad-producto").textContent = existeP.cantidad;
        divExiste.querySelector(".subtotal-producto").textContent = existeP.subtotal;
    }else{
        carrito.push({...p, cantidad: 1, subtotal: p.precio});
        const nuevoProducto = JSON.stringify(p)
        productosStr.push(nuevoProducto)
        localStorage.setItem("Productos", productosStr);
    }
    div_toast_body.textContent = `${p.nombre} fue agregado al carrito!`
    pintarCarro();
}

const btnS = document.querySelectorAll(".btnSub").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        agregar(Productos[i])
        toastBootstrap.show()
    })
})

/* PRODUCTO AMPLIADO */

function ampliar(p) {
    container_prod_ampliado.innerHTML = ''
    container_prod_ampliado.style.display = 'block';
    container_product.style.display = "none";
    slider.style.display = 'none';
    let contenedorA = document.createElement("div");
    contenedorA.innerHTML =
    `
    <div class="container d-flex flex-row align-items-center mt-5" style="width: 100%; height: 450px;">
        <div class="cont-imgA">
            <img class="img-ampliada" src=${p.img} alt="Creapure">
        </div>
        <div class="d-flex flex-column w-50">
            <h1 class="card-text fs-6 my-5" style="" id="product">${p.nombre} whey Protein 2lb 1kg</h1>
            <p class="mb-5" style="width: 60%">${p.descripcion}</p>
            <p class="mt-1 mb-3"><strong>Precio:</strong> $${p.precio}</p>
            <div style="height: 1rem; width: 60%">
                <button class="btnA p-1">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `
    container_prod_ampliado.appendChild(contenedorA)
}

const btnAAS = document.querySelectorAll(".btnA").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        //agregar(Productos[i]);
        console.log("llegue");
    })
})

const btn_ampliar = document.querySelectorAll(".ampliarImagen");
btn_ampliar.forEach((btn2, j) => {
    btn2.addEventListener("click", () => {
        ampliar(Productos[j])
    })
})

/* CONTENEDOR CARRITO */

function pintarCarro() {
    let cantidad = 0;
    container_carrito.innerHTML = '';
    carrito.forEach(producto => {
        let contenedorCarrito = document.createElement("div")
        contenedorCarrito.setAttribute("id",`producto-${producto.id}`)
        contenedorCarrito.innerHTML =
            `
        <div class="card mt-2" style="width: 100%; height: 200px;">
            <div class="card-body text-center d-flex flex-row justify-content-start align-items-center">
                <div style="width:20%;">
                    <img class="img-carro" src=${producto.img} alt="Creapure">
                </div>
                <div style="width:20%;">
                    <p class="card-text fs-6" style="height: 30px; margin-top: 5px;" id="product">${producto.nombre}</p>
                </div>
                <div style="width: 20%;">
                    <p class="mt-1">Precio: $ ${producto.precio}</p>
                </div>
                <div style="width: 20%;">
                    <p class="cantidad-producto">${producto.cantidad}</p>
                </div>
                <div style="width:20%;">
                    <p class="mt-1 subtotal-producto">Precio: $ ${producto.subtotal}</p>
                </div>
            </div>
        </div>
        `
        container_carrito.appendChild(contenedorCarrito)
    })
    total = carrito.reduce((accum, el) => accum + el.subtotal, 0);
    container_total.innerHTML = `Total: $ ${total}`;
}

/* MOSTRAR - OCULTAR CARRITO */

const x_carro = document.querySelector("#container-carro")

function activar() {
    if (x_carro.style.display === 'none') {
        x_carro.style.display = 'block';
        container_product.style.display = 'none';
        slider.style.display = 'block';
        container_prod_ampliado.style.display = 'none';
        login.style.display = 'none';
    } else {
        x_carro.style.display = 'none';
        container_product.style.display = 'flex';
        slider.style.display = 'block';
        container_prod_ampliado.style.display = 'none';
        login.style.display = 'none';
    }
}

/* VACIAR CARRITO - COMPRA HECHA */

const btnVaciar = document.querySelector("#vaciarC")
const btnCompra = document.querySelector("#comprarC")

btnVaciar.addEventListener("click", () => {
    vaciarCarro();
})

function vaciarCarro() {
    carrito = [];
    pintarCarro();
    let vaciarStr = localStorage.getItem(Productos)
    vaciarStr = []
    localStorage.setItem("Productos", vaciarStr)
}

btnCompra.addEventListener("click", () => {
    if ((compraValida) & (carrito.length != 0)){
        Swal.fire({
            title: 'Seguro que quieres comprar?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Comprar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Compra exitosa!', '', 'success')
                vaciarCarro();
            } else if (result.isDenied) {
                Swal.fire('Su compra fue cancelada', '', 'info')
            }
        })
    }else{
        if (compraValida){
            Swal.fire({
                title: 'El carrito esta vacio',
                showClass: {
                popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }else{
            Swal.fire({
                title: 'Debe ingresar sesión para poder comprar',
                showClass: {
                popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }
    }
})

/* LOGIN */

const ingresar = document.querySelector("#p-ingresar")

ingresar.addEventListener("click", () => {
    if (login.style.display === 'none') {
        login.style.display = 'flex';
        x_carro.style.display = 'none';
        container_product.style.display = 'none';
        slider.style.display = 'none';
        container_prod_ampliado.style.display = 'none';
    } else {
        login.style.display = 'none';
        x_carro.style.display = 'none';
        container_product.style.display = 'flex';
        slider.style.display = 'block';
        container_prod_ampliado.style.display = 'none';
    }
})

const contenedorLogin = document.createElement("div");
contenedorLogin.innerHTML =
    `
    <form action="" class="d-flex flex-column p-3 my-5" style=" width: 30rem; height: 25rem;
                    border: 2px 2px orange;
                    border-radius: 0.7rem;
                    background-color: #eaeeea;
                "
            >
                <div class="mt-2 mb-4">
                    <img
                        src="img/logo.png"
                        alt="LOGO"
                        class="d-flex position-absolute start-50 translate-middle"
                        style="width: 120px; height: 120px"
                    />
                </div>
                <div class="form-floating mb-4 mt-5">
                    <input
                        type="email"
                        class="form-control"
                        id="floatingInput2"
                        placeholder="name@example.com"
                    />
                    <label for="floatingInput2">Correo Electrónico </label>
                </div>
                <div class="form-floating mt-2 mb-4">
                    <input
                        type="password"
                        class="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                    />
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <div
                    class="mb-3 form-check mt-3 d-flex flex-row align-items-center justify-content-between"
                >
                    <div>
                        <input
                            type="checkbox"
                            class="form-check-input"
                            id="exampleCheck1"
                        />
                        <label
                            class="form-check-label primary"
                            for="exampleCheck1"
                            >Guardar sesión</label
                        >
                    </div>
                    <span>
                        <a href="#" class="text-reset">Olvido su contraseña?</a>
                    </span>
                </div>
                <button
                    type="submit"
                    class="btn btn-primary"
                    style="width: 50%; margin: auto"
                    id="btn-ingresar"
                >
                    Ingresar
                </button>
            </form>
`
login.appendChild(contenedorLogin)

const inputMail = document.querySelector("#floatingInput2");
const inputPass = document.querySelector("#floatingPassword");
const btnIngreso = document.querySelector("#btn-ingresar");


btnIngreso.addEventListener("click", (e) => {
    e.preventDefault();
    if ((inputMail.value != "") & (inputPass.value != "")){
        compraValida = true;
        mailJson = JSON.stringify(inputMail.value)
        passJson = JSON.stringify(inputPass.value)
        localStorage.setItem("email", mailJson)
        localStorage.setItem("contraseña", passJson)
        Swal.fire(
            'Ha ingreso correctamente!',
            '',
            'success'
          )
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Complete todos los campos!'
          })
    }
})

/* BARRA DE BUSQUEDA */

const search = document.querySelector('#input-src')

search.addEventListener('input', () => {
    resultados_src.innerHTML = '';
    let result = search.value;
    result = result.toLowerCase();
    const resultado = Productos.filter((el) => el.nombre.toLowerCase().includes(result))
    if (result != "") {
        resultados_src.style.display = 'flex';
        resultado.forEach((p) => {
            let contenedorSrc = document.createElement('div');
            contenedorSrc.innerHTML =
            `
            <div class="card-src">
                <div class="d-flex justify-content-center align-center" style="width: 33%; height: 90%">
                    <img class="img-src" src=${p.img} alt="Creapure">
                </div>
                <div style=" width: 33%;">
                    <p class="name-src" >${p.nombre}</p>
                </div>
                <div class="mt-2" style="width: 33%;">
                    <p class="precio-src">$${p.precio}</p>
                </div>
            </div>
            `
            resultados_src.appendChild(contenedorSrc);
        });
    } else {
        resultados_src.style.display = 'none';
    }
})

// DROPDOWN, FILTRO

const container_dropdown1 = document.querySelector("#d1")
const container_dropdown2 = document.querySelector("#d2")
const container_dropdown3 = document.querySelector("#d3")
const container_dropdown4 = document.querySelector("#d4")
const container_dropdown5 = document.querySelector("#d5")

function pintarFiltrado(id,n){
    container_product.innerHTML = ''
    tit_productos.innerHTML = `${n}`
    const resultado = Productos.filter((el) => el.categoria === id);
    resultado.forEach((p) => {
        let contenedor = document.createElement("div")
        contenedor.innerHTML =
        `
        <div class="mt-2 card card1 d-flex align-items-center" style="width: 14rem; height: 450px;">
            <button class=" items ampliarImagen" class="mt-3" style="border:none; background-color: white;" onclick="ampliar()">
                <div class="card-body text-center">
                    <img class="imgs card-img-top" src=${p.img} alt="Creapure">
                    <p class="card-text fs-6" style="height: 30px; margin-top: 5px;" id="product">${p.nombre}</p>
                    <p class="mt-1">Precio: $ ${p.precio}</p>
                </div>
                <button class="btn btn-light p-1 btnSub add-to-cart" id="btn-carrito" style="width: 80%">Agregar al carrito</button>
            </button>
        </div>
    `
    container_product.appendChild(contenedor)
    })
}

container_dropdown1.addEventListener('click', () => {
    pintarFiltrado(1,"Cereales");
})
container_dropdown2.addEventListener('click', () => {
    pintarFiltrado(2,"Especias");
})
container_dropdown3.addEventListener('click', () => {
    pintarFiltrado(3,"Frutos secos");
})
container_dropdown4.addEventListener('click', () => {
    pintarFiltrado(4,"Semillas");
})
container_dropdown5.addEventListener('click', () => {
    pintarFiltrado(5,"Suplementos deportivos");
})


// TOAST DE BOOSTRAP

const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

/*
 Tareas: 14-5-23
1- El ampliado se agregue al carrito --> ERROR
3- La barra de busqueda tenga un scroll --> 
*/