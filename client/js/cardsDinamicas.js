
import { getAnimales,setSpinner, clearSpinner } from "./ajax.js";

const $divSpinner = document.getElementById("spinner");

//guardo la lista de animales
let data = [];


let responseFromAjax = getAnimales();

setSpinner($divSpinner, "../client/img/perrito.gif");


//espero la promesa que retorna
responseFromAjax
  .then((responseFromServer) => {
    data = JSON.parse(responseFromServer);

    if (data == null) {
      $textoNoCards = document.createElement("h1");
      $textoNoCards.TextContent = "No hay animales en el sistema";
      $divCards.appendChild($textoNoCards);
    } else {
      data.forEach((x) => {
        const $card = crearCard(x);
    
        $divCards.appendChild(divRow);
    
        divRow.appendChild($card);
        console.log($card);
      });
    }
    clearSpinner($divSpinner);
  })
  .catch((err) => {
    console.log(err.message);
  });




const $divCards = document.querySelector(".divCards");
const divRow = document.createElement("div");

divRow.classList.add("row", "row-cols-1", "row-cols-md-3");

const crearCard = (anuncio) => {
  const newCard = document.createElement("figure");
  const cardContainer = document.createElement("div");
  const divHeader = document.createElement("div");
  const divFooter = document.createElement("div");
  const divBody = document.createElement("div");
  const cardTittle = document.createElement("h5");

  newCard.classList.add("card");
  divBody.classList.add("card-body");
  divHeader.classList.add("card-header");
  divFooter.classList.add("card-footer");
  cardTittle.classList.add("card-title");
  cardContainer.classList.add("col", "py-3");

  const id = anuncio.id;

  newCard.setAttribute("data-id", id);

  cardTittle.textContent = `Titulo: ${anuncio.titulo}`;

  const descripcion = document.createElement("p");
  descripcion.textContent = `Descripcion: ${anuncio.descripcion}`;
  descripcion.classList.add("card-text");

  const raza = document.createElement("p");
  raza.textContent = `Raza: ${anuncio.raza}`;
  raza.classList.add("card-text");

  const fechaNac = document.createElement("p");
  fechaNac.textContent = `Fecha Nacimiento: ${anuncio.fechaNacimiento}`;
  fechaNac.classList.add("card-text");

  const vacuna = document.createElement("p");
  vacuna.textContent = `Vacunado: ${anuncio.vacunado}`;
  vacuna.classList.add("card-text");

  divHeader.textContent = "Animal: " + anuncio.animal;

  divFooter.textContent = "PRECIO $" + anuncio.precio;

  //textp del divbody
  divBody.appendChild(cardTittle);
  divBody.appendChild(descripcion);
  divBody.appendChild(raza);
  divBody.appendChild(fechaNac);
  divBody.appendChild(vacuna);

  //agregamos las partes a la card
  newCard.appendChild(divHeader);
  newCard.appendChild(divBody);
  newCard.appendChild(divFooter);

  newCard.classList.add("figure");

  cardContainer.appendChild(newCard);

  return cardContainer;
};

