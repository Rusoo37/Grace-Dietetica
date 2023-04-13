/* Supongamos que la cantidad maxima de ingresos de mails, son 10. Verificar que los mails sean
correctos, una vez verificado, "ocupar" un espacio.
(Use el conocimiento de querySelector y addEventListiner, y le agrege lo solicitado, condicional, 
ciclos e interactuar con el usuario) 
Esperemos que con lo que sigue del curso, se complete la aplicacion web*/

let btn1 = document.querySelector("#suscripto")
let cantVeces = 0

function validar(inputMail) {
    if (inputMail == ""){
        alert("Se ha olvidado de ingresar el mail")
        return false;
    }else{
        alert("Usted se ha suscripto perfectamente!")
        return true;
    }
}

function eliminar(num, cantVeces){
    for (let i = 0; i < num; i++) {
        cantVeces--;
    }
    return cantVeces
}

 btn1.addEventListener("click",()=>{
    // Declaracion de variables locales
    let num;
    let ingreso;
    let cant;
    let inputMail;

    //Ver si ya esta lleno de mails

    if (cantVeces < 10){
        inputMail = document.querySelector("#floatingInput").value      //Traerse ek estado del input
        ingreso = validar(inputMail);   // validar si esta vacio el input o no
        if (ingreso === true){          //Si se ingreso correctamente el mail, se "ocupa" un lugar
            cantVeces++
        }
        console.log(cantVeces)
    }else{
        alert("Usted ya se registro varias veces")

        // Solicitar cantidad de mails que quiera eliminar

        num = Number(prompt("Ingrese la cantidad de mails que quiere eliminar: del 0 (ninguno) al 10(todos) "))
        cant = eliminar(num,cantVeces); // eliminar mails dependiendo la cantidad
        cantVeces = cant //pasarle la nueva cantidad de mails a cantVeces
    }
})

