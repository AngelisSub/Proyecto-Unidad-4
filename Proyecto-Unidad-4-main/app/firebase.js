import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc, getDoc, query, where} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyApmAsQ-TT2RWpElC_LHE8LKVEF6R9fj78",
  authDomain: "unidad-4-d93b9.firebaseapp.com",
  projectId: "unidad-4-d93b9",
  storageBucket: "unidad-4-d93b9.appspot.com",
  messagingSenderId: "86555075860",
  appId: "1:86555075860:web:26b03d3dbbbc0d0bcbce01",
  measurementId: "G-HFDWJ7XB66"
};


  export const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  
  
  export const db = getFirestore();

  export function guardarTarea(titulo, descripcion, email, fechaCreacion, cantComentarios, cantLikes, personasLiked){
    addDoc(collection(db, "tareas"),{ titulo, descripcion, email, fechaCreacion, cantComentarios, cantLikes, personasLiked});
  }

  export function obtenerTareas(){
    return getDocs(collection(db, 'tareas'));
  }

  export function actulizarObtenerTareas(callback){
    return onSnapshot(collection(db, "tareas"), callback);
  }

  export function eliminarTarea(id){
    console.log("llego a eliminar tareas");
    return deleteDoc(doc(db, "tareas", id));
  }

  export function obtenerTarea(id){
    return getDoc(doc(db, "tareas",id));
  }

  export function actualizarTarea(id, nuevosCampos){
    return updateDoc(doc(db, "tareas", id),nuevosCampos);
  }

  //perfiles
  export function guardarPerfil(nombres, apellidos, edad, sexo, email){
    addDoc(collection(db, "perfiles"), { nombres, apellidos, edad, sexo, email });
  }

  export async function obtenerPerfil(email){
    const cadenaDeBusqueda = query( collection(db, "perfiles"), where("email", "==", email));
    const documentosEncontrados = await getDocs(cadenaDeBusqueda);
    return documentosEncontrados.docs[0].data();
  }

  //comentarios
  export function guardarComentario(texto, fechaCreacion,idTarea,email){
    addDoc(collection(db, "comentarios"),{texto, fechaCreacion, idTarea, email});
  }

  export async function obtenerComentarios(idTarea){
    const cadenaDeBusqueda = query(collection(db, "comentarios"), where("idTarea", "==", idTarea));
    const documentosEncontrados = await getDocs(cadenaDeBusqueda);
    
    return documentosEncontrados.docs.map(doc => doc.data());
    console.log("hff")
  }
  