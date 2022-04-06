const { Router } = require('express');
const controladorCarrito = require('../controladores/controladorCarrito');
const router = Router();

//trabajando con rutas
router.get('/carritoCliente', controladorCarrito.MostrarCarrito);
router.post('/nuevoCarrito', controladorCarrito.nuevoCarrito);
router.post('/agregarProducto', controladorCarrito.agregarProducto);
router.put('/modificarProducto', controladorCarrito.modificarCarrito); 
router.delete('/eliminarProducto/:id', controladorCarrito.eliminarProducto);
router.get('/carritoItem/:id', controladorCarrito.buscarCarritoItem);
router.put('/updateProduct/:id/add', controladorCarrito.incrementar);
router.put('/updateProduct/:id/subtract', controladorCarrito.decrementar);
router.get('/find/:id',controladorCarrito.findCart);
module.exports=router; 