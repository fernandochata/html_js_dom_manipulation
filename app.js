// clase producto
class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

// clase de la interfaz de usuario
class UI {
  // funcion para agregar productos
  addProduct(product) {
    const productList = document.getElementById("product-list"); // capturo el div lista de productos
    const element = document.createElement("div"); // se crea un elemento div y luego se lo llena con la informacion del producto
    element.innerHTML = ` 
      <div class="card text-center mb-4">
          <div class="card-body">
              <strong>Product name: </strong> ${product.name}
              <strong>Product price: </strong> ${product.price}
              <strong>Year product: </strong> ${product.year}
              <a href="#" class="btn btn-danger" name="delete">Delete</a>
          </div>
      </div
      `;
    productList.appendChild(element); // se agrega como un hijo al div que se capturo al comienzo de la funcion
  }

  // funcion para limpiar los input
  resetForm() {
    document.getElementById("product-form").reset();
  }

  // funcion para eliminar un producto
  deleteProduct(element) {
    if (element.name === "delete") {
      // si el name del elemento enviado es delete entonces...
      element.parentElement.parentElement.parentElement.remove(); // se sube tres niveles de padres puesto que el elemento a se encuentra dentro de 3 divs
      this.showMessage("Product deleted succsssfully", "info"); // se llama a la funcion mostrar mensaje eliminado
    }
  }

  // funcion que muestra un mensaje
  showMessage(message, cssClass) {
    const div = document.createElement("div"); // se crea un elemento div
    div.className = `alert alert-${cssClass} mt-2`; // se modifica la clase del div para diferenciar tipos de mensajes
    div.appendChild(document.createTextNode(message)); // se agrega el texto enviado por la funcion a un nodo hijo
    const container = document.querySelector(".container"); // se selecciona el elemento de clase container (solo hay uno)
    const app = document.querySelector("#app"); // se captura el elemento de id app
    container.insertBefore(div, app); // se inserta en el container, el div recien creado, antes del elemento app
    setTimeout(function () {
      // funcion que remueve el elemento recien creado despues de 3 segundos
      document.querySelector(".alert").remove();
    }, 1500);
  }
}

// eventos del DOM

document // se captura el evento submit del product-form
  .getElementById("product-form")
  .addEventListener("submit", function (event) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
    const ui = new UI();
    if (name === "" || price === "" || year === "") {
      ui.showMessage("Please Insert data in all fields", "danger");
    } else {
      const product = new Product(name, price, year); // se crea un objeto con los valores ingresados en los inputs
      //const ui = new UI();
      ui.addProduct(product);
      ui.resetForm();
      ui.showMessage("Product added successfully", "success");
    }
    event.preventDefault(); // se detiene que la pagina se vuelva a cargar
  });

document // click en los botones eliminar
  .getElementById("product-list")
  .addEventListener("click", function (event) {
    const ui = new UI();
    ui.deleteProduct(event.target);
  });
