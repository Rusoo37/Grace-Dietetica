/* ACA TRAIGO LOS COMPONENTES NECESARIOS */
//DIV PRODUCTOS
const container_product = document.querySelector(".container-products")
//DIV TITULO PRODUCTOS
const div_tit_productos = document.querySelector(".div-tit-p")
//TITULO PRODUCTOS
const tit_productos = document.querySelector(".tit-productos");
//DIV CARRITO
const container_carrito = document.querySelector(".container-carrito")
//DIV TOTAL-CARRITO
const container_total = document.querySelector("#tot")
// BTN DE LA IMG DEL CARRO
const btn_activar = document.querySelector("#btn-cart")
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

let carrito = []
let total
const productosStr = []

/* FETCH DE LOS PRODUCTOS */

/* PINTAR PRODUCTOS */

function mostrarProductos(data) {
    data.forEach(producto => {
        tit_productos.innerHTML = "Productos"
        let contenedor = document.createElement("div")
        if (producto.descuento){
            contenedor.innerHTML =
                `
            <div class="mt-2 card card1 d-flex align-items-center" style="width: 14rem; height: 450px;">
                <button class=" items ampliarImagen" class="mt-3" style="border:none; background-color: white;">
                    <div class="card-body text-center">
                        <img class="imgs card-img-top" src=${producto.img} alt="Creapure">
                        <p class="p-descuento">${producto.porcentaje}% OFF en la 2da Unidad.</p>
                        <p class="card-text fs-6 mt-3" style="height: 30px; margin-top: 5px;" id="product">${producto.nombre}</p>
                        <p class="mt-4">Precio: $ ${producto.precio}</p>
                    </div>
                    <button class="btn btn-light p-1 btnSub add-to-cart" id="btn-carrito" style="width: 80%">Agregar al carrito</button>
                </button>
            </div>
            `
        }else{
            contenedor.innerHTML =
                `
            <div class="mt-2 card card1 d-flex align-items-center" style="width: 14rem; height: 450px;">
                <button class=" items ampliarImagen" class="mt-3" style="border:none; background-color: white;">
                    <div class="card-body text-center">
                        <div class="d-flex flex-row">
                            <img class="imgs card-img-top" src=${producto.img} alt="Creapure">
                        </div>
                        <p class="card-text fs-6 mt-3" style="height: 30px; margin-top: 5px;" id="product">${producto.nombre}</p>
                        <p class="mt-4">Precio: $ ${producto.precio}</p>
                    </div>
                    <button class="btn btn-light p-1 btnSub add-to-cart" id="btn-carrito" style="width: 80%">Agregar al carrito</button>
                </button>
            </div>
            `
        }
        container_product.appendChild(contenedor)
    })
}

