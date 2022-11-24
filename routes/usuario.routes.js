const express= require('express');
const router = express.Router();

// Crear usuario
router.post('/crear',(req, res) => {
    req.getConnection((err,conn)=>{
        if(err) return res.send(err);
        conn.query('insert into usuario set ?', [req.body],(err,rows)=>{
            if(err) return res.send(err);
            res.send('usuario creada');
        });
    });
});

module.exports=router;