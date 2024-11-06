document.addEventListener('DOMContentLoaded', function() {
    const finalizarCompraBtn = document.querySelector('button[type="submit"]');
    const popup = document.getElementById('compraExitosa');

    finalizarCompraBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validar todos los campos antes de mostrar el popup
        if (validarFormulario(e)) {
            popup.style.display = 'block';
            // Solo redirigir si la validación es exitosa
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    });
});

function validarFormulario(event) {
    event.preventDefault();

    // Obtener todos los campos requeridos
    const campos = {
        'numero-tarjeta': { valor: document.getElementById('numero-tarjeta').value.trim(), mensaje: 'Número de tarjeta requerido' },
        'fecha-vencimiento': { valor: document.getElementById('fecha-vencimiento').value.trim(), mensaje: 'Fecha de vencimiento requerida' },
        'codigo-seguridad': { valor: document.getElementById('codigo-seguridad').value.trim(), mensaje: 'Código de seguridad requerido' },
        'nombre': { valor: document.getElementById('nombre').value.trim(), mensaje: 'Nombre requerido' },
        'apellido': { valor: document.getElementById('apellido').value.trim(), mensaje: 'Apellido requerido' },
        'direccion1': { valor: document.getElementById('direccion1').value.trim(), mensaje: 'Dirección requerida' },
        'pais': { valor: document.getElementById('pais').value.trim(), mensaje: 'País requerido' },
        'codigo': { valor: document.getElementById('codigo').value.trim(), mensaje: 'Código postal requerido' }
    };

    let esValido = true;

    // Limpiar mensajes de error previos
    document.querySelectorAll('.error-mensaje').forEach(msg => msg.remove());
    document.querySelectorAll('.campo-invalido').forEach(campo => campo.classList.remove('campo-invalido'));

    // Validar que ningún campo esté vacío
    for (let id in campos) {
        const campo = document.getElementById(id);
        if (!campos[id].valor) {
            mostrarError(id, campos[id].mensaje);
            campo.classList.add('campo-invalido');
            esValido = false;
        }
    }

    // Validaciones específicas
    if (campos['numero-tarjeta'].valor && !/^\d{16}$/.test(campos['numero-tarjeta'].valor)) {
        mostrarError('numero-tarjeta', 'El número de tarjeta debe tener 16 dígitos');
        document.getElementById('numero-tarjeta').classList.add('campo-invalido');
        esValido = false;
    }

    if (campos['fecha-vencimiento'].valor && !/^\d{2}\/\d{2}$/.test(campos['fecha-vencimiento'].valor)) {
        mostrarError('fecha-vencimiento', 'Formato inválido (MM/YY)');
        document.getElementById('fecha-vencimiento').classList.add('campo-invalido');
        esValido = false;
    }

    if (campos['codigo-seguridad'].valor && !/^\d{3,4}$/.test(campos['codigo-seguridad'].valor)) {
        mostrarError('codigo-seguridad', 'El código debe tener 3 o 4 dígitos');
        document.getElementById('codigo-seguridad').classList.add('campo-invalido');
        esValido = false;
    }

    return esValido;
}

function mostrarError(elementoId, mensaje) {
    const elemento = document.getElementById(elementoId);
    const mensajeError = document.createElement('div');
    mensajeError.classList.add('error-mensaje');
    mensajeError.textContent = mensaje;
    elemento.parentNode.insertBefore(mensajeError, elemento.nextSibling);
}

// Agregar validación en tiempo real para los campos
document.addEventListener('DOMContentLoaded', function() {
    // Validar número de tarjeta (solo números)
    document.getElementById('numero-tarjeta').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d]/g, '').substring(0, 16);
        this.classList.remove('campo-invalido');
        const mensajeError = this.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('error-mensaje')) {
            mensajeError.remove();
        }
    });

    // Validar fecha de vencimiento (formato MM/YY)
    document.getElementById('fecha-vencimiento').addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value;
        this.classList.remove('campo-invalido');
        const mensajeError = this.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('error-mensaje')) {
            mensajeError.remove();
        }
    });

    // Validar código de seguridad (solo números)
    document.getElementById('codigo-seguridad').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^\d]/g, '').substring(0, 4);
        this.classList.remove('campo-invalido');
        const mensajeError = this.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains('error-mensaje')) {
            mensajeError.remove();
        }
    });
});

// Cerrar el popup si se hace clic fuera de él
window.onclick = function(event) {
    const popup = document.getElementById('compraExitosa');
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}
