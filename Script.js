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

// Función principal para calcular y mostrar el total
function calcularTotal() {
    const cantidadEntradas = parseInt(document.getElementById('cantidad-entradas').value) || 0;
    const totalEntradasHTML = totalEntrada(cantidadEntradas);

    // Calcular el total de bebidas
    const totalBebidasHTML = seleccionarBebida();
    const totalFinalHTML = totalEntradasHTML + totalBebidasHTML;

    // Mostrar el total a pagar en la página
    document.getElementById('resultado-entradas').textContent = `Total a pagar por las entradas: $${totalEntradasHTML}`;
    document.getElementById('resultado-bebidas').textContent = `Total a pagar por las bebidas: $${totalBebidasHTML}`;
    document.getElementById('resultado-total').textContent = `El total a pagar por entradas y bebidas es: $${totalFinalHTML}`;

    // Mostrar detalles en un alert
    alert(`Detalles de la selección:\n` +
          `Cantidad de entradas: ${cantidadEntradas}\n` +
          `Total a pagar por las entradas: $${totalEntradasHTML}\n` +
          `Total a pagar por las bebidas: $${totalBebidasHTML}\n` +
          `El total a pagar por entradas y bebidas es: $${totalFinalHTML}`);
}

// Añadir evento para el botón de calcular
document.getElementById('calcular').addEventListener('click', calcularTotal);

// Llamada a la función para mostrar sabores de caipi o caipiroska
mostrarSabores();