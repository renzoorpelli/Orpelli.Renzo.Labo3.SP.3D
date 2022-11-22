const URL = "http://localhost:3000/perros";


export const getAnimales = () => {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.onload = function () {
      if (this.status > 199 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.send();
  });
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