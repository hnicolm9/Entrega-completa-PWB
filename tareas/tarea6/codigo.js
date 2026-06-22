let total = 0;
let fecha = "";
let tipo = "";
let placa = "";
let horas = 0;

function calcular() {
    tipo = document.getElementById("tipo").value;
    placa = document.getElementById("placa").value;
    let txt1 = document.getElementById("ingreso").value;
    let txt2 = document.getElementById("salida").value;

    if (txt1 == "" || txt2 == "" || placa == "") {
        alert("ERROR: Por favor llena todos los campos primero.");
        return;
    }

    let f1 = new Date(txt1);
    let f2 = new Date(txt2);

    let horaExactaIn = f1.getHours() + (f1.getMinutes() / 60);
    let horaExactaOut = f2.getHours() + (f2.getMinutes() / 60);

    if (horaExactaIn < 5 || horaExactaIn > 24 || (horaExactaOut < 5 && horaExactaOut !== 0) || horaExactaOut > 24) {
        alert("ERROR: El parqueadero esta cerrado. Solo funciona de 5:00 AM a 12:00 PM (Noche).");
        return;
    }

    fecha = txt1.split("T")[0];

    let resta = f2 - f1;
    let minutos = Math.ceil(resta / 60000); 
    horas = minutos / 60;

    if (minutos <= 0) {
        alert("ERROR: La fecha de salida debe ser despues de la de ingreso.");
        return;
    }

    let precio = 95; // Moto
    if (tipo == "Automovil") {
        precio = 125; // Automovil
    }

    let subtotal = minutos * precio;

    if (tipo == "Automovil") {
        let diaMes = f1.getDate();
        let ultimoNum = parseInt(placa.substring(placa.length - 1));

        if ((diaMes % 2 == 0 && ultimoNum % 2 == 0) || (diaMes % 2 != 0 && ultimoNum % 2 != 0)) {
            subtotal = subtotal - (subtotal * 0.25);
        }
    }

    total = Math.ceil(subtotal / 50) * 50;

    alert("CALCULO EXITOSO:\n- Minutos cobrados: " + minutos + " min\n- Horas: " + horas.toFixed(2) + " h\n- TOTAL A PAGAR: $" + total);
}

function pagar() {
    let plata = parseInt(document.getElementById("paga").value);
    
    if (isNaN(plata) || total == 0) {
        alert("ERROR: Primero debes calcular la tarifa antes de pagar.");
        return;
    }

    if (plata < total) {
        alert("ERROR: El dinero ingresado es menor al total a pagar.");
        return;
    }

    let vueltas = plata - total;
    let mensaje = "PAGO EXITOSO\n\nVueltas totales: $" + vueltas + "\n\nDesglose de cambio:\n";

    let vueltasRestantes = vueltas;

    if (vueltasRestantes >= 50000) {
        let c50 = Math.floor(vueltasRestantes / 50000);
        vueltasRestantes = vueltasRestantes % 50000;
        mensaje = mensaje + "- " + c50 + " billete(s) de $50000\n";
    }
    if (vueltasRestantes >= 20000) {
        let c20 = Math.floor(vueltasRestantes / 20000);
        vueltasRestantes = vueltasRestantes % 20000;
        mensaje = mensaje + "- " + c20 + " billete(s) de $20000\n";
    }
    if (vueltasRestantes >= 10000) {
        let c10 = Math.floor(vueltasRestantes / 10000);
        vueltasRestantes = vueltasRestantes % 10000;
        mensaje = mensaje + "- " + c10 + " billete(s) de $10000\n";
    }
    if (vueltasRestantes >= 5000) {
        let c5 = Math.floor(vueltasRestantes / 5000);
        vueltasRestantes = vueltasRestantes % 5000;
        mensaje = mensaje + "- " + c5 + " billete(s) de $5000\n";
    }
    if (vueltasRestantes >= 2000) {
        let c2 = Math.floor(vueltasRestantes / 2000);
        vueltasRestantes = vueltasRestantes % 2000;
        mensaje = mensaje + "- " + c2 + " billete(s) de $2000\n";
    }
    if (vueltasRestantes >= 1000) {
        let c1 = Math.floor(vueltasRestantes / 1000);
        vueltasRestantes = vueltasRestantes % 1000;
        mensaje = mensaje + "- " + c1 + " billete(s) de $1000\n";
    }
    if (vueltasRestantes >= 500) {
        let m500 = Math.floor(vueltasRestantes / 500);
        vueltasRestantes = vueltasRestantes % 500;
        mensaje = mensaje + "- " + m500 + " moneda(s) de $500\n";
    }
    if (vueltasRestantes >= 200) {
        let m200 = Math.floor(vueltasRestantes / 200);
        vueltasRestantes = vueltasRestantes % 200;
        mensaje = mensaje + "- " + m200 + " moneda(s) de $200\n";
    }
    if (vueltasRestantes >= 100) {
        let m100 = Math.floor(vueltasRestantes / 100);
        vueltasRestantes = vueltasRestantes % 100;
        mensaje = mensaje + "- " + m100 + " moneda(s) de $100\n";
    }
    if (vueltasRestantes >= 50) {
        let m50 = Math.floor(vueltasRestantes / 50);
        vueltasRestantes = vueltasRestantes % 50;
        mensaje = mensaje + "- " + m50 + " moneda(s) de $50\n";
    }

    alert(mensaje);

    let textoJson = "{\n" +
        '  "Fecha": "' + fecha + '",\n' +
        '  "Tipo de vehiculo": "' + tipo + '",\n' +
        '  "Placa del vehiculo": "' + placa + '",\n' +
        '  "Tiempo que permanecio parqueado (en horas)": ' + horas.toFixed(2) + ',\n' +
        '  "Valor a pagar": ' + total + ',\n' +
        '  "Efectivo recibido": ' + plata + ',\n' +
        '  "Vueltas entregadas": ' + vueltas + '\n' +
        "}";

    document.getElementById("json").value = textoJson;
}