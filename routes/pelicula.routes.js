const express= require('express');
const router = express.Router();


//Crear una pelicula
router.post('/', (req, res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        var pelicula ={
            titulo : req.body.titulo,
            descripcion : req.body.descripcion,
            fecha : req.body.fecha,
            duracion : req.body.duracion,
        }

        conn.query('insert into pelicula set ?',pelicula,(err,rows)=>{
            if(err) return res.send(err);
            conn.query('select pelicula_id from pelicula order by pelicula_id desc limit 1',(err,rows)=>{
                if(err) return res.send(err);
                var pelicula_pelicula_id=rows[0].pelicula_id;
                var pelicula_clasificacion = {
                    pelicula_pelicula_id: pelicula_pelicula_id,
                    clasificacion_clasificacion_id: req.body.clasificacion_id
                }
                conn.query('insert into pelicula_clasificacion set ?',pelicula_clasificacion,(err,rows)=>{
                    if(err) return res.send(err);
                        res.json('Pelicula creada');
                });
            });
        });
    });
});

//Listar peliculas
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
router.get('/:clasificacion_id/:titulo',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('select pelicula.* from pelicula '+
        'inner join pelicula_clasificacion '+
        'on pelicula_clasificacion.pelicula_pelicula_id =  pelicula.pelicula_id '+
        'where  pelicula_clasificacion.clasificacion_clasificacion_id = ? '+
        'and pelicula.titulo = ?',[req.params.clasificacion_id,req.params.titulo],(err,rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
     });
});

//Ordenar peliculas por fecha de estreno mas reciente a la mas antigua
router.get('/reciente',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('select * from pelicula order by fecha asc',(err,rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
     });
});
// Obtener listado de novedades (fecha de estreno inferior a tres semanas)
router.get('/novedades',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('select * from pelicula where fecha >= date_sub(now(),interval 504 HOUR)',(err,rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
     });
});
// Marcar como vista la pelicula
router.post('/marcar',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        var usuario_pelicula  = {
            usuario_usuario_id: req.body.usuario_id,
            pelicula_pelicula_id: req.body.pelicula_id
        }
        conn.query('insert into usuario_pelicula set ?',usuario_pelicula,(err,rows)=>{
            if(err) return res.send(err);
            res.json('Se ha marcado la pelicula como vista para el usuario');
        });
     });
});



module.exports=router;