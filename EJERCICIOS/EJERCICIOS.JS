// ========== MENÚ PRINCIPAL - 14 EJERCICIOS INTEGRADOS ==========
let opc;

do {
    opc = parseInt(prompt(
        'MENÚ DE EJERCICIOS\n' +
        '1. Conversión de unidades (millas, km, metros)\n' +
        '2. Número de 6 cifras (suma, multiplicación, resta)\n' +
        '3. Aumentar un segundo a una hora\n' +
        '4. Ecuación cuadrática\n' +
        '5. Temperaturas (menor, igual, mayor que 0)\n' +
        '6. Sistema de radares (4 dígitos)\n' +
        '7. Venta de huevos\n' +
        '8. Serie X^2/2 + X^4/4 + X^6/6\n' +
        '9. Clasificar 400 personas por deporte\n' +
        '10. Validar contraseña (3 intentos)\n' +
        '11. Números pares hasta impar\n' +
        '12. Día de la semana (array)\n' +
        '13. Sumar números de un array fijo\n' +
        '14. Leer números hasta 0 o texto (pares/impares)\n' +
        '15. SALIR\n\n' +
        'Seleccione una opción:'
    ));

    switch (opc) {
        case 1: ejercicio1(); break;
        case 2: ejercicio2(); break;
        case 3: ejercicio3(); break;
        case 4: ejercicio4(); break;
        case 5: ejercicio5(); break;
        case 6: ejercicio6(); break;
        case 7: ejercicio7(); break;
        case 8: ejercicio8(); break;
        case 9: ejercicio9(); break;
        case 10: ejercicio10(); break;
        case 11: ejercicio11(); break;
        case 12: ejercicio12(); break;
        case 13: ejercicio13(); break;
        case 14: ejercicio14(); break;
        case 15: alert("Saliendo del programa..."); break;
        default: alert("Opción no válida");
    }
} while (opc != 15);


// ========== EJERCICIO 1 ==========
function ejercicio1() {
    let Unidad, cantidad, mi, km, mt;
    Unidad = parseInt(prompt('Digite 1 para Millas - 2 para kilometros - 3 para Metros'));
    cantidad = prompt('Digite la distancia');
    switch (Unidad) {
        case 1:
            km = cantidad * 1.6093;
            mt = cantidad * 1609.34;
            document.write(cantidad + ' Millas, equivalen a ' + km + ' Kilometros, y a ' + mt + ' Metros<br>');
            break;
        case 2:
            mi = cantidad * 0.621371;
            mt = cantidad * 1000;
            document.write(cantidad + ' kilometros, equivalen a ' + mi + ' millas, y a ' + mt + ' Metros<br>');
            break;
        case 3:
            km = cantidad * 1000;
            mi = cantidad * 0.000621371;
            document.write(cantidad + ' metros, equivalen a ' + km + ' kilometros, y a ' + mi + ' millas<br>');
            break;
        default:
            document.write('Valor INCORRECTO<br>');
            break;
    }
    document.write('<hr>');
}


