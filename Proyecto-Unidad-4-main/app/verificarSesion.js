const botonesSesionCerrada = $(".sesionCerrada");
const botonesSesionIniciada = $(".sesionIniciada");
const inputsSesionIniciada =$(".card");
const publicaciones = $(".publicaciones");




export function verificarSesion(user){
    if(user){
        botonesSesionIniciada.css("display", "block");
        botonesSesionCerrada.css("display", "none");
        inputsSesionIniciada.css("display","block");
        publicaciones.css("display","block");
        
       
        
    }
    else{
        botonesSesionIniciada.css("display", "none");
        botonesSesionCerrada.css("display", "block");
        inputsSesionIniciada.css("display","none");
        publicaciones.css("display","none");
        
        
    }
}