var mysql = require('mysql');
var db;
var settings = {
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'crudapp'
};

function connectDatabase(){
    if(!db){
        db = mysql.createConnection(settings);
        db.connect(function(err){
            if(!err){
                console.log("Databse created!");
            } else {
                console.log("Error Database connection!"); 
            }

        })
    }
    return db;
}

module.exports = connectDatabase();