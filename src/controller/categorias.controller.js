const { response } = require("express");
const connection = require("../../database");

// GET CATEGORIA

function getCategoria(request, response) {

    let sql;
    if (request.query.id) {
        sql = "SELECT * FROM categorias WHERE id_categoria =" + request.query.id;
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.send(result);
            }
        });
    } else {
        sql = "SELECT * FROM categorias"
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                response.send(result);
            }
        });
    }
}

// POST CATEGORIA

function postCategoria(request, response) {

    let sql = "INSERT INTO categorias(nombre)" + "VALUES ('" + request.body.nombre + "')";
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

//PUT CATEGORIA

function putCategoria(request, response) {

    if (request.body.id_categoria != null) {

        let nombre = request.body.nombre;
        let params = [nombre];

        let sql = "UPDATE categorias SET nombre = COALESCE(?,nombre) WHERE id_categoria=" + request.body.id_categoria;
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

// DELETE CATEGORIA

function deleteCategoria(request, response) {

    let sql = "DELETE FROM categorias WHERE id_categoria=" + request.query.id_categoria;
    connection.query(sql, function (err, result) {
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
}

module.exports = { getCategoria, postCategoria, putCategoria, deleteCategoria }