// ========== EJERCICIO 2 ==========
function ejercicio2() {
    let num, d1, d2, d3, d4, d5, d6, coc;
    num = prompt("Digite un numero de 6 cifras");
    d6 = num % 10;
    coc = Math.trunc(num / 10);
    d5 = coc % 10;
    coc = Math.trunc(coc / 10);
    d4 = coc % 10;
    coc = Math.trunc(coc / 10);
    d3 = coc % 10;
    coc = Math.trunc(coc / 10);
    d2 = coc % 10;
    coc = Math.trunc(coc / 10);
    d1 = coc % 10;
    coc = Math.trunc(coc / 10);
    
    document.write("Cifras invertidas: " + d6 + " " + d5 + " " + d4 + " " + d3 + " " + d2 + " " + d1 + "<br>");
    document.write("La suma de las cifras centrales es: " + (d3 + d4) + "<br>");
    document.write("El resultado de la multiplicacion es: " + (d1 * d6) + "<br>");
    document.write("La resta es: " + (d5 - d2) + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 3 ==========
function ejercicio3() {
    let hh, mm, ss;

    hh = parseInt(prompt("Digite la hora"));
    mm = parseInt(prompt("Digite los minutos"));
    ss = parseInt(prompt("Digite los segundos"));

    ss = ss + 1;

    if (ss == 60) {
        ss = 0;
        mm = mm + 1;
    }

    if (mm == 60) {
        mm = 0;
        hh = hh + 1;
    }

    if (hh == 24) {
        hh = 0;
    }

    document.write("La nueva hora es: " + hh + ":" + mm + ":" + ss + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 4 ==========
function ejercicio4() {
    let a, b, c, discriminante, x1, x2;

    a = parseInt(prompt("Digite el valor de a"));
    b = parseInt(prompt("Digite el valor de b"));
    c = parseInt(prompt("Digite el valor de c"));

    discriminante = (b * b) - (4 * a * c);

    document.write("El discriminante es: " + discriminante + "<br>");

    if (discriminante > 0) {
        x1 = (-b + Math.sqrt(discriminante)) / (2 * a);
        x2 = (-b - Math.sqrt(discriminante)) / (2 * a);
        document.write("Hay dos soluciones reales <br>");
        document.write("x1: " + x1 + "<br>");
        document.write("x2: " + x2 + "<br>");
    }
    else if (discriminante == 0) {
        x1 = (-b) / (2 * a);
        document.write("Hay una sola solución real <br>");
        document.write("x: " + x1 + "<br>");
    }
    else {
        let parteReal = (-b) / (2 * a);
        let parteImaginaria = Math.sqrt(-discriminante) / (2 * a);
        document.write("Hay dos soluciones imaginarias <br>");
        document.write("x1: " + parteReal + " + " + parteImaginaria + "i<br>");
        document.write("x2: " + parteReal + " - " + parteImaginaria + "i<br>");
    }
    document.write('<hr>');
}


// ========== EJERCICIO 5 ==========
function ejercicio5() {
    let temperatura = 0;
    let menores = 0;
    let iguales = 0;
    let mayores = 0;

    let datos = [];
    let input;
    
    while (true) {
        input = prompt("Ingrese una temperatura (99 o -99 para terminar):");
        if (input === null) break;
        let valor = Number(input);
        datos.push(valor);
        if (valor === 99 || valor === -99) break;
    }
    
    let i = 0;
    while (datos[i] != 99 && datos[i] != -99) {
        temperatura = datos[i];
        if (temperatura < 0) menores++;
        if (temperatura == 0) iguales++;
        if (temperatura > 0) mayores++;
        i++;
    }

    document.write("Menores que 0: " + menores + "<br>" +
                   "Iguales a 0: " + iguales + "<br>" +
                   "Mayores que 0: " + mayores + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 6 ==========
function ejercicio6() {
    let numero = prompt("Ingrese un número de 4 dígitos");

    let d1 = parseInt(numero[0]);
    let d2 = parseInt(numero[1]);
    let d3 = parseInt(numero[2]);
    let d4 = parseInt(numero[3]);

    if (d1 % 2 == 0) {
        document.write("Hay aeronave <br>");
    }
    else {
        document.write("No hay aeronave <br>");
    }

    switch (d2) {
        case 1:
            document.write("Avión militar <br>");
            break;
        case 2:
            document.write("Avión civil de carga <br>");
            break;
        case 3:
            document.write("Avión civil de pasajeros <br>");
            break;
        case 4:
            document.write("Aeronave sin permiso <br>");
            break;
        case 5:
            document.write("Aeronave de supertransporte <br>");
            break;
        case 6:
            document.write("Aeronave enemiga <br>");
            break;
        case 7:
            document.write("Avión mixto <br>");
            break;
        case 8:
            document.write("Helicóptero <br>");
            break;
        case 9:
            document.write("Globo aerostático <br>");
            break;
        case 0:
            document.write("Dirigible <br>");
            break;
    }

    document.write("Distancia: " + d3 + " km <br>");

    if (d4 == 0 || d4 == 1) {
        document.write("Dirección: Norte<br>");
    }
    else if (d4 == 2 || d4 == 3) {
        document.write("Dirección: Sur<br>");
    }
    else if (d4 == 4 || d4 == 5) {
        document.write("Dirección: Oriente<br>");
    }
    else if (d4 == 6 || d4 == 7) {
        document.write("Dirección: Occidente<br>");
    }
    else {
        document.write("Dirección: Desconocida<br>");
    }
    document.write('<hr>');
}


// ========== EJERCICIO 7 ==========
function ejercicio7() {
    let tipo, cantidad, esFrecuente, dia;
    let precioUnitario, subtotal, descuentoCant, total;

    tipo = prompt("Ingrese el tipo de huevo (A, AA o AAA):").toUpperCase();
    cantidad = parseInt(prompt("Ingrese la cantidad de huevos:"));
    esFrecuente = prompt("¿Es cliente frecuente? (si/no):").toLowerCase();
    dia = prompt("Ingrese el día de la compra (lunes, martes, miercoles, jueves, viernes, sabado, domingo):").toLowerCase();

    switch (tipo) {
        case "A":
            precioUnitario = 600;
            break;
        case "AA":
            precioUnitario = 700;
            break;
        case "AAA":
            precioUnitario = 750;
            break;
        default:
            document.write("Tipo de huevo no válido. Se asume tipo A.<br>");
            precioUnitario = 600;
    }

    subtotal = cantidad * precioUnitario;

    if (cantidad >= 30 && cantidad <= 45) {
        descuentoCant = 0.10;
    } else if (cantidad >= 46 && cantidad <= 70) {
        descuentoCant = 0.15;
    } else if (cantidad >= 71 && cantidad <= 100) {
        descuentoCant = 0.20;
    } else if (cantidad > 100) {
        descuentoCant = 0.25;
    } else {
        descuentoCant = 0;
    }
    total = subtotal * (1 - descuentoCant);

    if (esFrecuente === "si" || esFrecuente === "sí") {
        total = total * 0.975;
    }

    switch (dia) {
        case "lunes":
        case "martes":
        case "miercoles":
        case "jueves":
        case "viernes":
            total = total * 1.05;
            break;
        case "sabado":
            total = total * 0.95;
            break;
        case "domingo":
            break;
        default:
            document.write("Día no reconocido. No se aplica ajuste.<br>");
    }

    document.write("Total a pagar: $" + total.toFixed(0) + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 8 ==========
function ejercicio8() {
    let x, n, suma, termino;

    x = parseInt(prompt("Digite el valor de X"));
    n = parseInt(prompt("Digite el valor de N"));

    suma = 0;

    for (let i = 2; i <= n; i = i + 2) {
        termino = Math.pow(x, i) / i;
        suma = suma + termino;
    }

    document.write("La suma de la serie es: " + suma + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 9 ==========
function ejercicio9() {
    let deporte;
    let ajedrez = 0;
    let atletismo = 0;
    let futbol = 0;
    let gimnasia = 0;
    let natacion = 0;

    for (let i = 1; i <= 400; i++) {
        deporte = parseInt(prompt(
            "Persona " + i +
            "\n1. Ajedrez" +
            "\n2. Atletismo" +
            "\n3. Fútbol" +
            "\n4. Gimnasia" +
            "\n5. Natación"
        ));

        switch (deporte) {
            case 1:
                ajedrez++;
                break;
            case 2:
                atletismo++;
                break;
            case 3:
                futbol++;
                break;
            case 4:
                gimnasia++;
                break;
            case 5:
                natacion++;
                break;
            default:
                document.write("Opción incorrecta <br>");
                break;
        }
    }

    document.write("Ajedrez: " + ajedrez + "<br>");
    document.write("Atletismo: " + atletismo + "<br>");
    document.write("Fútbol: " + futbol + "<br>");
    document.write("Gimnasia: " + gimnasia + "<br>");
    document.write("Natación: " + natacion + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 10 ==========
function ejercicio10() {
    let claveCorrecta = "1234";
    let claveIngresada;
    let intentos = 0;
    let acceso = false;

    while (intentos < 3 && acceso == false) {
        claveIngresada = prompt("Ingrese su contraseña (Intento " + (intentos + 1) + " de 3):");
        intentos++;

        if (claveIngresada === claveCorrecta) {
            document.write("Acceso concedido<br>");
            acceso = true;
        } else {
            document.write("Intento " + intentos + ": Acceso Denegado<br>");
        }
    }

    if (acceso == false) {
        document.write("Alerta, intruso<br>");
    }
    document.write('<hr>');
}


// ========== EJERCICIO 11 ==========
function ejercicio11() {
    let numero;
    let contador = 0;

    do {
        numero = parseInt(prompt("Ingrese un número par (si ingresa uno impar, el programa termina):"));

        if (numero % 2 == 0) {
            contador++;
        }

    } while (numero % 2 == 0);

    document.write("Cantidad de números pares ingresados: " + contador + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 12 ==========
function ejercicio12() {
    let dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
    let numero = parseInt(prompt("Digite un número entre 1 y 7:"));

    if (numero >= 1 && numero <= 7) {
        document.write("El día es: " + dias[numero - 1] + "<br>");
    } else {
        document.write("Error: Debe ingresar un número entre 1 y 7.<br>");
    }
    document.write('<hr>');
}


// ========== EJERCICIO 13 ==========
function ejercicio13() {
    let numeros = [5, 10, 15, 20, 25, 30];
    let suma = 0;
    let i = 0;

    while (i < numeros.length) {
        suma = suma + numeros[i];
        i = i + 1;
    }

    document.write("La suma de los números del array es: " + suma + "<br>");
    document.write('<hr>');
}


// ========== EJERCICIO 14 ==========
function ejercicio14() {
    let numeros = [];
    let seguir = true;

    while (seguir == true) {
        let entrada = prompt("Ingrese un número (0 o texto para terminar):");

        if (entrada === "0" || entrada === null) {
            seguir = false;
        } else {
            let numero = parseInt(entrada);

            if (isNaN(numero)) {
                seguir = false;
            } else {
                numeros[numeros.length] = numero;
            }
        }
    }

    document.write("Array completo: " + numeros + "<br>");

    let pares = 0;
    let impares = 0;
    let i = 0;

    while (i < numeros.length) {
        if (numeros[i] % 2 == 0) {
            pares = pares + 1;
        } else {
            impares = impares + 1;
        }
        i = i + 1;
    }

    document.write("Cantidad de números pares: " + pares + "<br>");
    document.write("Cantidad de números impares: " + impares + "<br>");
    document.write('<hr>');
}