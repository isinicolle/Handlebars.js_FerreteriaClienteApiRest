function activar(id)
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

 else  if (id=="contraseña")
 {
   document.getElementById("actualizar").disabled = false; 
 document.getElementById("contrasenia").disabled = false; 
 document.getElementById("newpass").disabled = false;  
 document.getElementById("confnewpass").disabled = false;  
}
}

function siu(){

console.log("SIMON")
}