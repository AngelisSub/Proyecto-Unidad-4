const botonesSesionCerrada = $(".sesionCerrada");
const botonesSesionIniciada = $(".sesionIniciada");
const inputsSesionIniciada =$(".card");


export function verificarSesion(user){
    if(user){
        botonesSesionIniciada.css("display", "block");
        botonesSesionCerrada.css("display", "none");
        inputsSesionIniciada.css("display","block");
    }
    else{
        botonesSesionIniciada.css("display", "none");
        botonesSesionCerrada.css("display", "block");
        inputsSesionIniciada.css("display","none");
    }
}