const URL = "http://localhost:3000/perros";

const $divSpinner = document.getElementById("spinner");


export const getAnunciosAsync = async () => {
  try {
    setSpinner($divSpinner, "../client/img/perrito.gif");
    const res = await fetch(URL);
    const data = await res.json();

      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(err);
  } finally {
    clearSpinner($divSpinner);
  }
};



export const createAnuncio = (anuncio) => {
  setSpinner($divSpinner, "../client/img/perrito.gif");
    fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(anuncio)
  })
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    })
    .then((dataJson) => {
      //catching the promise from res.json()
      console.log(dataJson);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      clearSpinner($divSpinner);
    });
};


const getPersona = (id) => {
    setSpinner($divSpinner, "./assets/spinner.gif");
    fetch(URL + "/" + id)
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      })
      .then((dataJson) => {
        //catching the promise from res.json()
        console.log(dataJson);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        clearSpinner($divSpinner);
      });
  };


  export const updateAnuncio = (anuncio) => {
    setSpinner($divSpinner, "../client/img/perrito.gif");
      fetch(URL + "/" + anuncio.id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(anuncio)
    })
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
      })
      .then((dataJson) => {
        //catching the promise from res.json()
        console.log(dataJson);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        clearSpinner($divSpinner);
      });
  };

  export const deleteAnuncio = async (id) => {
    try {
      setSpinner($divSpinner, "../client/img/perrito.gif");
      const response = await fetch(URL + "/" + id, {
        method: "DELETE"
      });

      if (!response.ok) {
        
        throw new Error("error al borrar el anuncio");
      }
    } catch (error) {
      
      console.error(error.message);
    }
    finally {
      clearSpinner($divSpinner);
    }
  };












  export const setSpinner = (div, src) => {
    const img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", "spinner");
    img.setAttribute("class", "rounded mx-auto d-block");
    div.appendChild(img);
  
    img.hasChildNodes;
  };
  
export const clearSpinner = (div) => {
    while (div.hasChildNodes()) {
      div.removeChild(div.firstElementChild);
    }
  };