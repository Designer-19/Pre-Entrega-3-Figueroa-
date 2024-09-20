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
const cerveza = new Bebida("Cerveza", 7000);
const agua = new Bebida("Agua", 3500);
const caipiFrutosRojos = new Bebida("Caipi Frutos Rojos", 10000);
const caipiMaracuya = new Bebida("Caipi Maracuya", 10000);
const caipiAbsolut = new Bebida("Caipi Absolut", 10000);
const caipiSmirnoff = new Bebida("Caipi Smirnoff", 10000);
const fernetConCoca = new Bebida("Fernet con Coca", 8500);
const vodkaConSpeed = new Bebida("Vodka con Speed", 6790);
const botellaDeFernet = new Bebida("Botella de Fernet", 90000);
const caipiroskaAbsolutConMaracuya = new Bebida("Caipiroska Absolut con Maracuya", 14000);
const caipiroskaAbsolutConFrutosRojos = new Bebida("Caipiroska Absolut con Frutos Rojos", 14000);
const caipiroskaAbsolut = new Bebida("Caipiroska Absolut", 14000);
const caipiroskaSmirnoff = new Bebida("Caipiroska Smirnoff", 14000);

// Array con los objetos de bebidas
const bebidas = [
    cerveza, agua, caipiFrutosRojos, caipiMaracuya, caipiAbsolut, caipiSmirnoff, 
    fernetConCoca, vodkaConSpeed, botellaDeFernet, caipiroskaAbsolutConMaracuya, 
    caipiroskaAbsolutConFrutosRojos, caipiroskaAbsolut, caipiroskaSmirnoff
];

// Función para validar el número de la bebida seleccionada
function validarSeleccion(seleccion, max) {
    return !isNaN(seleccion) && seleccion > 0 && seleccion <= max;
}

// Función para filtrar todas las bebidas que son caipis
function filtrarCaipis() {
    const caipis = bebidas.filter(bebida => bebida.nombre.toLowerCase().includes("caipi") && !bebida.nombre.toLowerCase().includes("caipiroska"));
    console.log("Sabores de Caipi disponibles:");
    caipis.forEach(caipi => {
        console.log(`${caipi.nombre}: $${caipi.precio}`);
    });
}

// Función para filtrar todas las bebidas que son caipiroskas
function filtrarCaipiroskas() {
    const caipiroskas = bebidas.filter(bebida => bebida.nombre.toLowerCase().includes("caipiroska"));
    console.log("Sabores de Caipiroska disponibles:");
    caipiroskas.forEach(caipiroska => {
        console.log(`${caipiroska.nombre}: $${caipiroska.precio}`);
    });
}

// Función que muestra los sabores según la elección del usuario
function mostrarSabores() {
    let inputUsuario = prompt("¿Qué querés ver, caipi o caipiroska?").toLowerCase();
    
    if (inputUsuario === "caipi") {
        alert("Mostrando sabores de Caipi. Mira la consola para los detalles.");
        filtrarCaipis(); // Muestra sabores de caipi en la consola
    } else if (inputUsuario === "caipiroska") {
        alert("Mostrando sabores de Caipiroska. Mira la consola para los detalles.");
        filtrarCaipiroskas(); // Muestra sabores de caipiroska en la consola
    } else {
        alert("Opción no válida. Por favor ingresa 'caipi' o 'caipiroska'.");
    }
}

// Función para calcular el total de entradas
function totalEntrada(cantidadEntradas) {
    return cantidadEntradas * precioEntrada;
}

// Función para seleccionar bebidas y calcular el total
function seleccionarBebida() {
    let totalBebidas = 0;
    let continuar = true;
    let resumenBebidas = "";

    while (continuar) {
        let mensajeBebidas = "Selecciona una bebida:\n";
        bebidas.forEach((bebida, index) => {
            mensajeBebidas += `${index + 1}. ${bebida.nombre} - $${bebida.precio}\n`;
        });
        
        let seleccion = parseInt(prompt(mensajeBebidas)) - 1;
        if (validarSeleccion(seleccion + 1, bebidas.length)) {
            let cantidad = parseInt(prompt(`¿Cuántas ${bebidas[seleccion].nombre} querés?`)) || 0;
            totalBebidas += bebidas[seleccion].precio * cantidad;
            resumenBebidas += `${cantidad}x ${bebidas[seleccion].nombre} - $${bebidas[seleccion].precio * cantidad}\n`;
        } else {
            alert("Selección no válida.");
        }

        continuar = prompt("¿Querés agregar otra bebida? (si/no)").toLowerCase() === "si";
    }

    alert(`Resumen de bebidas seleccionadas:\n${resumenBebidas}`);
    return totalBebidas;
}

// Función para mostrar/ocultar el menú de mesa VIP según la selección del usuario
function manejarSeleccionVIP() {
    const mesaVipSelect = document.getElementById('mesa-vip');
    const vipSection = document.getElementById('vip-section');
    
    if (mesaVipSelect && vipSection) {
        const seleccionVIP = mesaVipSelect.value;
        if (seleccionVIP === 'si') {
            vipSection.style.display = 'block'; // Mostrar la sección de VIP
        } else {
            vipSection.style.display = 'none'; // Ocultar la sección de VIP
        }
    } else {
        console.error("Elementos del DOM para mesa VIP no encontrados.");
    }
}