const productos = async () => {
    const resp = await fetch('./js/data.json')
    const data = await resp.json();

    mostrarProductos(data);

    /* AGREGAR PRODUCTO */

    const btnS = document.querySelectorAll(".btnSub").forEach((btn, j) => {
        btn.addEventListener("click", () => {
            agregar(data[j])
            toastBootstrap.show()
        })
    })

    /* AMPLIAR PRODUCTO */

    const btnA = document.querySelectorAll(".btnA");

    const btn_ampliar = document.querySelectorAll(".ampliarImagen");
    btn_ampliar.forEach((btn2, j) => {
        btn2.addEventListener("click", () => {
            ampliar(data[j])
            const btnA = document.querySelector(".btnA");
            btnA.addEventListener("click", () => {
                agregar(data[j]);
                toastBootstrap.show()
            })
        })
    })

    /* BARRA DE BUSQUEDA */

    const search = document.querySelector('#input-src')

    search.addEventListener('input', () => {
        resultados_src.innerHTML = '';
        let result = search.value;
        result = result.toLowerCase();
        const resultado = data.filter((el) => el.nombre.toLowerCase().includes(result))
        if (result != "") {
            resultados_src.style.display = 'flex';
            if (resultado.length != 0){
                resultado.forEach((p) => {
                    let contenedorSrc = document.createElement('div');
                    contenedorSrc.innerHTML =
                    `
                    <button class="btn-result" id="${p.id}">
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
                    </button>
                    `
                    resultados_src.appendChild(contenedorSrc);
                });
            }else{
                let contenedorSrc = document.createElement('div');
                    contenedorSrc.innerHTML =
                        `
                    <div class="card-src d-flex align-center justify-content-center">
                        <p style="margin: auto">Sin resultados</p>
                    </div>
                    `
                    resultados_src.appendChild(contenedorSrc);
            }
        } else {
            resultados_src.style.display = 'none';
        }

        const btnSRC = document.querySelectorAll(".btn-result");
        btnSRC.forEach((btn2, k) => {
            btn2.addEventListener("click", () => {
                ampliar(resultado[k])
                const btnA = document.querySelector(".btnA");
                search.value = '';
                resultados_src.innerHTML = ''
                btnA.addEventListener("click", () => {
                    agregar(resultado[k]);
                    toastBootstrap.show()
            })
            })
        })
    })

    container_dropdown1.addEventListener('click', () => {
        pintarFiltrado(data, 1, "Cereales");
    })
    container_dropdown2.addEventListener('click', () => {
        pintarFiltrado(data, 2, "Especias");
    })
    container_dropdown3.addEventListener('click', () => {
        pintarFiltrado(data, 3, "Frutos secos");
    })
    container_dropdown4.addEventListener('click', () => {
        pintarFiltrado(data, 4, "Semillas");
    })
    container_dropdown5.addEventListener('click', () => {
        pintarFiltrado(data, 5, "Suplementos deportivos");
    })
}
productos()

const div_toast_body = document.querySelector(".toast-body");

function agregar(p) {
    const existeP = carrito.find((el) => el.id === p.id)
    if (existeP) {
        existeP.cantidad++;
        if ((existeP.cantidad % 2 == 0) && (existeP.descuento)){  
            let cantDescuento = existeP.porcentaje      
            let descuento = (cantDescuento*existeP.precio)/100
            existeP.subtotal += existeP.precio - descuento;
        }else{
            existeP.subtotal += existeP.precio;
        }
        const divExiste = document.querySelector(`#producto-${existeP.id}`);
        divExiste.querySelector(".cantidad-producto").textContent = existeP.cantidad;
        divExiste.querySelector(".subtotal-producto").textContent = existeP.subtotal;
    }else {
        carrito.push({ ...p, cantidad: 1, subtotal: p.precio });
    }
    productosStr.push(p)
    localStorage.setItem("productos", JSON.stringify(productosStr));
    div_toast_body.textContent = `${p.nombre} fue agregado al carrito!`
    pintarCarro();
}

/* PRODUCTO AMPLIADO */

function ampliar(p) {
    container_prod_ampliado.innerHTML = "";
    container_product.style.display = "none";
    slider.style.display = 'none';
    container_prod_ampliado.style.display = 'block';
    let contenedorA = document.createElement("div");
    contenedorA.innerHTML =
        `
    <div class="container d-flex flex-row align-items-center mt-5" style="width: 100%; height: 450px;">
        <div class="cont-imgA">
            <img class="img-ampliada" src=${p.img} alt="Creapure">
        </div>
        <div class="d-flex flex-column w-50">
            <h1 class="card-text fs-6 my-5" style="" id="product">${p.nombre}</h1>
            <p class="mb-5" style="width: 60%">${p.descripcion}</p>
            <p class="mt-1 mb-3"><strong>Precio:</strong> $ ${p.precio}</p>
            <div style="height: 1rem; width: 60%">
                <button class="btnA p-1">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `
    container_prod_ampliado.appendChild(contenedorA)
}

/* CONTENEDOR CARRITO */

