const express = require('express');
const router = express.Router();  //Este es otro modulo de express 
//SIRVE PARA GUARDAR RUTAS Y MANTENERLAS EN ARCHIVOS SEPARADOS

router.get('/', (req,res)=>{
    // res.sendFile(path.join(__dirname,'views/index.html'));|| CON ESTA RESPUESTA DEL SERVIDOR (app.get(res)) 
    //se regresa a la peticion un html con lo que necesita para la pagina web
    res.render('index.html', {title : 'Inicio'});//al usar render ya sabe que se busca un ejs
});

router.get('/contact', (req, res)=>{
    res.render('contact.html',{title:'Contacto'});
});
router.get('/events', (req, res)=>{
    res.render('events.html',{title:'Eventos | Anuncios'});
});
router.get('/media', (req, res)=>{
    res.render('media.html',{title:'Videos'});
});
router.get('/whowe', (req, res)=>{
    res.render('whowe.html',{title:'¿Quienes Sómos?'});
});
router.get('/blog', (req, res)=>{
    res.render('blog.html',{title:'Blog'});
});
router.get('/register', (req, res)=>{
    res.render('register.html',{title:'Registrate'});
});
router.get('/signin', (req, res)=>{
    res.render('signin.html',{title:'Iniciar Sesion'});
});
module.exports = router;