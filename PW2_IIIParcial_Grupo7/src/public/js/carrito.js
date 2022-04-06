fetch('http://localhost:6001/api/carrito/find/7')
.then(res =>{
    return res.json();
})
.then(data => mostrarCarrito(data))
.catch(error =>console.log('Error'));

function descuento(descuento,precio,cantidad) {
    let des = descuento/100;
    return des*precio*cantidad;
}

function subtotal(descuento,precio,cantidad) { 
    let des = (descuento/100)*precio; 
    return (precio*cantidad) - des;
}

const mostrarCarrito = (data) =>{
    let body ='';
    let info =[];
    let total = 0,totalPagar = [];
    for(let i=0;i < data.length ;i++){  
        body += `
        <tr>
        <td class="row"><img src="${data[i].Productos.imagen}" alt=""></td>
        <td class="rows">${data[i].Productos.descripcion_producto}</td>
        <td class="rows">${data[i].Productos.precio_actual}</td>
        <td class="rows">${data[i].Productos.descuento}%</td>
        <td class="rows">
            <button onclick="handleSubtract(value)" style="cursor:pointer" value="${data[i].Productos.id_producto}" class="btnIcon" id="btnMinus">
                <span class="icon-minus"></span>
            </button>
                ${data[i].cantidad}
            <button class="btnIcon" style="cursor:pointer" id="btnPlus" onclick="handleAdd(value)" value="${data[i].Productos.id_producto}">
                <span class="icon-plus"></span>
            </button>
        </td>
        <td class="rows">
            <button onclick="handleEliminar(value)" style="cursor:pointer" value="${data[i].id_itemCarrito}" class="btnIcon" id="btnCancel">
                <span class="icon-cancel"></span>
            </button>
        </td>
        </tr>
        `;
        total+=subtotal(data[i].Productos.descuento,data[i].Productos.precio_actual,data[i].cantidad);
        totalPagar[i] = total
        info[i] = `
            <div class="group__item">
                <div class="item"><p>Producto: ${data[i].Productos.descripcion_producto}</p></div>
                <div class="item"><p>Precio: ${data[i].Productos.precio_actual}</p></div>
                <div class="item"><p>Cantidad: ${data[i].cantidad}</p></div>
                <div class="item"><p>Descuento: ${descuento(data[i].Productos.descuento,data[i].Productos.precio_actual,data[i].cantidad).toFixed(2)}</p></div>
                <div class="item"><p>Subtotal: ${subtotal(data[i].Productos.descuento,data[i].Productos.precio_actual,data[i].cantidad).toFixed(2)}</p></div>
            </div>
        `;
    }
    info +=`<p class="item__txt">Total: ${totalPagar[totalPagar.length - 1].toFixed(2)}</p>`

    document.getElementById('dato').innerHTML = body;
    document.getElementById('info').innerHTML = info;
}

const handleEliminar=(data)=>{
    fetch(`http://localhost:6001/api/carrito/eliminarProducto/${data}`,{ method: 'DELETE' })
        window.location.reload();
 
   
}
const handleAdd= async (data)=>{
    await fetch(`http://localhost:6001/api/carrito/updateProduct/${data}/add`,{ method: 'PUT' }).then(()=>{
        window.location.reload();
    });
    
   
}
const handleSubtract= async (data)=>{
    await fetch(`http://localhost:6001/api/carrito/updateProduct/${data}/subtract`,{ method: 'PUT' }).then(()=>{
        window.location.reload();
    });
   
}

let btnComprar = document.getElementById('btnComprar');

btnComprar.addEventListener('click',function (){
    'use strict';
    var resultado = window.confirm('Estas seguro?');
    if (resultado === true) {
        window.alert('Okay, si estas seguro.');
        window.location.reload();
        window.location.href = '/api/home';
        fetch(`http://localhost:6001/api/ventas/procesarCarrito?idUsuario=56`,{ method: 'POST'});
    } else { 
        window.alert('Cancelar');
        window.location.reload();
    }
})
