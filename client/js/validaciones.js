export const validarCampoVacio = (e) => {
  const input = e.target;

  input.value.trim() ? clearError(input) : setError(input, "Campo Requerido"); // TERNARIO
};

export const validarCampoVacioEtarget = (e) => {
  const value = e.target.value;

  //obtengo la referencia al elemento
  const input = e.target;

  console.log(value);
  return value ?? "es null";
};

//VALIDACIONES EMAILS
export const validarEmail = (e) => {
  // igm -> i de insensitive
  // const pattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
  const pattern = /^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/;
  const input = e.target;
  const email = input.value.trim();

  if (email.length > 6) {
    pattern.test(email) ? clearError(input) : setError(input, "Email invalido");
  }
};

//VALIDACIONES CONTRASENAS
export const validarPassword = (e) => {
  const input = e.target;
  const password = input.value.trim();
  const pattern = "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm";

  if (!validarLongitudMinima(input, 8)) {
    setError(input, "Debe tener al menos 8 caracteres");
  } else {
    pattern.test(password)
      ? clearError(input)
      : setError(input, "Password Invalido");
  }
};

export const validarPrecio = (e) => {
  const input = e.target;
  const value = input.value.trim();
  const pattern = /[^a-z ]\ *([.0-9])*\d/g;

  if (pattern.test(value)) {
    const precio = parseInt(value);
    if (precio > 0 && precio < 50000) {
      clearError(input)
    } else {
      setError(input, "El precio debe ser positivo y menor a $50.000");
    }

  } else {
    setError(input, "El precio no es valido");
  }

  
};

//validar longitud maxima
export const validarLongitudMaxima = (e) => {
    
  const input = e.target;
  const texto = input.value.trim();
  
  if (texto.length < 25) {
      clearError(input); 
  } else {
      setError(input, "Debe tener menos de 25 caracteres");
  }
};



//VALIDAR NUMEROS
export const validarNumeros = (e) => {
  const input = e.target;
  const numero = parseInt(input.value);
  if (numero > 0 && numero < 11) {
    clearError(input);
  } else {
    setError(input, "Error el numero debe ser menor a 10");
  }
};

//VALIDACIONES ARCHIVOS
export const validarExtension = (e) => {
  const extensiones = ["gif", "jpg", "png", "jpeg"];
  const input = e.target;
  const nombreArchivo = input.files[0].name;
  const extension = nombreArchivo.split(".").pop();

  extensiones.includes(extension)
    ? clearError(input)
    : setError(input, "Extension Invalida");
};

const setError = (input, mensaje) => {
  const $small = input.nextElementSibling;
  //operador de corto circuito, si es true muestra el de la izquierda caso contrario va lo de la derecha
  $small.textContent = mensaje || `${input.name} Requerido`;
  input.classList.add("inputError");
  $small.classList.add("danger");
};

const clearError = (input, mensaje) => {
  const $small = input.nextElementSibling;
  $small.textContent = "";
  input.classList.remove("inputError");
};

const validarLongitudMinima = (input, minima) =>
  input.value.trim().length > minima;
