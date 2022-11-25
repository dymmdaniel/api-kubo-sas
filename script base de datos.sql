create schema kubodb;
use kubodb;
CREATE TABLE clasificacion (
    clasificacion_id     INTEGER NOT NULL auto_increment,
    clasificacion_nombre varchar(40),
    primary key(clasificacion_id)
);

CREATE TABLE pelicula (
    pelicula_id INTEGER NOT NULL auto_increment,
    titulo      varchar(75),
    descripcion Text,
    fecha        DATE,
    duracion    INTEGER,
    primary key(pelicula_id)
);

CREATE TABLE usuario_pelicula (
    usuario_usuario_id   INTEGER NOT NULL,
    pelicula_pelicula_id INTEGER NOT NULL
);

CREATE TABLE pelicula_clasificacion (
    pelicula_pelicula_id           INTEGER NOT NULL,
    clasificacion_clasificacion_id INTEGER NOT NULL
);

CREATE TABLE usuario (
    usuario_id INTEGER NOT NULL auto_increment,
    nombre     varchar(75),
    correo     varchar(75),
    contra     varchar(75),
    primary key(usuario_id)
);
ALTER TABLE usuario_pelicula ADD CONSTRAINT usuario_pelicula_pk PRIMARY KEY ( usuario_usuario_id,
                                                                  pelicula_pelicula_id );

ALTER TABLE usuario_pelicula
    ADD CONSTRAINT usuario_pelicula_pelicula_fk FOREIGN KEY ( pelicula_pelicula_id )
        REFERENCES pelicula ( pelicula_id );

ALTER TABLE pelicula_clasificacion ADD CONSTRAINT pelicula_clasificacion_pk PRIMARY KEY ( pelicula_pelicula_id,
                                                                  clasificacion_clasificacion_id );

ALTER TABLE usuario_pelicula
    ADD CONSTRAINT usuario_pelicula_usuario_fk FOREIGN KEY ( usuario_usuario_id )
        REFERENCES usuario ( usuario_id );

ALTER TABLE pelicula_clasificacion
    ADD CONSTRAINT pelicula_clasificacion_clasificacion_fk FOREIGN KEY ( clasificacion_clasificacion_id )
        REFERENCES clasificacion ( clasificacion_id );

ALTER TABLE pelicula_clasificacion
    ADD CONSTRAINT pelicula_clasificacion_pelicula_fk FOREIGN KEY ( pelicula_pelicula_id )
        REFERENCES pelicula ( pelicula_id );
        
        
insert into clasificacion (clasificacion_nombre) values('Terror');
insert into clasificacion (clasificacion_nombre) values('Suspenso');
insert into clasificacion (clasificacion_nombre) values('Drama');
insert into clasificacion (clasificacion_nombre) values('Comedia');
