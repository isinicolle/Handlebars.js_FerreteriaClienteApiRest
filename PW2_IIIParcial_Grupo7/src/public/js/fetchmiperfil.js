fetch(
  "http://localhost:6001/api/usuarioCliente/buscarUsuarioCliente?id_usuarioCliente=56"
)
  .then((res) => {
    return res.json();
  })
  .then((data) => mostrarData(data))
  .catch((error) => console.log("Error"));

const mostrarData = (data) => {
  document.getElementById("nombre").value = data.nombre_usuario;
  document.getElementById("correo").value = data.correo_usuario;
  document.getElementById("contraseña").value = data.contraenia_usuario;
};

function actualizar() {
  fetch(
    "http://localhost:6001/api/usuarioCliente/buscarUsuarioCliente?id_usuarioCliente=56"
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => actualizarcliente(data));
}

const actualizarcliente = (data) => {
  let nombre_usuario = document.getElementById("nombre").value;
  let correo_usuario = document.getElementById("correo").value;
 

  let contraenia_usuario 
  id_cliente = data.id_cliente;

 
  if (document.getElementById("contrasenia").value != "") {
    contraenia_usuario = document.getElementById("contrasenia").value;
 
    if(document.getElementById("buttonpaswords").value =='Cambiar'){
        
    fetch(
      "http://localhost:6001/api/usuarioCliente/verificarcontrasenia?id_usuarioCliente=56&contraenia_usuario_envio=" +
        contraenia_usuario
    )
      .then((res) => {
        return res.text();
      })

      .then((result) => actulizarcontrasenia(result))
      .catch((error) => console.log("error", error));
    }

    

  }



  const actulizarcontrasenia = (result) => {

    
    if (result == "contraseña incorrecta") {
      alert("Contraseña incorrecta");
      document.getElementById("contrasenia").value = "";
    } else {
      document.getElementById("newpass").disabled = false;
      document.getElementById("confnewpass").disabled = false;
      document.getElementById("contrasenia").disabled = true;
     if(document.getElementById("confnewpass").value=="" || document.getElementById("newpass").value==""){
         
        alert("Ingrese los nuevos datos de la contraseña");
     }else{
      
        if(document.getElementById("confnewpass").value== document.getElementById("newpass").value){
               let nueva_pasword
               nueva_pasword= document.getElementById("newpass").value


               fetch('http://localhost:6001/api/usuarioCliente/actualizarClave?id_usuarioCliente=56',
               {
                 method: "PUT",
                 headers: {
                   Accept: "application/json",
                   "Content-Type": "Application/json",
                 },
                 body: JSON.stringify({
                     
                     contraenia_usuario:nueva_pasword,
                    
                })
               }
               
               )

            alert("su cambio su contraseña");
            document.getElementById("newpass").disabled = true;
            document.getElementById("confnewpass").disabled = true;
            document.getElementById("contrasenia").value = "";
            document.getElementById("newpass").value = "";
            document.getElementById("confnewpass").value = "";

        }else{

            alert("Los datos no coinciden");

        }

     }
      
    }

  };

  alert("Datos Actualizados")
  document.getElementById("correo").disabled = true;
  document.getElementById("nombre").disabled = true
  
  fetch('http://localhost:6001/api/usuarioCliente/updateusuarioCliente?id_usuarioCliente=56',
  {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "Application/json",
    },
    body: JSON.stringify({
        nombre_usuario:nombre_usuario,
       
        id_cliente:id_cliente,
        correo_usuario:correo_usuario  
   })
  }
  
  )

;
};
