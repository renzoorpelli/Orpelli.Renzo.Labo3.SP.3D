import { crearTabla } from "./tablaDinamica.js";

import {
  getAnunciosAsync,
  updateAnuncio,
  deleteAnuncio,
  createAnuncio,
} from "./fetch.js";

import { crearAnuncioAnimal } from "./anuncio.js";

import {
  validarCampoVacio,
  validarNumeros,
  validarPrecio,
  validarLongitudMaxima,
} from "./validaciones.js";

import { promedioAnuncios, promedioAnunciosParametro } from "./filtros.js";

//referencia a la tabla
const divTabla = document.querySelector(".divTabla");

//referencia al formulario
const $formulario = document.forms[0];
const $formElements = $formulario.elements;

//botnes crud
const $btnCancelar = document.getElementById("btnCancelar");
const $btnBorrar = document.getElementById("btnBorrar");
const $btnGuardar = document.getElementById("btnGuardar");
const $smallAlert = document.getElementById("alertSubmit");

$btnBorrar.classList.add("escondido");

//referencia a promedio
const $txtPromedio = document.getElementById("txtPromedio");
const $slcFiltro = document.getElementById("slcFiltro");



// ************* FILTRADO DE TABLA ***********************
//checked
const $checkboxes = document.querySelectorAll(".selector");
const keys = ['id'];

//obtengo un arrary con los keys a utilizar
$checkboxes.forEach((x) => {
  //console.log(x.hasAttribute("checked"));
  if (x.hasAttribute("checked")) {
    keys.push(x.value);
  }
});

$checkboxes.forEach((element) =>
  element.addEventListener("click", (e) => {
    if (e.target.checked) {
      keys.push(e.target.value);
    } else {
      keys.splice(keys.indexOf(e.target.value), 1);
    }

    const listaFiltrada = anuncios.map((item) => {
      const nuevoAnuncio = [];

      keys.forEach((key) => {
        
        nuevoAnuncio[key] = item[key];
      });
      return nuevoAnuncio;

    });
    actualizarTabla2(listaFiltrada);
  })
);
//  ******** FIN  FILTRADO DE TABLA ********************



let idSeleccionado;
divTabla.addEventListener("click", (e) => {
  const emisor = e.target;

  if (emisor.matches("tbody tr td")) {
    // de cada celda que clickeo obtengo el id
    let idAnuncio = emisor.parentElement.dataset.id;

    const anuncio = anuncios.find((element) => {
      return element.id == idAnuncio;
    });

    idSeleccionado = idAnuncio;
    cargarFormulario(anuncio);

    $btnGuardar.textContent = "Modificar";
    $btnCancelar.classList.add("visible");
    $btnBorrar.classList.remove("escondido");
    $btnBorrar.classList.add("visible");
    console.log("🚀 ~ file: app.js ~ line 35 ~ anuncio ~ anuncio", anuncio);
  }
});

// si apreto el boton cancelar, no muestro las acciones de borrar
$btnCancelar.addEventListener("click", () => {
  $btnBorrar.classList.remove("visible");
  $btnBorrar.classList.add("escondido");
  $btnGuardar.textContent = "Guardar";
});

// agregar/ modificar addEventListener
window.addEventListener("load", () => {
  $formulario.addEventListener("submit", (e) => {
    //evito que el evento sea disparado y valido
    e.preventDefault();

    if (validarSubmit() && !validarFormVacio()) {
      $smallAlert.classList.remove("danger");
      $smallAlert.textContent = "";
      console.log($btnGuardar.textContent.trim());
      //si el boton guardar tiene como texto el "modificar", significa que la proxima accion a realizar
      //sera una modificacion de un objeto entidad seleccionado, entonces modifico la entidad
      if ($btnGuardar.textContent == "Modificar") {
        const entidadModificar = anuncios.find((element) => {
          return element.id == idSeleccionado;
        });
        if (modificarEntidad(entidadModificar)) {
          updateAnuncio(entidadModificar);
        }
      } else if ($btnGuardar.textContent.trim() == "Guardar") {
        const {
          titulo,
          descripcion,
          animal,
          precio,
          raza,
          nacimiento,
          vacunado,
        } = e.target;

        const nuevoAnuncio = crearAnuncioAnimal(
          null,
          titulo.value,
          animal.value,
          descripcion.value,
          precio.value,
          nacimiento.value,
          raza.value,
          vacunado.value
        );

        console.log(nuevoAnuncio);
        if (nuevoAnuncio) {
          createAnuncio(nuevoAnuncio);
        }
      }
    } else {
      $smallAlert.classList.add("danger");
      $smallAlert.textContent = "ERROR, faltan campos para enviar";
    }
  });
});

