import {createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"

import {auth, guardarPerfil} from "./firebase.js";
import { mostrarMensaje } from "./mostrarMensaje.js";

const formCrearCuenta = $("#formCrearCuenta");

formCrearCuenta.submit(async function(event){
    event.preventDefault();
    
    
    var correo = formCrearCuenta.find('#correoCrearCuenta').val();
    var contra = formCrearCuenta.find('#contraCrearCuenta').val();
    
    var nombres = formCrearCuenta.find('#nombresCrearCuenta').val();
    var apellidos = formCrearCuenta.find('#apellidosCrearCuenta').val();
    var edad = formCrearCuenta.find('#edadCrearCuenta').val();
    var sexo = formCrearCuenta.find('#sexoCrearCuenta').val();


    try{
        const credencialesUsuario = await createUserWithEmailAndPassword(auth, correo, contra);
        guardarPerfil(nombres, apellidos, edad, sexo, correo);
        
        const modalCrearCuenta = $("#modalCrearCuenta");
        const modal = bootstrap.Modal.getInstance(modalCrearCuenta);
        modal.hide();

        formCrearCuenta.trigger('reset');
        mostrarMensaje("Bienvenido"+credencialesUsuario.user.email);

    }catch(error){
console.log("error")
        if(error.code === 'auth/email-already-in-use'){
            mostrarMensaje("Email en uso","error")
        }
        else if (error.code === 'auth/invalid-email'){
            mostrarMensaje("Email invalido", "error")
        }
        else if (error.code === 'auth/weak-password'){
            mostrarMensaje("Password corto", "error")
        }
        else if (error.code){
            mostrarMensaje("Algo salio mal", "error")
        }
    }

});