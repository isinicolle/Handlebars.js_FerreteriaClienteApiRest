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
        body += `
        <column class="column column--50 decoration" id="data" >
            <img src="${data[i].imagen.includes('https')? data[i].imagen :'http://192.168.100.48:6001/img/'+data[i].imagen }" class="decoration__img"></img> 
            <div class="decoration__title">${data[i].descripcion_producto}</div>
            <div class="decoration__txt">${'Lps. '+data[i].precio_actual}</div>
            <form method="GET" action="detallesProducto">
            <input type="text" hidden name="idProd" value="${data[i].id_producto}">
            <input type="submit" class="btn_agregar" value="Agregar" >
            </form>
            
        </column>
        `
    }
    document.getElementById('data').innerHTML = body
}