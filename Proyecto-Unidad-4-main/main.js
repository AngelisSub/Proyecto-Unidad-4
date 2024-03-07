import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth,actulizarObtenerTareas, eliminarTarea, actualizarTarea, obtenerTarea, obtenerPerfil } from "./app/firebase.js";

import './app/crearCuenta.js'
import './app/iniciarSesion.js'
import './app/cerrarSesion.js'
import { verificarSesion } from "./app/verificarSesion.js";
import { mostrarContenidoVacio } from "./app/mostrarContenido.js";
import { mostrarContenido } from "./app/mostrarContenido.js";

import { guardarTarea } from "./app/firebase.js";

const formTareas = $("#form-tareas");
let userGlobal;
let estadoEditar = false;
let id = '';
auth.onAuthStateChanged(async function(user){
    if(user){
        userGlobal = user;
        verificarSesion(user);
        const correo = user.email;

        actulizarObtenerTareas(querySnapshot => {
            let html = '';
            let html2 = '';

            querySnapshot.forEach(function(doc){
                const task = doc.data(); 

                if(task.email == correo){
                    
                const fecha = task.fechaCreacion.toDate();

                const anio = fecha.getFullYear();
                const mes = fecha.getMonth() + 1; // Se suma 1 ya que los meses van de 0 a 11
                const dia = fecha.getDate();
                const hora = fecha.getHours();
                const minutos = fecha.getMinutes();
                const segundos = fecha.getSeconds();

                
                    html += `
                    <li class = "list-group-item list-group-item-action mt-2">
                     <h5>${task.titulo}</h5>
                     <p>${"Publicado el día "+dia+"/"+mes+"/"+anio+" a las "+hora+":"+minutos+":"+segundos}</p>
                     <p>${task.descripcion}</p>
                     <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9p_AU3Fpv6dWk2IhzohC7Xyab9vUet69AmA&usqp=CAU"></img>
                     <div>
                     <button class = "btn btn-secondary btn-editar colorPerfil text-dark" data-id ="${doc.id}">
                     <i class="bi bi-pencil-square"></i>
                     Editar
                    </button>
                       <button class = "btn btn-primary btn-eliminar bg-celeste text-dark" data-id = "${doc.id}">
                       <i class="bi bi-trash3"></i>
                       </button>
                     </div>
                    </li>
                    `;
                }
            });

            querySnapshot.forEach(function (doc) {
                const tarea = doc.data();
        
                if (tarea.email != correo) {
                  const fecha = tarea.fechaCreacion.toDate();
                  const anio = fecha.getFullYear();
                  const mes = fecha.getMonth() + 1; // Se suma 1 ya que los meses van de 0 a 11
                  const dia = fecha.getDate();
                  const hora = fecha.getHours();
                  const minutos = fecha.getMinutes();
                  const segundos = fecha.getSeconds();
                  html2 += `
                            <li class="list-group-item list-group-item-action mt-2">
                              <div class="d-flex justify-content-between">
                                <label class="nombreUsuarios" data-id=""><b>${tarea.email}</b> publicó:</label>
                                  <button class="btn-otroPerfil btn btn-primary bi bi-person-square colorPerfil text-dark" data-id="${tarea.email}" data-bs-toggle="modal" data-bs-target="#modalPerfil"> 
                                    Ver perfil
                                  </button>
                              </div>
                              <h5>${tarea.titulo}</h5>
                              <p>${tarea.descripcion}</p>
                              <p><i>${"Publicado el día "+dia+"/"+mes+"/"+anio+" a las "+hora+":"+minutos+":"+segundos}</i></p>
                              <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9p_AU3Fpv6dWk2IhzohC7Xyab9vUet69AmA&usqp=CAU"></img>
                              <div>
                                <button class="btn btn-primary btn-like colorPerfil text-dark" data-id="">
                                <i class="bi bi-hand-thumbs-up"></i>
                                </button>
                                <button class="btn btn-secondary btn-comentar bg-celeste text-dark" data-id="">
                                  Comentar
                                </button>
                              </div>
                            </li>
                          `;
                }
              });

            contenedorTareas.html(html);
            contenedorTareasTodas.html(html2);

            const $btnsEliminar = $('.btn-eliminar');

            $btnsEliminar.each(function(){
                $(this).on('click',function(event){
                    console.log("se elimino");
                    eliminarTarea($(this).data('id')); 
                    console.log("paso a eliminar tareas");
                });
            });


            const btnsEditar = $(".btn-editar");
            btnsEditar.each(function(){
                $(this).on('click', async function(event){
                    const doc = await obtenerTarea($(this).data("id"));
                    const tarea = doc.data();
                    const taskForm2 = $("#form-tareas");
                    taskForm2.find('#titulo-tarea').val(tarea.titulo);
                    taskForm2.find('#descripcion-tareas').val(tarea.descripcion);
                    estadoEditar = true;
                    id = doc.id;
                    taskForm2.find('#btn-task-form').text('Guardar cambios');
                });
            });

            const btnsOtroPerfil = $(".btn-otroPerfil");

            btnsOtroPerfil.each(function(){
                $(this).click(async function(){
                    const perfil = await obtenerPerfil($(this).data("id"));
                    llenarModalPerfil(perfil);
                });
            });
        });
        const contenedorTareas = $("#contenedor-tareas");
        const contenedorTareasTodas = $("#contenedor-tareas-todas");
        
    }
    else{
        console.log("sin sesion")

        const contenedorTareas = $("#contenedor-tareas");
        const contenedorTareasTodas = $("#contenedor-tareas-todas");
        contenedorTareas.html('<h3 class ="text-white">Inicia sesion para ver tus publicaciones :)</h3>');
        contenedorTareasTodas.html('');
        verificarSesion(user);
    }
});

formTareas.submit(function(e){
    e.preventDefault();

    var tituloF = formTareas.find("#titulo-tarea").val();
    var descripcionF = formTareas.find("#descripcion-tareas").val();
    const fechaCreacion = new Date();
console.log(tituloF)
console.log(descripcionF)

    if(userGlobal){
        if(estadoEditar){
            actualizarTarea(id,{
                titulo: tituloF,
                descripcion: descripcionF,
                email: userGlobal.email
            });
            estadoEditar = false;
            id = "";
            formTareas.find('#btn-task-form').text('Guardar');
        }
        else{
            guardarTarea(tituloF, descripcionF, userGlobal.email, fechaCreacion);
        }
        formTareas.trigger('reset');
    }
});
const botonMiPerfil = $('#botonMiPerfil');

botonMiPerfil.click(async function(){
  const perfil = await obtenerPerfil(userGlobal.email);
  llenarModalPerfil(perfil);
});

function llenarModalPerfil(perfil){
  $("#nombresPerfil").html(perfil.nombres);
  $("#apellidosPerfil").html(perfil.apellidos);
  $("#edadPerfil").html(perfil.edad);
  $("#sexoPerfil").html(perfil.sexo);
}
