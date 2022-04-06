const { PrismaClient } = require("@prisma/client");
const { parse } = require("dotenv");
const res = require("express/lib/response");
const mensaje = require("../configuraciones/mensaje");
const prisma = new PrismaClient();
const modeloCarrito = prisma.carrito;
const modeloItemCarrito = prisma.carritoItem;
const modeloProductos = prisma.productos;

exports.MostrarCarrito= async (req,res,next)=>{
    let {idUsuario} = req.query;
    console.log(idUsuario);
    if (!idUsuario || idUsuario==undefined){
    mensaje('Error al iniciar sesion',200,idUsuario,res);
    next(mensaje);
    }else
    {
        idUsuario = parseInt(idUsuario);
    let Carrito = await modeloCarrito.findFirst({
        where:{id_usuarioCliente:idUsuario},
        select:{CarritoItem:{select:{Productos:true,Productos:{include:{Marcas:true,Categorias:true}},cantidad:true}, }
            },
        });
    let carritoItem = await modeloItemCarrito.findMany({
            where:{
                id_Carrito:Carrito.id_carrito
            }
        });
    let productos = await modeloProductos.findMany({
        where:{CarritoItem:{some:{Productos:{id_producto:carritoItem.id_producto}}}}
    })
    Carrito = await calcularPrecio(Carrito);
    res.json({Carrito,carritoItem,productos});
} 
};  

exports.nuevoCarrito= async(req,res)=>{
    let {idUsuario} = req.query;
    idUsuario = parseInt(idUsuario);
    await modeloCarrito.create({data:{
        usuariosClientes:{connect:{id_usuarioCliente:idUsuario}}
        
    }}).then((data)=>{
        res.json("Carrito creado");
        console.log(data)
    }).catch((err)=>{
        res.json("Ocurrio un error");
        console.log(err);
    }); 
};
exports.agregarProducto = async(req,res)=>{
    let {idUsuario} = req.query;
    let {idProducto} = req.body; 
    idUsuario = parseInt(idUsuario);
    idProducto = parseInt(idProducto); 
    let{Cantidad} = req.body;
    const Carrito = await modeloCarrito.findFirst({where:{id_usuarioCliente:idUsuario}});
    const buscarProd = await modeloItemCarrito.findMany({
        where:{
            id_Carrito:Carrito.id_carrito,
            id_producto:idProducto 
        } 
    });
    if (buscarProd.length>0)
    {
        Cantidad += buscarProd[0].cantidad;
        modeloItemCarrito.updateMany({
            where:{
                id_Carrito:Carrito.id_carrito,
                id_producto:idProducto
            },
            data:{
                cantidad:Cantidad
            }
        }).then((data)=>{
            res.send(data);

        }).catch((err)=>{
            res.send("Se encontró un error");
            console.log(err);
        })
    
        
    } else
    { 
        modeloItemCarrito.create({data:{
        Carrito:{connect:{id_carrito:Carrito.id_carrito}},
        Productos:{connect:{id_producto:idProducto}},
        cantidad:Cantidad
    }}).then((data)=>{
        res.json("Producto agregado");
        console.log(data);
    }).catch((err)=>{
        res.json("Error");
        console.log(err);
    });
}
}

exports.modificarCarrito = async(req,res)=>{
    let {idUsuario} = req.query;
    let {idProducto} = req.body;
    idUsuario = parseInt(idUsuario);
    idProducto = parseInt(idProducto);
    const{Cantidad} = req.body;
    const Carrito = await modeloCarrito.findFirst({where:{id_usuarioCliente:idUsuario}});
    modeloItemCarrito.updateMany({
        where:{ 
                Productos:{id_producto:idProducto},
               Carrito:{ id_carrito:Carrito.id_carrito}
        },
        data:{
        cantidad:Cantidad || undefined
    }}).then((data)=>{
        res.json("Producto modificado");
        console.log(data);
    }).catch((err)=>{
        res.json("Error ");
        console.log(err);
    });
};
    async function  calcularPrecio(Carrito){
            if(!Carrito){
                return 0
            }else{

                let suma=0;
                Carrito.CarritoItem.forEach(
                    async function (elemento){
                        elemento.total=elemento.Productos.precio_actual*elemento.cantidad;
                        suma+=elemento.total;
                    }
                );
                Carrito.totalCarrito=suma;
                return Carrito;
            }
}
exports.buscarCarritoItem = async (req,res,next) =>{
    try {
        const id_Carrito = parseInt(req.params.id);
        const cartItem = await modeloItemCarrito.findMany({
            where:{id_Carrito}
        });
        res.send(cartItem);
    } catch (error) {
        next(error);
    }
}
exports.eliminarProducto = async (req,res,next) =>{
    try {
        const itemId = parseInt(req.params.id);
        const items =  await modeloItemCarrito.deleteMany({
            where:{id_itemCarrito:itemId}
        });
    } catch (error) {
        next(error);
    }
}
exports.incrementar = async (req,res,next) =>{
    try {
        const id_producto = parseInt(req.params.id);
        const productId = await modeloItemCarrito.updateMany({
            where:{id_producto},
            data:{
                cantidad: {increment:1}
            }
        }).then((data)=>{
            res.send(data);
        }).catch((error)=>{
            console.log(error);
        });
        console.log(productId);
    } catch (error) {
        next(error);
    }
}
exports.incrementar = async (req,res,next) =>{
    try {
        const id_producto = parseInt(req.params.id);
        const productId = await modeloItemCarrito.updateMany({
            where:{id_producto},
            data:{
                cantidad: {increment:1}
            }
        }).then((data)=>{
            res.send(data);
        }).catch((error)=>{
            console.log(error);
        });
        console.log(productId);
    } catch (error) {
        next(error);
    }
}
exports.decrementar = async (req,res,next) =>{
    try {
        const id_producto = parseInt(req.params.id);
        const productId = await modeloItemCarrito.updateMany({
            where:{AND:[
                {
                    cantidad:{gt:1},
                    id_producto
                }
            ]},
            data:{
                cantidad: {decrement:1}
            }
        }).then((data)=>{
            res.send(data);
        }).catch((error)=>{
            console.log(error);
        });
        console.log(productId);
    } catch (error) {
        next(error);
    }
}

exports.findCart = async (req,res,next) => {
    try {
        const id_carrito = parseInt(req.params.id);
        const cartId = await modeloItemCarrito.findMany({
            where:{
                Carrito:{id_carrito}
            },
            select:{Productos:true,Carrito:true,cantidad:true,id_itemCarrito:true}
        });
        res.send(cartId);
    } catch (error) {
        next(error);
    }
}