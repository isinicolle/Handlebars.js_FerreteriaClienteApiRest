const response = fetch('http://localhost:6001/api/productos/listarProducto')
    .then(res =>{
        return res.json();
    })
    .then(data => mostrarProducto(data));

const mostrarProducto = (data) =>{
    let body =''
    for(let i=0;i < data.length ;i++){
        body += `
        <column class="column column--50 decoration" id="data">
            <img src="${data[i].imagen}" class="decoration__img"></img> 
            <div class="decoration__title">${data[i].descripcion_producto}</div>
            <div class="decoration__txt">${data[i].precio_actual}</div>
            <input class="btn_agregar" type="button" value="Agregar">
        </column>
        `
    }
    document.getElementById('data').innerHTML = body
}