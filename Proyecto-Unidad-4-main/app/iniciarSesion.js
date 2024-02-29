import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"
import { auth } from "./firebase.js";

const formIniciarSesion = $("#formIniciarSesion");

import {mostrarMensaje} from "./mostrarMensaje.js";


formIniciarSesion.submit(async function(event){
    event.preventDefault();

    var correo = formIniciarSesion.find('#correoIniciarSesion').val();
    var contra = formIniciarSesion.find('#contraIniciarSesion').val();


    try{
        const credencialesUsuario = await signInWithEmailAndPassword(auth, correo, contra);

        const modal = bootstrap.Modal.getInstance(formIniciarSesion.closest('.modal'));
        modal.hide();

        formIniciarSesion.trigger('reset');
        mostrarMensaje("Bienvenido"+credencialesUsuario.user.email);
    }
    catch(error){
        console.log("error")
        if(error.code ==='auth/wrong-password'){
            mostrarMensaje("Password equivocado","error")
        }
        else if(error.code === 'auth/user-not-found'){
            mostrarMensaje("No se encuentra usuario", "error")
        }
        else{
            mostrarMensaje("Algo salio mal", "error")
        }
    }
});