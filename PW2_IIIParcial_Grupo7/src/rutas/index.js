const { Router } = require('express');
const {render} = require('express/lib/response');
const router = Router();

//trabajando con rutas
router.get('/', (req,res) => {
    res.render('home');
});

module.exports=router; 