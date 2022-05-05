const express = require('express');
const { url } = require('inspector');
const app = express();//ESTA VARIABLE ES EL SERVIDOR

const path = require('path');//une directorios y el ve si estas en windows o linux

// CARGAR ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));
var publicPath = path.resolve(__dirname, 'public');
//CONFIGURACIONES DE EXPRESS

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views')); //CONFIGURAR LAS VIEWS QUE ESTA EN ESTA DIRECCION
app.engine('html', require('ejs').renderFile);//SE AVISA QUE SE USARA LA EXTENCION HTML EN LAS PLANTILLAS 
//PERO QUE AUN ASI SE REQUIEREN PROCESAR POR EJS se agrega la extencion html en las rutas
app.set('view engine', 'ejs');//MOTOR DE PLANTILLAS

//MODLEWARES FUNCIONES QUE SE EJECUTAN ANTES DE QUE LA RUTA PROCESE ALGO

//RUTAS
app.use(require('./routes/index'));

app.listen(app.get('port'), () => {//EL SERVIDOR ESCUCHA LO QUE PASSA POR PUERTO 3000
    console.log('servidor en puerto', app.get('port'));
});