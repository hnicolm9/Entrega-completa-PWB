let inventario = JSON.parse(
    localStorage.getItem("inventario")
) || [];

const formulario = document.getElementById("inventarioForm");
const tabla = document.getElementById("tablaInventario");
const totalInventario = document.getElementById("totalInventario");

mostrarInventario();

formulario.addEventListener("submit", function(e){

    e.preventDefault();

    const producto = document.getElementById("producto").value;
    const precio = Number(document.getElementById("precio").value);
    const tipo = document.getElementById("tipo").value;
    const cantidad = Number(document.getElementById("cantidad").value);

    let item = inventario.find(
        p => p.producto.toLowerCase() === producto.toLowerCase()
    );

    if(!item){

        item = {
            producto,
            precio,
            entradas:0,
            salidas:0,
            saldo:0
        };

        inventario.push(item);
    }

    if(tipo === "entrada"){
        item.entradas += cantidad;
    }
    else{
        item.salidas += cantidad;
    }

    item.saldo = item.entradas - item.salidas;

    guardarDatos();
    mostrarInventario();

    formulario.reset();
});

function guardarDatos(){

    localStorage.setItem(
        "inventario",
        JSON.stringify(inventario)
    );
}

function mostrarInventario(){

    tabla.innerHTML = "";

    let totalGeneral = 0;

    inventario.forEach(item => {

        const valorTotal =
            item.saldo * item.precio;

        totalGeneral += valorTotal;

        tabla.innerHTML += `
            <tr>
                <td>${item.producto}</td>
                <td>$${item.precio}</td>
                <td>${item.entradas}</td>
                <td>${item.salidas}</td>
                <td>${item.saldo}</td>
                <td>$${valorTotal}</td>
            </tr>
        `;
    });

    totalInventario.textContent =
        "$" + totalGeneral.toLocaleString();
}

document
.getElementById("exportar")
.addEventListener("click", () => {

    const datosJSON = JSON.stringify(
        inventario,
        null,
        2
    );

    const blob = new Blob(
        [datosJSON],
        {type:"application/json"}
    );

    const enlace =
        document.createElement("a");

    enlace.href =
        URL.createObjectURL(blob);

    enlace.download =
        "inventario.json";

    enlace.click();
});

document
.getElementById("importarArchivo")
.addEventListener("change", function(e){

    const archivo = e.target.files[0];

    if(!archivo) return;

    const lector = new FileReader();

    lector.onload = function(event){

        inventario =
            JSON.parse(event.target.result);

        guardarDatos();
        mostrarInventario();
    };

    lector.readAsText(archivo);
});