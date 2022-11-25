const express= require('express');
const router = express.Router();

// Crear usuario
router.post('/',(req, res) => {
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('insert into usuario set ?', [req.body],(err,rows)=>{
            if(err) return res.send(err);
            res.send('usuario creado');
        });
    });
});
// Listar peliculas que ya han visto
router.get('/vista/:usuario_id',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('select pelicula.* from pelicula '+
        'inner join usuario_pelicula '+
        'on usuario_pelicula.pelicula_pelicula_id =  pelicula.pelicula_id '+
        'where  usuario_pelicula.usuario_usuario_id = ? ',[req.params.usuario_id],(err,rows)=>{
            if(err) return res.send(err);
            res.json(rows);
        });
     });
});


module.exports=router;