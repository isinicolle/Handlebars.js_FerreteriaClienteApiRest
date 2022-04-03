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
    res.render('crearcuenta');
});


module.exports=router; 