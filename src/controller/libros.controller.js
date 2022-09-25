const { response } = require("express");
const connection = require("../database");

// GET LIBRO

function getLibro(request, response) {

    let sql;
    if (request.query.id) {
        sql = "SELECT libros.*, GROUP_CONCAT(categorias.nombre SEPARATOR ', ') AS categorias FROM libros LEFT JOIN categorias_libros ON libros.id_libro = categorias_libros.id_libro LEFT JOIN categorias ON categorias_libros.id_categoria = categorias.id_categoria WHERE libros.id_libro=" + request.query.id + " GROUP BY libros.id_libro";       
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.send(result);
            }
        });
    } else {
        sql = "SELECT libros.*, GROUP_CONCAT(categorias.nombre SEPARATOR ', ') AS categorias FROM libros JOIN categorias_libros ON libros.id_libro = categorias_libros.id_libro JOIN categorias ON categorias_libros.id_categoria = categorias.id_categoria GROUP BY libros.id_libro"
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.send(result);
            }
        });
    }
}

// POST LIBRO

function postLibro(request, response) {


    let sql = "INSERT INTO libros(titulo,autor,portada,editorial,fechaPublicacion,tapa,sinapsis)" + "VALUES ('" + request.body.titulo + "','" + request.body.autor + "','" + request.body.portada + "','" + request.body.editorial + "','" + request.body.fechaPublicacion + "','" + request.body.tapa + "','" + request.body.sinapsis + "')";  
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result)
            if (result.insertId) {
                response.send(String(result.insertId))
            } else {
                response.send(result)
            }
        }
    });
}

//PUT LIBRO

function putLibro(request, response) {

    if (request.body.id_libro != null) {

        let titulo = request.body.titulo;
        let autor = request.body.autor;
        let portada = request.body.portada;
        let editorial = request.body.editorial;
        let fechaPublicacion = request.body.fechaPublicacion;
        let tapa = request.body.tapa;
        let sinapsis = request.body.sinapsis;

        let params = [titulo, autor, portada, editorial, fechaPublicacion, tapa, sinapsis];
        let sql = "UPDATE libros SET titulo = COALESCE(?,titulo) , " + "autor = COALESCE(?, autor), " + "portada = COALESCE(?,portada), " + "editorial = COALESCE(?, editorial), " 
                + "fechaPublicacion = COALESCE(?, fechaPublicacion), " + "tapa = COALESCE(?, tapa), " + "sinapsis = COALESCE(?, sinapsis) WHERE id_libro=" + request.body.id_libro;        
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                if (result.insertId) {
                    response.send(String(result.insertId));
                } else {
                    response.send(result);
                }
            }
        });
    } else {
        console.log("Id no válido")
    }

}

// DELETE LIBRO

function deleteLibro(request, response){

    
    let sql = "DELETE FROM libros WHERE id_libro=" + request.query.id_libro;  
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if(result.insertId) {
                response.send(String(result.insertId));
            } else {
                response.send(result);
            }
        }
    });
}

module.exports = { getLibro, postLibro, putLibro, deleteLibro }