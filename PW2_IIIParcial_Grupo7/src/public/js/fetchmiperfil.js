




fetch('http://192.168.0.107:6001/api/usuarioCliente/buscarUsuarioCliente?id_usuarioCliente=2')
.then(res =>{
    return res.json();
})
.then(data => mostrarData(data))
.catch(error =>console.log('Error'));

const mostrarData = (data) =>{  
 document.getElementById("nombre").value = data.nombre_usuario
 document.getElementById("correo").value = data.correo_usuario
 document.getElementById("contraseña").value = data.contraenia_usuario
}

function actualizar(){

    fetch('http://192.168.0.107:6001/api/usuarioCliente/buscarUsuarioCliente?id_usuarioCliente=2')
    .then(res =>{
    return res.json();
        })
    .then(data => actualizarcliente(data))
    
}

const actualizarcliente = (data) =>{
    let nombre_usuario =document.getElementById("nombre").value 
    let correo_usuario =document.getElementById("correo").value 
    let contraenia_usuario=data.contraenia_usuario
    id_cliente=data.id_cliente

    if( document.getElementById("contrasenia").value !=""){

        contraenia_usuario= document.getElementById("contrasenia").value  
        
        let contraenia_usuario1=data.contraenia_usuario
         if(passwordHash==contraenia_usuario1){

          console.log("correcto");
         }else
         {
            console.log("incorrecto");
         }


    }


   /* 
  fetch('http://192.168.0.107:6001/api/usuarioCliente/actualizarUsuarioCliente?id_usuarioCliente=2',
  {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
        nombre_usuario:nombre_usuario,
        contraenia_usuario:contraenia_usuario,
        id_cliente:id_cliente,
        correo_usuario:correo_usuario  
   })
  }
  
  )*/
}
 

