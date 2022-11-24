const express= require('express');
const router = express.Router();


//Crear una pelicula
router.post('/', (req, res)=>{
    //const {titulo,descripcion,fecha,duracion} = req.body;
    //const newPelicula = new Pelicula({titulo,descripcion,fecha,duracion});
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('insert into pelicula set ?', [req.body],(err,rows)=>{
            if(err) return res.send(err);
            res.send('pelicula creada');
        });
    });
});

//Listar pelicula
router.get('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('select * from pelicula',(err,rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
     });
});

//Filtrar pelicula por titulo y categoria
router.get('/lista',(req,res)=>{
    res.send('Bienvenido a mi Api'); 
});
//Ordenar peliculas por fecha de estreno mas reciente a la mas antigua

// Obtener listado de novedades (fecha de estreno inferior a tres semanas)

// Marcar como vista la pelicula

// Listar peliculas que ya han visto

module.exports=router;