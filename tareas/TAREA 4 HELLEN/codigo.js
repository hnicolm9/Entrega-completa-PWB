const btnAgregar = document.getElementById("btnAgregar");
const tablaBody = document.querySelector("#tabla tbody");
const totalGeneral = document.getElementById("totalGeneral");
const productoSelect = document.getElementById("productoSelect");
const productImage = document.getElementById("productImage");

const productImages = {
  "Laptop": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZXKn0ohmLYz_NI_HqglShjVzzae5hrBRGLA&s",
  "Telefono": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScFq0hiTWDLeDjVhEQ2G1VDwqlqcdLGI-L3g&s",
  "Tablet": "https://www.tienda.cyh-technology.com.co/wp-content/uploads/2024/01/SM-X110NZAACOO.png",
  "Monitor": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPWTGKSx4wygiIJtMVlLQC2rfBU0ATw0Yykg&s",
  "Teclado": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROOmtBDJkFVuRhJzVeSIiOg_164Jfb6VgE4A&s",
  "Mouse": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqOLeImlueWVc6Rltq4XTdryZCNxQ_BERig&s",
  "Audifonos": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgUZ0wg9d5tmDYx01C8acvUbBeKJNO8Eceuw&s",
  "Parlantes": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuaK-SWRo0EV8IWTlQ_2emxp6D4_TRTTpRQg&s",
  "Camara": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDIYC-A__YXENPZTyRhs5SzrJmznXZdtPABw&s",
  "Impresora": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14Y71ePy5LGxqW_6aaFfE_DSRSZvunyjh7g&s",
  "Escaner": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Epson_V850_scanner_open_20230920.jpg/1280px-Epson_V850_scanner_open_20230920.jpg",
  "Router": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvE7gM3K2oSrsuWQcIKpOknWConEkXq6G0pg&s",
  "DiscoDuro": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC22x7vN-oJKfsxOs1GdmdTfqDLBH99obTA&s",
  "MemoriaUSB": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj50kuPU1SXtTOQ8WMWWLqESSo5W-cNe9hrQ&s",
  "TarjetaSD": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbjGuPSzBKvYdWvit9qk48OIUL4KeaVaaLQ&s",
  "Bateria": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf6GJjxnDfeRk2ql1ZZKJAfPldkLEmZq2HCg&s",
  "Cargador": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5TTmfVqiFxFGJdRx1VjQdq8zv5Am-XRYqg&s",
  "Funda": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKpVXnBfVJFfQ00Yim4ILrqgi5ItRW8Q5GwQ&s",
  "Estuche": "https://www.caselogic.com/-/p/gjAeIAjMNGgajAWZrE1vg9eEF1Y6ZTVlBzQ8ZPW3NLc/rs:fit/h:480/cb:1.11/w:480/plain/approved/std.lang.all/77/51/277751.jpg",
  "Silla": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqX6hQQYTUqJAFAe750PLrttMMH9iiFQ4TQ&s"
};

productoSelect.addEventListener("change", function() {
  const producto = this.value;
  const imgUrl = productImages[producto] || "";
  productImage.src = imgUrl;
  productImage.alt = producto;
});

productoSelect.dispatchEvent(new Event('change'));

btnAgregar.addEventListener("click", () => {
  const nombre = productoSelect.value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);

  if (!nombre || isNaN(cantidad) || isNaN(precio)) {
    alert("Por favor complete todos los campos.");
    return;
  }

  agregarProducto(nombre, cantidad, precio);
  limpiar();
});

function agregarProducto(nombre, cantidad, precio) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
            <td>${nombre}</td>

            <td>
                <button class="menos">-</button>
                <span class="cant">${cantidad}</span>
                <button class="mas">+</button>
            </td>

            <td>
                $<span class="precio">${precio}</span>
                <button class="editarPrecio">E</button>
            </td>

            <td>$<span class="total">${(cantidad * precio).toFixed(
              2
            )}</span></td>

            <td><button class="eliminar">X</button></td>
        `;

  tablaBody.appendChild(tr);
  recalcularTotal();
}

function limpiar() {
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
}

tablaBody.addEventListener("click", function (e) {
  const fila = e.target.closest("tr");

  if (e.target.classList.contains("mas")) {
    let cant = fila.querySelector(".cant");
    cant.textContent = parseInt(cant.textContent) + 1;
  }

  if (e.target.classList.contains("menos")) {
    let cant = fila.querySelector(".cant");
    let actual = parseInt(cant.textContent);
    if (actual > 0) cant.textContent = actual - 1;
  }

  if (e.target.classList.contains("editarPrecio")) {
    let precioSpan = fila.querySelector(".precio");
    const nuevo = prompt("Nuevo precio:", precioSpan.textContent);
    if (nuevo !== null && !isNaN(parseFloat(nuevo))) {
      precioSpan.textContent = parseFloat(nuevo);
    }
  }

  if (e.target.classList.contains("eliminar")) {
    fila.remove();
  }

  actualizarFila(fila);
  recalcularTotal();
});

function actualizarFila(fila) {
  const cant = parseInt(fila.querySelector(".cant").textContent);
  const precio = parseFloat(fila.querySelector(".precio").textContent);

  const total = fila.querySelector(".total");
  total.textContent = (cant * precio).toFixed(2);

  if (cant === 0) {
    fila.classList.add("low-stock");
  } else {
    fila.classList.remove("low-stock");
  }
}

function recalcularTotal() {
  let suma = 0;

  const totales = document.querySelectorAll("#tabla tbody .total");

  totales.forEach((t) => {
    const valor = parseFloat(t.textContent);
    if (!isNaN(valor)) {
      suma += valor;
    }
  });

  totalGeneral.textContent = "Total general: $" + suma.toFixed(2);
}