class Anuncio {
  constructor(id = null, titulo, animal, descripcion, precio) {
    if(id!= null) this.id = id;
    this.titulo = titulo;
    animal != null ? (this.animal = animal) : "gato";
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

class AnuncioMascota extends Anuncio {
  constructor(
    id = null,
    titulo,
    descripcion,
    animal,
    precio,
    raza,
    fechaNacimiento,
    vacunado
  ) {
    super(id, titulo, animal, descripcion, precio);
    this.fechaNacimiento = fechaNacimiento;
    if (vacunado == "si") {
      this.vacunado = vacunado;
    } else {
      this.vacunado = "no";
    }
    this.raza = raza;
  }
}

export const crearAnuncioAnimal = (
  id = null,
  titulo,
  animal,
  descripcion,
  precio,
  fechaNacimiento,
  raza,
  vacunado
) => {
  return new AnuncioMascota(
    null,
    titulo,
    descripcion,
    animal,
    precio,
    raza,
    fechaNacimiento,
    vacunado
  );
};