// Función para calcular el costo de la mesa VIP
function calcularMesaVIP() {
    const mesaVipSelect = document.getElementById('mesa-vip');
    const cantidadPersonasVIPInput = document.getElementById('cantidad-personas-vip');
    let totalMesaVIP = 0;

    if (mesaVipSelect && cantidadPersonasVIPInput) {
        const seleccionVIP = mesaVipSelect.value;
        if (seleccionVIP === 'si') {
            const cantidadPersonasVIP = parseInt(cantidadPersonasVIPInput.value) || 0;
            
            if (cantidadPersonasVIP > 0 && cantidadPersonasVIP <= 12) {
                totalMesaVIP = 150000; // Precio fijo de mesa VIP
            } else {
                alert("Por favor selecciona una cantidad válida de personas para la mesa VIP.");
            }
        }
    } else {
        console.error("Elementos del DOM para mesa VIP no encontrados.");
    }

    return totalMesaVIP;
}

// Nueva función para calcular el total
function calcularTotal() {
    const cantidadEntradasInput = document.getElementById('cantidad-entradas');
    const cantidadEntradas = parseInt(cantidadEntradasInput.value) || 0;
    const totalEntradasHTML = totalEntrada(cantidadEntradas);
    
    // Calcular el total de bebidas
    const totalBebidasHTML = seleccionarBebida();
    const totalMesaVIPHTML = calcularMesaVIP();
    const totalFinalHTML = totalEntradasHTML + totalBebidasHTML + totalMesaVIPHTML;

    // Mostrar el total a pagar en la página
    const resultadoEntradas = document.getElementById('resultado-entradas');
    const resultadoBebidas = document.getElementById('resultado-bebidas');
    const resultadoMesaVIP = document.getElementById('resultado-mesa-vip');
    const resultadoTotal = document.getElementById('resultado-total');
    const tablaDatos = document.getElementById('tabla-datos').getElementsByTagName('tbody')[0];
    
    // Limpiar tabla antes de llenarla
    tablaDatos.innerHTML = '';

    // Agregar entradas a la tabla
    const filaEntradas = tablaDatos.insertRow();
    filaEntradas.insertCell(0).textContent = 'Entradas';
    filaEntradas.insertCell(1).textContent = cantidadEntradas;
    filaEntradas.insertCell(2).textContent = `$${precioEntrada}`;
    filaEntradas.insertCell(3).textContent = `$${totalEntradasHTML}`;

    // Agregar bebidas a la tabla (modificar según la implementación de seleccionarBebida)
    const totalBebidas = seleccionarBebida();
    // Lógica para agregar cada bebida a la tabla...
    // Puedes modificar la función seleccionarBebida para que devuelva un resumen de las bebidas seleccionadas.

    // Agregar mesa VIP a la tabla
    if (totalMesaVIPHTML > 0) {
        const filaMesaVIP = tablaDatos.insertRow();
        filaMesaVIP.insertCell(0).textContent = 'Mesa VIP';
        filaMesaVIP.insertCell(1).textContent = document.getElementById('cantidad-personas-vip').value || 0;
        filaMesaVIP.insertCell(2).textContent = '$156,000';
        filaMesaVIP.insertCell(3).textContent = `$${totalMesaVIPHTML}`;
    }

    // Total final
    const filaTotal = tablaDatos.insertRow();
    filaTotal.insertCell(0).textContent = 'Total Final';
    filaTotal.insertCell(1).textContent = '';
    filaTotal.insertCell(2).textContent = '';
    filaTotal.insertCell(3).textContent = `$${totalFinalHTML}`;

    // Mostrar el total a pagar en la página
    resultadoEntradas.textContent = `Total a pagar por las entradas: $${totalEntradasHTML}`;
    resultadoBebidas.textContent = `Total a pagar por las bebidas: $${totalBebidasHTML}`;
    resultadoMesaVIP.textContent = `Total a pagar por la mesa VIP: $${totalMesaVIPHTML}`;
    resultadoTotal.textContent = `El total a pagar por entradas, bebidas y mesa VIP es: $${totalFinalHTML}`;

    // Mostrar detalles en un alert
    alert(`Detalles de la selección:\n` +
          `Cantidad de entradas: ${cantidadEntradas}\n` +
          `Total a pagar por las entradas: $${totalEntradasHTML}\n` +
          `Total a pagar por las bebidas: $${totalBebidasHTML}\n` +
          `Total a pagar por la mesa VIP: $${totalMesaVIPHTML}\n` +
          `El total a pagar es: $${totalFinalHTML}`);
}

// Añadir evento para el botón de calcular
const calcularButton = document.getElementById('calcular');
if (calcularButton) {
    calcularButton.addEventListener('click', calcularTotal);
} else {
    console.error("Botón de calcular no encontrado.");
}

// Añadir evento al selector de mesa VIP para cambiar la visibilidad de la sección
const mesaVipSelect = document.getElementById('mesa-vip');
if (mesaVipSelect) {
    mesaVipSelect.addEventListener('change', manejarSeleccionVIP);
} else {
    console.error("Selector de mesa VIP no encontrado.");
}

// Llamada a la función para mostrar sabores de caipi o caipiroska
mostrarSabores();

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcular');

    // Agregar un evento click al botón
    calcularBtn.addEventListener('click', function() {
        console.log('Botón Calcular Total presionado');
    });

    // Mostrar el menú VIP si se selecciona "Sí"
    const mesaVipSelect = document.getElementById('mesa-vip');
    mesaVipSelect.addEventListener('change', function() {
        const vipSection = document.getElementById('vip-section');
        if (mesaVipSelect.value === 'si') {
            vipSection.style.display = 'block';
        } else {
            vipSection.style.display = 'none';
        }
    });
});
