const express = require('express');
const mysql = require('mysql');
const myconn =  require('express-myconnection');
const app = express();

const usuarioRouter = require('./routes/usuario.routes');
const peliculaRouter = require('./routes/pelicula.routes');

const dbOptions={
    host:'us-cdbr-east-06.cleardb.net',
    port:'3306',
    user:  'b633d922df50b3',
    password: '8c6d6941',
    database: 'heroku_5e5e20014cbe52f'
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
// mysql://b633d922df50b3:8c6d6941@us-cdbr-east-06.cleardb.net/heroku_5e5e20014cbe52f?reconnect=true