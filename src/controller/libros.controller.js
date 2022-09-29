const { response, request } = require("express");
const connection = require("../database");

// GET LIBRO

function getLibro(request, response) {
    console.log("entramos a get libro en el back")
    let sql;
    if (request.query.id_libro) {
        sql = "SELECT libros.*, GROUP_CONCAT(categorias.nombre SEPARATOR ', ') AS categorias FROM libros LEFT JOIN categorias_libros ON libros.id_libro = categorias_libros.id_libro LEFT JOIN categorias ON categorias_libros.id_categoria = categorias.id_categoria WHERE libros.id_libro=" + request.query.id_libro + " GROUP BY libros.id_libro";
        connection.query(sql, function (err, result) {
            if (err) {
                console.log(err);
            } else {

                response.send(result);
                console.log("Result en el back de get one: ")
                console.log(result)
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
function getLibroSencillo(request,response){    
    let sql;
    if (request.query.id_libro) {
        sql = "SELECT libros WHERE titulo=" + request.body.titulo
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
}
        



// POST CATEGORIAS LIBROS (Función usada para poder pasarle toda la info necesaria al servidor en un solo post con un segundo insert)
// Hay varias maneras de poder hacer esto como por ejemplo hacer una query con un trigger  para que se ejecute todo en la misma query a nivel de servidor
// Otra es ya poner limitadores desde el front.
// He optado por esta en función del tiempo, creando una primary key aleatoria de 9 dígitos para evitar repetición en una base de datos tan pequeña y después -
// - recupero esa misma id todo dentro de la misma función de post.

function postCategoriasLibro(request2, libroId) {
    let arrNum = [];
    for (let i = 0; i < request2.body.categorias.length; i++) {
        if (request2.body.categorias[i] != null) {
            arrNum.push(request2.body.categorias[i])
        }
    }
    console.log("arrNum: ")
    console.log(arrNum)
    for (let j = 0; j < arrNum.length; j++) {
        let sql = "INSERT INTO categorias_libros(id_libro,id_categoria)" + "VALUES(" + libroId + ", " + arrNum[j] + ")"

        connection.query(sql, function (err, result2) {
            if (err) {
                console.log(err);
            } else {
                console.log(result2)
            }
        });
    }
}

// POST LIBRO

function postLibro(request, response) {

    let generatedId = Math.floor(100000000 + Math.random(1) * 900000000);

    let sql = "INSERT INTO libros(id_libro,titulo,autor,portada,editorial,fechaPublicacion,tapa,sinapsis)" + "VALUES (" + generatedId + ",'" + request.body.titulo + "','" + request.body.autor + "','" + request.body.portada + "','" + request.body.editorial + "','" + request.body.fechaPublicacion + "','" + request.body.tapa + "','" + request.body.sinapsis + "')";

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
    postCategoriasLibro(request, generatedId);

}

function putCategoriasLibro(request3, id_libro) {
    let arrNum = [];
    let titulo = request3.body.titulo;
    for (let i = 0; i < request3.body.categorias.length; i++) {
        if (request3.body.categorias[i] != null) {
            arrNum.push(request3.body.categorias[i])
        }
    }   
    if (arrNum.length > 0) {
        let sql = "DELETE categorias_libros FROM categorias_libros JOIN libros ON libros.id_libro = categorias_libros.id_libro WHERE libros.titulo = " + "'" + titulo + "'; "

        connection.query(sql, function (err3, result3) {
            if (err3) {
                console.log(err3);
            } else {
                console.log(result3)
            }
        });
    } else {
        console.log("No hay categorías nuevas")
    }
    for (let j = 0; j < arrNum.length; j++) {

        let sql2 = "INSERT INTO categorias_libros(id_libro,id_categoria)" + " VALUES (" + id_libro + "," + arrNum[j] + ")";
        connection.query(sql2, function (err4, result4) {
            if (err4) {
                console.log(err4);
            } else {
                console.log(result4)
            }
        });
    }
}
//PUT LIBRO

function putLibro(request, response) {

    if (request.body.titulo != null) {

        let titulo = request.body.titulo;
        let autor = request.body.autor;
        let portada = request.body.portada;
        let editorial = request.body.editorial;
        let fechaPublicacion = request.body.fechaPublicacion;
        let tapa = request.body.tapa;
        let sinapsis = request.body.sinapsis;
        let idLibro;
        let id_libroSel = "SELECT id_libro FROM libros WHERE titulo=" + "'" + request.body.titulo + "'";
        connection.query(id_libroSel, function (err5, result5) {
            if (err5) {
                console.log(err5);
            } else {
                console.log(result5)
                idLibro = result5[0].id_libro;
            }
        });

        let params = [titulo, autor, portada, editorial, fechaPublicacion, tapa, sinapsis];
        let sql = "UPDATE libros SET titulo = COALESCE(?, titulo), " + "autor = COALESCE(?,autor), " + "portada = COALESCE(?,portada), " + "editorial = COALESCE(?, editorial), "
            + "fechaPublicacion = COALESCE(?, fechaPublicacion), " + "tapa = COALESCE(?, tapa), " + "sinapsis = COALESCE(?, sinapsis) WHERE titulo= " + "'" + titulo + "'";
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                putCategoriasLibro(request,idLibro)
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

function deleteLibro(request, response) {


    let sql = "DELETE FROM libros WHERE id_libro=" + request.query.id_libro;
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

module.exports = { getLibro, postLibro, putLibro, deleteLibro }