//traigo a los anuncios con axios y actualizo tabla
let anuncios = await getAnunciosAsync();
actualizarTabla();

$txtPromedio.value = "n/a";

$slcFiltro.addEventListener("change", (e) => {
  if (e.target.value == "todos") {
    $txtPromedio.value = promedioAnuncios(anuncios);
    actualizarTabla2(anuncios);//el array de anuncios original
  } else if (e.target.value == "gato") {
    $txtPromedio.value = promedioAnunciosParametro(anuncios, "GATO");
    let filtroGatos = anuncios.filter(anuncio => anuncio.animal == "GATO");
    actualizarTabla2(filtroGatos);// filtro por el array de anuncios donde los animales sean gatos
  } else {
    $txtPromedio.value = promedioAnunciosParametro(anuncios, "PERRO");
    let filtroPerros = anuncios.filter(anuncio => anuncio.animal == "PERRO");//filtro array de anuncios por animales que sean perros
    actualizarTabla2(filtroPerros);
  }
});

//eliminar addEventListener
$btnBorrar.addEventListener("click", (e) => {
  e.preventDefault();
  const entidadEliminar = anuncios.find((element) => {
    return element.id == idSeleccionado;
  });
  //verifico que lo que quiero eliminar exista
  if (entidadEliminar) {
     deleteAnuncio(entidadEliminar.id);
  }
});

/*
      funcion encargada de actualizar los miembros de la tabla segun la data del local storage
  
  */
function actualizarTabla() {
  while (divTabla.hasChildNodes()) {
    divTabla.removeChild(divTabla.firstChild);
  }

  divTabla.appendChild(crearTabla(anuncios));
}

function actualizarTabla2(listado) {
  while (divTabla.hasChildNodes()) {
    divTabla.removeChild(divTabla.firstChild);
  }
  divTabla.appendChild(crearTabla(listado));
}

/*
  
  **********FUNCIONES CRUD**********************
  
  */

//funcion encargada de modificar el objeto entidad
function modificarEntidad(entidadModificar) {
  if (entidadModificar) {
    entidadModificar.titulo = $formulario.titulo.value;
    entidadModificar.descripcion = $formulario.descripcion.value;
    entidadModificar.animal = $formulario.animal.value;
    entidadModificar.precio = $formulario.precio.value;
    entidadModificar.raza = $formulario.raza.value;
    entidadModificar.fechaNacimiento = $formulario.nacimiento.value;
    entidadModificar.vacunado = $formulario.vacunado.value;
    return true;
  }
  return false;
}
// funcion encargargada de cargar los campos del formulario con los datos del objeto entidad seleccionado

function cargarFormulario(entidad) {
  if (entidad) {
    $formulario.titulo.value = entidad.titulo;
    $formulario.animal.value = entidad.animal;
    $formulario.descripcion.value = entidad.descripcion;
    $formulario.precio.value = entidad.precio;
    $formulario.raza.value = entidad.raza;
    $formulario.nacimiento.value = entidad.fechaNacimiento;
    $formulario.vacunado.value = entidad.vacunado;
  }
  return false;
}

/*
  *
      Validaciones
  *
  */

for (let i = 0; i < $formElements.length; i++) {
  const controles = $formElements.item(i);

  if (controles.matches("input")) {
    if (
      controles.matches("[type=text]") ||
      controles.matches("[type=number]")
    ) {
      //este control hace referencia a el salto hacia otro input
      controles.addEventListener("blur", validarCampoVacio);
      if (controles.matches("[type=text]")) {
        controles.addEventListener("input", validarLongitudMaxima);
      }
      if (controles.matches("[id=idPrecio]")) {
        controles.addEventListener("input", validarPrecio);
        controles.addEventListener("blur", validarPrecio);
      } else if (controles.matches("[type=number]")) {
        controles.addEventListener("blur", validarNumeros);
      }
    }
  }
}

// funciones validaciones para enviar

function validarSubmit() {
  const controles = $formulario.elements;

  for (const control of controles) {
    //si alguno de los controles tiene la clase error, no continuo
    if (control.classList.contains("inputError")) {
      return false;
    }
  }
  return true;
}

function validarFormVacio() {
  if (
    $formulario.titulo.value == "" ||
    $formulario.descripcion.value == "" ||
    $formulario.precio.value == "" ||
    $formulario.raza.value == "" ||
    $formulario.nacimiento.value == "" ||
    $formulario.vacunado.value == ""
  ) {
    return true;
  }
  return false;
}
