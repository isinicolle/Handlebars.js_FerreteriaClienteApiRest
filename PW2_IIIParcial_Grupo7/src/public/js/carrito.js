fetch('http://localhost:6001/api/carrito/carritoCliente?idUsuario=2')
.then(res =>{
    return res.json();
})
.then(data => mostrarCarrito(data.CarritoItem))
.catch(error =>console.log('Error'));

const mostrarCarrito = (data) =>{
    console.log(data);
    let body =''
    for(let i=0;i < data.length ;i++){
        body += `
        <tr>
        <td class="row"><img src="${data[i].Productos.imagen}" alt=""></td>
        <td class="rows">${data[i].Productos.descripcion_producto}</td>
        <td class="rows">${data[i].Productos.precio_actual}</td>
        <td class="rows">${data[i].Productos.descuento}%</td>
        <td class="rows"><span id="btnMinus"class="icon-minus"></span>${data[i].cantidad}<span class="icon-plus"></span></td>
        <td class="rows"><span class="icon-cancel"></span></td>
        </tr>
        `
    }
    document.getElementById('dato').innerHTML = body
}