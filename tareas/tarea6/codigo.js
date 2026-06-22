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

    if (horaExactaIn < 5 || horaExactaIn > 12 || horaExactaOut < 5 || horaExactaOut > 12) {
        alert("ERROR: El parqueadero está cerrado. Solo funciona de 5:00 AM a 12:00 PM (Mediodía).");
        return;
    }

    if (horaExactaIn >= horaExactaOut) {
        alert("ERROR: La hora de salida debe ser mayor a la hora de ingreso.");
        return;
    }

    fecha = txt1.split("T")[0];

    let resta = f2 - f1;
    let minutos = Math.ceil(resta / 60000);
    horas = minutos / 60;

    if (minutos <= 0) {
        alert("ERROR: La fecha de salida debe ser después de la de ingreso.");
        return;
    }

    let precio = 95;
    if (tipo == "Automovil") {
        precio = 125;
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

    alert("CÁLCULO EXITOSO:\n- Minutos cobrados: " + minutos + " min\n- Horas: " + horas.toFixed(2) + " h\n- TOTAL A PAGAR: $" + total);
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

    if (vueltas >= 50000) {
        let c50 = Math.floor(vueltas / 50000);
        vueltas = vueltas % 50000;
        mensaje = mensaje + "- " + c50 + " billete(s) de $50000\n";
    }
    if (vueltas >= 20000) {
        let c20 = Math.floor(vueltas / 20000);
        vueltas = vueltas % 20000;
        mensaje = mensaje + "- " + c20 + " billete(s) de $20000\n";
    }
    if (vueltas >= 10000) {
        let c10 = Math.floor(vueltas / 10000);
        vueltas = vueltas % 10000;
        mensaje = mensaje + "- " + c10 + " billete(s) de $10000\n";
    }
    if (vueltas >= 5000) {
        let c5 = Math.floor(vueltas / 5000);
        vueltas = vueltas % 5000;
        mensaje = mensaje + "- " + c5 + " billete(s) de $5000\n";
    }
    if (vueltas >= 2000) {
        let c2 = Math.floor(vueltas / 2000);
        vueltas = vueltas % 2000;
        mensaje = mensaje + "- " + c2 + " billete(s) de $2000\n";
    }
    if (vueltas >= 1000) {
        let c1 = Math.floor(vueltas / 1000);
        vueltas = vueltas % 1000;
        mensaje = mensaje + "- " + c1 + " billete(s) de $1000\n";
    }
    if (vueltas >= 500) {
        let m500 = Math.floor(vueltas / 500);
        vueltas = vueltas % 500;
        mensaje = mensaje + "- " + m500 + " moneda(s) de $500\n";
    }
    if (vueltas >= 200) {
        let m200 = Math.floor(vueltas / 200);
        vueltas = vueltas % 200;
        mensaje = mensaje + "- " + m200 + " moneda(s) de $200\n";
    }
    if (vueltas >= 100) {
        let m100 = Math.floor(vueltas / 100);
        vueltas = vueltas % 100;
        mensaje = mensaje + "- " + m100 + " moneda(s) de $100\n";
    }
    if (vueltas >= 50) {
        let m50 = Math.floor(vueltas / 50);
        vueltas = vueltas % 50;
        mensaje = mensaje + "- " + m50 + " moneda(s) de $50\n";
    }

    alert(mensaje);

    generarJSON();
}

function generarJSON() {
    let textoJson = {
        "Fecha": fecha,
        "Tipo de vehiculo": tipo,
        "Placa del vehiculo": placa,
        "Tiempo que permanecio parqueado (en horas)": parseFloat(horas.toFixed(2)),
        "Valor a pagar": total
    };

    document.getElementById("json").value = JSON.stringify(textoJson, null, 2);
}

function exportarJSON() {
    const jsonData = document.getElementById("json").value;
    
    if (!jsonData || jsonData.trim() === "") {
        alert("ERROR: No hay datos para exportar. Primero procesa un pago.");
        return;
    }

    const blob = new Blob([jsonData], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `parqueadero_${fecha || "sin_fecha"}.json`;
    enlace.click();
    
    alert("JSON exportado exitosamente!");
}

function importarJSON(event) {
    const archivo = event.target.files[0];
    
    if (!archivo) return;

    const lector = new FileReader();
    
    lector.onload = function(e) {
        try {
            const datos = JSON.parse(e.target.result);
            
            document.getElementById("json").value = JSON.stringify(datos, null, 2);
            
            if (datos["Fecha"]) {
                const fechaIngreso = datos["Fecha"] + "T00:00";
                document.getElementById("ingreso").value = fechaIngreso;
                document.getElementById("salida").value = fechaIngreso;
                
                if (datos["Tipo de vehiculo"]) {
                    const select = document.getElementById("tipo");
                    for (let option of select.options) {
                        if (option.value === datos["Tipo de vehiculo"]) {
                            select.value = option.value;
                            break;
                        }
                    }
                }
                
                if (datos["Placa del vehiculo"]) {
                    document.getElementById("placa").value = datos["Placa del vehiculo"];
                }
            }
            
            alert("JSON importado exitosamente!");
            
        } catch (error) {
            alert("ERROR: El archivo no es un JSON válido.");
            console.error(error);
        }
    };
    
    lector.readAsText(archivo);
    
    event.target.value = "";
}