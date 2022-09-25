const mysql = require("mysql2");

const connection = mysql.createConnection(
{
    host        :"myshoulder.cdvg9i8dvcl6.eu-west-3.rds.amazonaws.com",
    user        :"ComboWombo",
    password    :"ComboWombo123!",
    database    :"tekneiLibrary"
});

connection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log("Conexión establecida")
    }
});

module.exports = connection;