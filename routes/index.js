const express= require('express');
const router = express.Router();

const path = require('path');
const passport = require('passport');
const morgan = require('morgan');

const campos = require('../resources/files/campos');


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

 router.get('/signup', (req, res) => {
    res.render('signup');
  });
  
  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  })); 
  
  
  
  router.get('/profile',isAuthenticated, (req, res) => {
    res.render('profile');
  });
  
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  
  
  function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/')
  }


router.get('/insert',(req, res)=>{
    res.render('insert',{title:"Despacho producto lata",
        ID_Load:campos.ID_Load,
        CD_Destino:campos.CD_Destino,
        Tipo_Producto:campos.Tipo_Producto,
        Tipo_Vehiculo:campos.Tipo_Vehiculo,
        Modo_Cargue:campos.Modo_Cargue});
});

router.post('/insert',(req,res)=>{
    const{code, name, lastName, gender, dpto, town, email, phone } = req.body;
    const Id = campos.ID_Load.find( record => record.code == dpto ).name;
    const townAux = colombia.towns.find( record => record.code == town ).name;
    const city = townAux.concat( '-', dptoAux );
    const genAux = gender == 'F' ? "Femenino" : "Masculino";
    let newReg = {code, lastName, name, genAux, city, email, phone  };
    students.push(newReg);
    res.redirect('/');
});
  
 



module.exports = router;


