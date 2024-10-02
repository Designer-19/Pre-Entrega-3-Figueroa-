// Simulador Boliche

// Precio de entrada por persona
const precioEntrada = 9000;

// Clase Bebida con constructor
class Bebida {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Crear bebidas usando el constructor de la clase Bebida
const bebidas = [
    new Bebida("Cerveza", 7000),
    new Bebida("Agua", 3500),
    new Bebida("Caipi Frutos Rojos", 10000),
    new Bebida("Caipi Maracuya", 10000),
    new Bebida("Caipi Absolut", 10000),
    new Bebida("Caipi Smirnoff", 10000),
    new Bebida("Fernet con Coca", 8500),
    new Bebida("Vodka con Speed", 6790),
    new Bebida("Botella de Fernet", 90000),
    new Bebida("Caipiroska Absolut con Maracuya", 14000),
    new Bebida("Caipiroska Absolut con Frutos Rojos", 14000),
    new Bebida("Caipiroska Absolut", 14000),
    new Bebida("Caipiroska Smirnoff", 14000)
];

// Función para validar el número de la bebida seleccionada
function validarSeleccion(seleccion, max) {
    return !isNaN(seleccion) && seleccion > 0 && seleccion <= max;
}

// Función para encontrar una bebida específica usando find()
function encontrarBebida(nombre) {
    return bebidas.find(bebida => bebida.nombre.toLowerCase() === nombre.toLowerCase());
}

// Función para calcular el total de bebidas seleccionadas
function calcularTotalBebidas(bebidasSeleccionadas) {
    return bebidasSeleccionadas.reduce((total, bebidaSeleccionada) => {
        let bebida = encontrarBebida(bebidaSeleccionada.nombre);
        if (bebida) {
            return total + (bebida.precio * bebidaSeleccionada.cantidad);
        } else {
            console.warn(`Bebida no encontrada: ${bebidaSeleccionada.nombre}`);
            return total;
        }
    }, 0);
}

// Función para seleccionar bebidas
function seleccionarBebidas() {
    const bebidaSeleccionada = document.getElementById('bebida').value;
    const cantidadBebidas = parseInt(document.getElementById('cantidad-bebidas').value);

    if (bebidaSeleccionada && !isNaN(cantidadBebidas) && cantidadBebidas > 0) {
        const bebidaInfo = document.getElementById('resultado-bebidas');
        bebidaInfo.textContent = `Has seleccionado ${cantidadBebidas} ${bebidaSeleccionada}`;
        return [{ nombre: bebidaSeleccionada, cantidad: cantidadBebidas }];
    } else {
        document.getElementById('mensaje-error').textContent = "Por favor, selecciona una bebida y la cantidad.";
        return [];
    }
}

// Función para calcular el total de entradas
function totalEntrada(cantidadEntradas) {
    return cantidadEntradas * precioEntrada;
}

// Función para calcular el costo de las mesas VIP
function calcularMesasVIP() {
    const cantidadMesasVIPInput = document.getElementById('cantidad-mesas-vip');
    let totalMesasVIP = 0;

    if (cantidadMesasVIPInput) {
        const cantidadMesasVIP = parseInt(cantidadMesasVIPInput.value) || 0;

        if (cantidadMesasVIP > 0) {
            totalMesasVIP = cantidadMesasVIP * 156000; // Precio por mesa VIP
        } else {
            document.getElementById('mensaje-error-vip').textContent = "Por favor selecciona una cantidad válida de mesas VIP.";
        }
    } else {
        console.error("Elemento del DOM para mesa VIP no encontrado.");
    }

    return totalMesasVIP;
}

// Función para manejar la selección de mesas VIP
function manejarSeleccionVIP() {
    const mesaVIP = document.getElementById("mesa-vip").value;
    const vipSection = document.getElementById("vip-section");

    if (mesaVIP === "si") {
        vipSection.style.display = "block"; // Mostrar sección VIP
    } else {
        vipSection.style.display = "none"; // Ocultar sección VIP
    }
}

// Función principal para calcular y mostrar el total
function calcularTotal() {
    const cantidadEntradasInput = document.getElementById('cantidad-entradas');
    const cantidadEntradas = parseInt(cantidadEntradasInput.value) || 0;
    
    if (cantidadEntradas <= 0) {
        document.getElementById('mensaje-error').textContent = "Por favor, selecciona al menos una entrada.";
        return;
    }

    const totalEntradasHTML = totalEntrada(cantidadEntradas);

    const bebidasSeleccionadas = seleccionarBebidas();
    const totalBebidasHTML = calcularTotalBebidas(bebidasSeleccionadas);
    const totalMesasVIPHTML = calcularMesasVIP();
    const totalFinalHTML = totalEntradasHTML + totalBebidasHTML + (document.getElementById('mesa-vip').value === "si" ? totalMesasVIPHTML : 0);

    const resultadoEntradas = document.getElementById('resultado-entradas');
    const resultadoBebidas = document.getElementById('resultado-bebidas');
    const resultadoMesaVIP = document.getElementById('resultado-mesa-vip');
    const resultadoTotal = document.getElementById('resultado-total');
    const tablaDatos = document.querySelector('#tabla-datos tbody');
    const tablaNombreApellido = document.querySelector('#tabla-nombre-apellido tbody');

    tablaDatos.innerHTML = '';
    tablaNombreApellido.innerHTML = '';

    const nombreInput = document.getElementById('nombre').value;
    const apellidoInput = document.getElementById('apellido').value;

    const filaNombre = tablaNombreApellido.insertRow();
    filaNombre.insertCell().textContent = "Nombre";
    filaNombre.insertCell().textContent = nombreInput;

    const filaApellido = tablaNombreApellido.insertRow();
    filaApellido.insertCell().textContent = "Apellido";
    filaApellido.insertCell().textContent = apellidoInput;

    const filaEntradas = tablaDatos.insertRow();
    filaEntradas.insertCell().textContent = "Entradas";
    filaEntradas.insertCell().textContent = cantidadEntradas;
    filaEntradas.insertCell().textContent = `$${precioEntrada}`;
    filaEntradas.insertCell().textContent = `$${totalEntradasHTML}`;

    for (const bebidaSeleccionada of bebidasSeleccionadas) {
        const bebida = encontrarBebida(bebidaSeleccionada.nombre);
        const filaBebidas = tablaDatos.insertRow();
        filaBebidas.insertCell().textContent = bebida.nombre;
        filaBebidas.insertCell().textContent = bebidaSeleccionada.cantidad;
        filaBebidas.insertCell().textContent = `$${bebida.precio}`;
        filaBebidas.insertCell().textContent = `$${bebida.precio * bebidaSeleccionada.cantidad}`;
    }

    // Verificar si el usuario seleccionó la opción de mesas VIP
    const mesaVIP = document.getElementById("mesa-vip").value;
    if (mesaVIP === "si") {
        const filaVIP = tablaDatos.insertRow();
        const cantidadMesasVIP = parseInt(document.getElementById('cantidad-mesas-vip').value) || 0;
        filaVIP.insertCell().textContent = "Mesas VIP";
        filaVIP.insertCell().textContent = cantidadMesasVIP > 0 ? cantidadMesasVIP : '0';
        filaVIP.insertCell().textContent = `$156000`;
        filaVIP.insertCell().textContent = `$${totalMesasVIPHTML}`;
    }

    const filaTotal = tablaDatos.insertRow();
    filaTotal.insertCell().textContent = "Total";
    filaTotal.insertCell().textContent = '';
    filaTotal.insertCell().textContent = '';
    filaTotal.insertCell().textContent = `$${totalFinalHTML}`;

    resultadoEntradas.textContent = `Total Entradas: $${totalEntradasHTML}`;
    resultadoBebidas.textContent = `Total Bebidas: $${totalBebidasHTML}`;
    resultadoMesaVIP.textContent = mesaVIP === "si" ? `Total Mesas VIP: $${totalMesasVIPHTML}` : '';
    resultadoTotal.textContent = `Total Final: $${totalFinalHTML}`;

    // Guardar datos en localStorage
    try {
        localStorage.setItem('datosBoliche', JSON.stringify({
            entradas: cantidadEntradas,
            bebidas: bebidasSeleccionadas,
            mesasVIP: mesaVIP === "si" ? cantidadMesasVIP : 0,
            total: totalFinalHTML,
            nombre: nombreInput,
            apellido: apellidoInput
        }));
    } catch (e) {
        console.error("Error guardando en localStorage", e);
    }
}

// Función para recuperar datos del localStorage
function recuperarDatos() {
    const datosGuardados = JSON.parse(localStorage.getItem('datosBoliche'));
    if (datosGuardados) {
        document.getElementById('cantidad-entradas').value = datosGuardados.entradas;
        document.getElementById('nombre').value = datosGuardados.nombre;
        document.getElementById('apellido').value = datosGuardados.apellido;

        document.getElementById('cantidad-mesas-vip').value = datosGuardados.mesasVIP;

        if (datosGuardados.bebidas.length > 0) {
            document.getElementById('bebida').value = datosGuardados.bebidas[0].nombre;
            document.getElementById('cantidad-bebidas').value = datosGuardados.bebidas[0].cantidad;
        }

        calcularTotal(); // Volver a calcular total basado en datos recuperados
    }
}

// Llamar a recuperarDatos cuando se carga la página
window.onload = recuperarDatos;
