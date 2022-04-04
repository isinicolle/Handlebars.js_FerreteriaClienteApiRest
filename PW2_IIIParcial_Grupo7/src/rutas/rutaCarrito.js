const { Router } = require('express');
const controladorCarrito = require('../controladores/controladorCarrito');
const router = Router();

//trabajando con rutas
router.get('/carritoCliente', controladorCarrito.MostrarCarrito);
router.post('/nuevoCarrito', controladorCarrito.nuevoCarrito);
router.post('/agregarProducto', controladorCarrito.agregarProducto);
router.put('/modificarProducto', controladorCarrito.modificarCarrito); 
router.delete('/eliminarProducto/:id', controladorCarrito.eliminarProducto);
module.exports=router; 