function pintarCarro() {
    let cantidad = 0;
    container_carrito.innerHTML = '';
    carrito.forEach(producto => {
        let contenedorCarrito = document.createElement("div")
        contenedorCarrito.setAttribute("id", `producto-${producto.id}`)
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
                <div style="width: 15%;">
                    <p class="mt-1">Precio: $ ${producto.precio}</p>
                </div>
                <div style="width: 15%;">
                    <p class="cantidad-producto">${producto.cantidad}</p>
                </div>
                <div style="width:15%;">
                    <p class="mt-1 subtotal-producto">Precio: $ ${producto.subtotal}</p>
                </div>
                <div style="width:15%;">
                    <button class="btn-eliminar-pro" style="border: none; background: none;">
                        <img class="btn-eliminar-cart" src="./img/trash3.svg" alt="Creapure">
                    </button>
                </div>
            </div>
        </div>
        `
        container_carrito.appendChild(contenedorCarrito)
    })
    total = carrito.reduce((accum, el) => accum + el.subtotal, 0);
    container_total.innerHTML = `Total: $ ${total}`;
    const btn_eliminar_cant = document.querySelectorAll(".btn-eliminar-pro").forEach((btn, i) => {
        btn.addEventListener("click", () => {
            eliminar(carrito[i])
        })
    })
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
        div_tit_productos.style.display = 'none';
    } else {
        x_carro.style.display = 'none';
        container_product.style.display = 'flex';
        slider.style.display = 'block';
        container_prod_ampliado.style.display = 'none';
        login.style.display = 'none';
        div_tit_productos.style.display = 'flex';
    }
}

btn_activar.addEventListener("click", () => {
    activar();
})

/* VACIAR CARRITO - COMPRA HECHA */

const btnVaciar = document.querySelector("#vaciarC")
const btnCompra = document.querySelector("#comprarC")

btnVaciar.addEventListener("click", () => {
    vaciarCarro();
})

function vaciarCarro() {
    carrito = [];
    pintarCarro();
    localStorage.removeItem('Productos');
}

btnCompra.addEventListener("click", () => {
    if ((compraValida) & (carrito.length != 0)) {
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
    } else {
        if (compraValida) {
            Swal.fire({
                title: 'El carrito esta vacio',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        } else {
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

/* ELIMINAR PRODUCTO DEL CARRITO */

function eliminar(p) {
    const existeP = carrito.find((el) => el.id === p.id)
    if ((existeP) && (existeP.cantidad > 1)) {
        if (existeP.cantidad % 2 == 0){
            let cantDescuento = existeP.porcentaje;
            let descuento = (existeP.precio*cantDescuento)/100;
            existeP.subtotal -= existeP.precio - descuento;
        }else{
            existeP.subtotal -= existeP.precio;
        }
        existeP.cantidad--;
        const divExiste = document.querySelector(`#producto-${existeP.id}`);
        divExiste.querySelector(".cantidad-producto").textContent = existeP.cantidad;
        divExiste.querySelector(".subtotal-producto").textContent = existeP.subtotal;
    } else {
        const index = carrito.indexOf(existeP);
        carrito.splice(index ,1);
    }
    const productos_localJSON = localStorage.getItem("productos")
    const productos_local = JSON.parse(productos_localJSON)
    
    //BUSCAR ELEMENTO

    let i = 0;
    let valido = true;
    while ((i < productos_local.length) && (valido)){
        if (productos_local[i].id == p.id){
            valido = false;
            productos_local.splice()
        }
        i++;
    }
    i--;
    productos_local.splice(i,1);
    localStorage.setItem("productos", JSON.stringify(productos_local));
    div_toast_body.textContent = `Se elimino el producto del carrito!`;
    pintarCarro();
}

/* LOGIN */

const ingresar = document.querySelector("#p-ingresar")

ingresar.addEventListener("click", () => {
    if (login.style.display === 'none') {
        login.style.display = 'flex';
        x_carro.style.display = 'none';
        container_product.style.display = 'none';
        slider.style.display = 'none';
        container_prod_ampliado.style.display = 'none';
        div_tit_productos.style.display = 'none'
    } else {
        login.style.display = 'none';
        x_carro.style.display = 'none';
        container_product.style.display = 'flex';
        slider.style.display = 'block';
        container_prod_ampliado.style.display = 'none';
        div_tit_productos.style.display = 'flex'
    }
})

const contenedorLogin = document.createElement("div");
contenedorLogin.innerHTML =
    `
    <div class="mt-4 d-flex justify-content-center align-center">
        <h1>Iniciar Sesión</h1>
    </div>
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
    if ((inputMail.value != "") & (inputPass.value != "")) {
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
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Complete todos los campos!'
        })
    }
})

// DROPDOWN, FILTRO

const container_dropdown1 = document.querySelector("#d1")
const container_dropdown2 = document.querySelector("#d2")
const container_dropdown3 = document.querySelector("#d3")
const container_dropdown4 = document.querySelector("#d4")
const container_dropdown5 = document.querySelector("#d5")
let productosFiltro = []

function pintarFiltrado(data,id, n) {
    container_product.innerHTML = '';
    div_tit_productos.style.display = 'flex';
    container_product.style.display = 'flex';
    slider.style.display = 'block';
    x_carro.style.display = 'none';
    login.style.display = 'none';
    container_prod_ampliado.style.display = 'none';
    tit_productos.innerHTML = `${n}`
    const resultado = data.filter((el) => el.categoria === id);
    productosFiltro = resultado
    resultado.forEach((p) => {
        let contenedor = document.createElement("div")
        contenedor.innerHTML =
            `
        <div class="mt-2 card card1 d-flex align-items-center" style="width: 14rem; height: 450px;">
            <button class="items ampliarImagen2" class="mt-3" style="border:none; background-color: white;">
                <div class="card-body text-center">
                    <img class="imgs card-img-top" src=${p.img} alt="Creapure">
                    <p class="card-text fs-6" style="height: 30px; margin-top: 5px;" id="product">${p.nombre}</p>
                    <p class="mt-1">Precio: $ ${p.precio}</p>
                </div>
                <button class="btn btn-light p-1 btnSub2 add-to-cart" id="btn-carrito" style="width: 80%">Agregar al carrito</button>
            </button>
        </div>
    `
        container_product.appendChild(contenedor)
    })
    ampliar2();
    agregarFiltrado();
}

function ampliar2() {
    const btn_ampliar2 = document.querySelectorAll(".ampliarImagen2");

    btn_ampliar2.forEach((btn3, j) => {
        btn3.addEventListener("click", () => {
            ampliar(productosFiltro[j])
            const btnA = document.querySelector(".btnA");
            btnA.addEventListener("click", () => {
                agregar(productosFiltro[j]);
                toastBootstrap.show();
            })
        })
    })
}

function agregarFiltrado() {
    const btnS2 = document.querySelectorAll(".btnSub2").forEach((btn, j) => {
        btn.addEventListener("click", () => {
            agregar(productosFiltro[j])
            toastBootstrap.show()
        })
    })
}

// TOAST DE BOOSTRAP

const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

/* SUSCRIBIRSE */

const btn_suscribe = document.querySelector("#suscripto");
const mail_local = []
localStorage.setItem("mailSuscripcion", JSON.stringify(mail_local));
btn_suscribe.addEventListener("click", () => {
    const input_suscribe = document.querySelector("#floatingInput").value
    if (input_suscribe != ""){
        let mailsSTR = JSON.parse(localStorage.getItem("mailSuscripcion"));
        //FILTRAR Y VER SI ESTA EL MAIL
        const existeMail = mailsSTR.find((el) => el === input_suscribe)
        console.log(existeMail)
        if (existeMail){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El email ya esta suscripto!'
            })  
        }else{
            Swal.fire({
                title: 'Se ha suscripto a recibir nuevas ofertas!',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
            })
            mail_local.push(input_suscribe)
            localStorage.setItem("mailSuscripcion", JSON.stringify(mail_local));
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un email válido!'
        })  
    }
})