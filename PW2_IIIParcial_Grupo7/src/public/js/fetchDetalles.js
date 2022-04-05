fetch('http://localhost:6001/api/productos/buscarProducto?id_producto='+document.getElementById('idProd').value )
    .then(res =>{
        return res.json();
    })
    .then(data => mostrarData(data))
    .catch(error =>console.log('Error'));

const mostrarData = (data) =>{
    console.log(data);
    let body =`
        <div id="imgProd" class="imagenProducto">
      <img src="${(data.imagen.includes('http')? data.imagen:'http://192.168.100.48:6001/img/'+data.imagen)}" alt="" />
    </div>
  <div id="descripciones" class="descripciones">
    <div id="">
      Lps. ${data.precio_actual}
    </div>
    <div>
      ${data.descripcion_producto}
    </div>
    <form class="formulario">
      <div class="cantidad">
        <label for="txtCantidad">
          Cantidad
        </label>
        <input id="txtCantidad" type="number" />
      </div>
      <input type="button" class="button" value="Agregar al carrito" />

    </form>
      <table>
          <tbody>

                      <tr>
                          <td class="rowHeader">
                          Categoria   
                          </td>
                          <td>
                         ${data.Categorias.descripcion_categoria}
                          </td>
                      </tr>
                        <tr>
                          <td class="rowHeader">
                          Marca   
                          </td>
                          <td>
                          ${data.Marcas.descripcion_marca} 
                          </td>
                      </tr>
          </tbody>
      </table>
  </div>
    
    `
    document.getElementById('InfoProductos').innerHTML=body
}