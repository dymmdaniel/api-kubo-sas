const express = require('express');
const mysql = require('mysql');
const myconn =  require('express-myconnection');
const app = express();

const usuarioRouter = require('./routes/usuario.routes');
const peliculaRouter = require('./routes/pelicula.routes');

const dbOptions={
    host:process.env.DB_HOST || 'localhost',
    port:process.env.DB_PORT || '3306',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_DATABASE || 'kubodb'
}

// Middleware
app.use(myconn(mysql,dbOptions,'single'));
app.use(express.json());

// Rutas
app.use('/api/usuario',usuarioRouter);
app.use('/api/pelicula',peliculaRouter);


//Configuracion de puerto y su respectiva escucha
app.set('port',process.env.PORT || 4000);

app.listen(4000,()=>{
    console.log('Api corriendo en el puerto:', app.get('port'));
});


// Falta la paginacion.