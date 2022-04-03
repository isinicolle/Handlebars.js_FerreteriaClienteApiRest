fetch('http://localhost:6001/api/productos/listarProducto')
    .then(res =>{
        return res.json();
    })
    .then(data => mostrarData(data))
    .catch(error =>console.log('Error'));

const mostrarData = (data) =>{
    console.log(data);
    let body =''
    for(let i=0;i < data.length ;i++){
        body += `<column class="column column--50 decoration" id="data">
            <img src="${data[i].imagen}" class="decoration__img"></img> 
            <div class="decoration__title">${data[i].descripcion_producto}</div>
            <div class="decoration__txt">${data[i].precio_actual}</div>
        </column>
        `
    }
    document.getElementById('data').innerHTML = body
}