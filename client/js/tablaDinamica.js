const crearCabecera = (row) => {
  const cabecera = document.createElement("thead"),
    tr = document.createElement("tr");
  cabecera.appendChild(tr);

  //reocorro el objeto y le creo um th por cada atributo del objeto
  for (const key in row) {
    if (key === "id") continue; // si es la columna id salto a la proxima iteracion
    const th = document.createElement("th");
    th.textContent = key;
    tr.appendChild(th);
  }
  return cabecera;
};

const crearCuerpo = (data) => {
  const cuerpo = document.createElement("tbody");
  //recorro cada elemento del array
  data.forEach((element) => {
    const fila = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
          fila.setAttribute("data-id", element[key]);
          continue;
      }
      const celda = document.createElement("td");
      //el valor que tenga la key del objeto
      celda.textContent = element[key];
      fila.appendChild(celda);
    }
    cuerpo.appendChild(fila);
  });

  return cuerpo;
};

export const crearTabla = (data) => {
  if (!Array.isArray(data)) {
    return null;
  }
  const tabla = document.createElement("table");
  tabla.setAttribute("class", "table table-hover");
  tabla.appendChild(crearCabecera(data[0]));
  tabla.appendChild(crearCuerpo(data));

  return tabla;
};
