

function activar(id,bandera)
{
   if (id=="nombre")
{
document.getElementById("nombre").disabled = false; 
document.getElementById("actualizar").disabled = false; 
 }
 else if (id=="correo")
{
document.getElementById("correo").disabled = false;  
document.getElementById("actualizar").disabled = false; 

}

 else  if (id=="contraseña" && document.getElementById("buttonpaswords").value =='Cambiar')
 {
   document.getElementById("actualizar").disabled = false; 
 document.getElementById("contrasenia").disabled = false; 
 document.getElementById("buttonpaswords").value = 'Confirmar'; 
 

}

else if(document.getElementById("buttonpaswords").value =='Confirmar') {

  document.getElementById("buttonpaswords").value = 'Cambiar';
  document.getElementById("actualizar").disabled = false; 
  document.getElementById("contrasenia").disabled = true; 

  actualizar();

  
}

}

function siu(){

console.log("SIMON")
}
