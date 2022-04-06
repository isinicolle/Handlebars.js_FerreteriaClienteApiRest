fetch('http://localhost:6001/api/productos/buscarProducto?id_producto='+document.getElementById('idProd').value )
    .then(res =>{
        return res.json();
    })
    .then(data => mostrarData(data))
    .catch(error =>console.log('Error'));

const mostrarData = (data) =>{
    console.log(data);
    document.getElementById('imgProd').innerHTML=`
    <img src="${(data.imagen.includes('http')? data.imagen:'http://192.168.100.48:6001/img/'+data.imagen)}" id="" alt="" />`
    document.getElementById('precio').innerHTML=`Lps. ${data.precio_actual}`
    document.getElementById('descripcion').innerHTML=`${data.descripcion_producto}`
    document.getElementById('categoria').innerHTML=` ${data.Categorias.descripcion_categoria}`
    document.getElementById('marca').innerHTML=`  ${data.Marcas.descripcion_marca} `
    document.getElementById('InfoProductos').innerHTML=body
}
const onChange = ()=>{
  const textBox = document.getElementById('txtCantidad')
  if (textBox.value<0)
  textBox.value =0; 
  if (textBox.value>1000)
  textBox.value=1000
}

const  handleCarrito= async ()=>{

const idProd = document.getElementById('idProd').value;
const cantidad = document.getElementById('txtCantidad').value

await fetch(
  'http://localhost:6001/api/carrito/agregarProducto?idUsuario=56',{
      method: 'POST',
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'},
       body: JSON.stringify({
             
             idProducto:idProd ,
             Cantidad:Number(cantidad)
         
       })
   
      } ).then((data)=>{  console.log(data); alert('Producto agregado al carrito') });
}