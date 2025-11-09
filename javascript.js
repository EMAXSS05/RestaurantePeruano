document.addEventListener('DOMContentLoaded', () => {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 
    });

    const elementosAObservar = document.querySelectorAll('.titulo-seccion, .sobre-contenido, .plato, .info-contacto, .form-wrapper, .galeria-item');
    elementosAObservar.forEach(el => {
        el.classList.add('fade-in'); 
        observer.observe(el);
    });
    
 
    const form = document.getElementById('contacto-form');
    
    form.addEventListener('submit', function(event) {
    
        event.preventDefault(); 
        let isValid = true;

        // Limpiar mensajes previos
        document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
        document.getElementById('mensaje-exito').style.display = 'none';

        // Validar Nombre
        const nombre = document.getElementById('nombre');
        if (nombre.value.trim().length < 2) {
            document.getElementById('error-nombre').textContent = 'El nombre debe tener al menos 2 caracteres.';
            isValid = false;
        }

        // Validar Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            document.getElementById('error-email').textContent = 'Introduce un correo electrónico válido.';
            isValid = false;
        }

        // Validar Mensaje
        const mensaje = document.getElementById('mensaje');
        if (mensaje.value.trim().length < 10) {
            document.getElementById('error-mensaje').textContent = 'El mensaje es demasiado corto (mínimo 10 caracteres).';
            isValid = false;
        }

        // Si es válido, enviamos el formulario a Netlify
        if (isValid) {
            // Mostrar mensaje de éxito temporal
            const mensajeExito = document.getElementById('mensaje-exito');
            mensajeExito.textContent = '¡Mensaje enviado con éxito! Procesando...';
            mensajeExito.style.display = 'block';
            
            //Re-ejecuta el envío del formulario a Netlify
            event.target.submit(); 
            
            
        }
    });
});