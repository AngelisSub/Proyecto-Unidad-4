import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth, actulizarObtenerTareas, eliminarTarea, actualizarTarea, obtenerTarea } from "./app/firebase.js";

import './app/crearCuenta.js'
import './app/iniciarSesion.js'
import './app/cerrarSesion.js'
import { verificarSesion } from "./app/verificarSesion.js";
import { mostrarContenidoVacio } from "./app/mostrarContenido.js";
import { mostrarContenido } from "./app/mostrarContenido.js";
import { mostrarMensaje } from "./app/mostrarMensaje.js";

import { guardarTarea } from "./app/firebase.js";

const formTareas = $("#form-tareas");
let userGlobal;
let estadoEditar = false;
let id = '';
auth.onAuthStateChanged(async function (user) {
    if (user) {
        userGlobal = user;
        verificarSesion(user);
        const correo = user.email;
        console.log("sesion iniciada");

        actulizarObtenerTareas(querySnapshot => {
           
            let html = '';
            let html2 = '';
            querySnapshot.forEach(function (doc) {
                const task = doc.data();
                if (task.email == correo) {

                    const fecha = task.fechaCreacion.toDate();
                    const anio = fecha.getFullYear();
                    const mes = fecha.getMonth() + 1;
                    const dia = fecha.getDate();
                    const hora = fecha.getHours();
                    const minutos = fecha.getMinutes();
                    const segundos = fecha.getSeconds();
                console.log(anio)

                    html += `
                    <li class = "list-group-item list-group-item-action mt-2">
                     <h5>${task.titulo}</h5>
                     <p><i>${"Creado el día"+dia+"/"+mes+"/"+anio+"a las"+hora+":"+minutos+":"+segundos}</i></p>
                     <p>${task.descripcion}</p>
                     <div>
                       <button class = "btn btn-primary btn-eliminar" data-id = "${doc.id}">
                          Delete
                       </button>
                       <button class = "btn btn-secondary btn-editar" data-id ="${doc.id}">
                          Edit
                       </button>
                     </div>
                    </li>
                    `;
                }
            });

            querySnapshot.forEach(function (doc) {
                const task = doc.data();

                if (task.email != correo) {
                    const fecha = task.fechaCreacion.toDate();
                    const anio = fecha.getFullYear();
                    const mes = fecha.getMonth() + 1; 
                    const dia = fecha.getDate();
                    const hora = fecha.getHours();
                    const minutos = fecha.getMinutes();
                    const segundos = fecha.getSeconds();
                    html2 += `
                    <li class="list-group-item list-group-item-action mt-2">
                      <h5>${task.titulo}</h5>
                      <p><i>${"Creado el día "+ dia+"/"+mes+"/"+anio+" a las "+hora+":"+minutos+":"+segundos}</i></p>
                      <h6>${task.email}</h6>
                      <p>${task.descripcion}</p>
                      <div>
                        <button class="btn btn-primary btn-eliminar" data-id="">
                          Like
                        </button>
                        <button class="btn btn-secondary btn-editar" data-id="">
                          Comentar
                        </button>
                      </div>
                    </li>
                  `;
                }
            });

            contenedorTareas.html(html);
            contenedorTareasTodas.html(html2);

            //ACCION ELIMINAR

            const $btnsEliminar = $('.btn-eliminar');

            $btnsEliminar.each(function () {
                $(this).on('click', function (event) {
                    console.log("se elimino");
                    eliminarTarea($(this).data('id'));
                    console.log("paso a eliminar tareas");
                });
            });

            //ACCION EDITAR

            const btnsEditar = $(".btn-editar");
            btnsEditar.each(function () {
                $(this).on('click', async function (event) {
                    const doc = await obtenerTarea($(this).data("id"));
                    const tarea = doc.data();
                    const taskForm2 = $("#form-tareas");
                    taskForm2.find('#titulo-tarea').val(tarea.titulo);
                    taskForm2.find('#descripcion-tareas').val(tarea.descripcion);
                    estadoEditar = true;
                    id = doc.id;
                    taskForm2.find('#btn-task-form').text('Update');
                });
            });
        });

        const contenedorTareas = $("#contenedor-tareas-mias");
        const contenedorTareasTodas = $("#contenedor-tareas-todas");
    }
    else {
        console.log("sin sesion")

        const contenedorTareas = $("#contenedor-tareas-mias");
        const contenedorTareasTodas = $("#contenedor-tareas-todas");
        contenedorTareas.html('<h3 class ="text-white">Inicia sesion para ver tus publicaciones :)</h3>');
        contenedorTareasTodas.html('');

        verificarSesion(user);
    }
});

formTareas.submit(function (e) {
    e.preventDefault();

    var tituloF = formTareas.find("#titulo-tarea").val();
    var descripcionF = formTareas.find("#descripcion-tareas").val();
    var fechaCreacionF = new Date();
    console.log(tituloF)
    console.log(descripcionF)

    if (userGlobal) {
        if (estadoEditar) {
            actualizarTarea(id, {
                titulo: tituloF,
                descripcion: descripcionF,
                email: userGlobal.email
            });
            estadoEditar = false;
            id = "";
            formTareas.find('#btn-task-form').text('Guardar');
        }
        else {
            guardarTarea(tituloF, descripcionF, userGlobal.email, fechaCreacionF);
            mostrarMensaje("¡Nueva publicación creada!");
        }
        formTareas.trigger('reset');
    }
});
