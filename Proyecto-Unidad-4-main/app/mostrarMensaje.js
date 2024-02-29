export function mostrarMensaje(message, type = "success"){
    Toastify({
        text: message,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
            background: type === "success" ? "green" : "red",  
          },

    }).showToast();
}