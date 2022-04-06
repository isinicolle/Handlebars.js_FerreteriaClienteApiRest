const { Router } = require('express');
const controladorProducto = require('../controladores/controladorProducto');
const router = Router();


router.get('/',(req,res)=>{ 
    res.render('home');
});
router.get('/buscarProducto');

router.get('/nosotros', (req,res)=>{
    res.render('nosotros');
});

router.get('/galeria', (req,res)=>{
    res.render('galeria');
});

router.get('/contactanos', (req,res)=>{
    res.render('contactanos');
});

router.get('/iniciarsesion', (req,res)=>{
    res.render('iniciarsesion');
});

router.get('/crearcuenta', (req,res)=>{
    titulo = "Crea tu nueva cuenta"
    res.render('crearcuenta', {titulo});
});

router.get('/crearcuenta2', (req,res)=>{
    titulo = "Ya casi falta poco"
    res.render('crearcuenta2', {titulo});
});

router.get('/recoverycontra', (req, res) => {
    res.render('recoverycontra');
});

router.get('/miperfil', (req,res)=>{
    res.render('miperfil');
});

router.get('/buscarProducto');

router.get('/carrito', (req,res)=>{
    res.render('carrito');
});

module.exports=router; 
