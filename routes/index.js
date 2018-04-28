var express = require('express');
var router = express.Router();
var connection = require('../config/connection')

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM user',function(err,rows){
    if(err) throw err;
    
    res.render('index', {users:rows});
  });
  
});

router.post('/adduser',function(req,res){
  const userdata = {
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email,
    prof  : req.body.prof
  };
  connection.query("INSERT INTO user SET ?",userdata,function(err,result){
  if(err) throw err;
  res.redirect('/');
  });
});

router.get('/deleteUser/:id',function(req,res){
  var userid = req.params.id;
  connection.query("DELETE FROM user WHERE id = ?",[userid],function(err,rows){
    if(err) throw err;
    res.redirect('/');
  } );
});

router.get('/update/:id',function(req,res){
  var userid = req.params.id;
  connection.query("SELECT * FROM user WHERE id = ?",[userid],function(err,rows){
    if(err) throw err;
    res.render('update',{userdata:rows});
  });
});

router.post('/updateUser/:id',function(req,res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var prof  = req.body.prof;
  var updateid = req.params.id;
  connection.query('UPDATE user SET fname=?,lname=?,email=?,prof=? WHERE id=?',[fname,lname,email,prof,updateid],function(err,respond){
      if(err) throw err;
      res.redirect('../../');
  });
});

module.exports = router;
