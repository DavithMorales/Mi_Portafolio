let menuVisible = false;
//Función para ocultar o mostrar menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive"
        menuVisible = true;
    }
}

function seleccionar(){
    //Oculto el menu una vez que se selecciona una opción
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
// Funcion que aplica animación de mis habilidades
function efectoHabilidad(){
    let skills = document.getElementById("skills");
    let distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("photoshop");
        habilidades[3].classList.add("SQL");
        habilidades[4].classList.add("comunicacion");
        habilidades[5].classList.add("trabajo");
        habilidades[6].classList.add("creatividad");
        habilidades[7].classList.add("dedicación");
    }
}
// se detecta el scrolling para hacer animación en la barra de habilidades
window.onscroll = function(){
    efectoHabilidad();
}

document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Limpiar estilos de error previos
    const inputs = this.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
        input.classList.remove('error');
        const value = input.value.trim();

        // Validar Nombre: sólo letras y espacios
        if (input.name === 'Nombre' && !/^[A-Za-z\s]+$/.test(value)) {
            valid = false;
            input.classList.add('error');
        }

        // Validar Teléfono: sólo números
        if (input.name === 'Teléfono' && !/^\d+$/.test(value)) {
            valid = false;
            input.classList.add('error');
        }

        // Validar Correo: formato de correo electrónico 
        if (input.name === 'Correo' && input.validity.typeMismatch) {
            valid = false;
            input.classList.add('error');
        }

        // Validar Tema: máximo 100 caracteres
        if (input.name === 'Tema' && value.length > 100) {
            valid = false;
            input.classList.add('error');
        }

        // Validar Mensaje: máximo 5000 caracteres
        if (input.name === 'Mensaje' && value.length > 5000) {
            valid = false;
            input.classList.add('error');
        }

        // Validar que no esté vacío
        if (!value) {
            valid = false;
            input.classList.add('error');
        }
    });

    if (!valid) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    try {
        const response = await fetch('https://formspree.io/f/xanwnglk', {
            method: 'POST',
            body: new FormData(this),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            // Mostrar el mensaje de éxito
            document.getElementById('success-message').style.display = 'block';
            this.reset();
            setTimeout(() => {
                document.getElementById('success-message').style.display = 'none';
            }, 5000); // Ocultar el mensaje después de 5 segundos
        } else {
            alert('Error al enviar el formulario');
        }
    } catch (error) {
        alert('Error al enviar el formulario');
    }
});