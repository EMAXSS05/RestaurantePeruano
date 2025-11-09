document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------------------
    // 1. EFECTO VISUAL: Aparición de elementos al hacer Scroll (Intersection Observer)
    // -----------------------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Cuando el elemento es visible
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que ha aparecido
                observer.unobserve(entry.target); 
            }
        });
    }, {
        // Se activa cuando el 10% del elemento está visible
        threshold: 0.1 
    });

    // Observar elementos clave
    const elementosAObservar = document.querySelectorAll('.titulo-seccion, .sobre-contenido, .plato, .info-contacto, .form-wrapper, .galeria-item');
    elementosAObservar.forEach(el => {
        // Añadir una clase de inicio para animar
        el.classList.add('fade-in'); 
        observer.observe(el);
    });
    
    // -----------------------------------------------------------------
    // 2. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // -----------------------------------------------------------------
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

        // Si es válido, simular el envío
        if (isValid) {
            // Mostrar mensaje de éxito
            const mensajeExito = document.getElementById('mensaje-exito');
            mensajeExito.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
            mensajeExito.style.display = 'block';
            
            // Limpiar el formulario
            form.reset();
        }
    });
});