const contenido = $(".contenido");
export function mostrarContenido(){
    contenido.html('<h4 class = "text-white">MOSTRANDO CONTENIDO !!</h4>');

};

export function mostrarContenidoVacio(){
    contenido.html('<h4 class = "text-white">TIENES QUE INICIAR SESION PARA VER !!</h4>');
};