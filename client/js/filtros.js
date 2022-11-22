export const promedioAnuncios = (anuncios) => {    
    let total = anuncios.reduce((p, a) => {        
        return p += parseFloat(a.precio);
    }, 0);   
    return (total / anuncios.length).toFixed(2);
}


export const promedioAnunciosParametro = (anuncios, tipoAnimal) => {
    let totalTipos = anuncios.filter(animal => animal.animal == tipoAnimal.toUpperCase());
    let total = totalTipos.reduce((p, a) => {        
        return p += parseFloat(a.precio);
    }, 0);   
    return (total / totalTipos.length).toFixed(2);
}