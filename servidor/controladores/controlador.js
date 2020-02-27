//importar la conexion a la base de datos -Enio
var con = require('../lib/conexionbd');

//funcion para devolver las peliculas - Enio
function obtenerPeliculas(req, res) {
    var sql = 'selec * from peliculas'
    con.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(404).send('Hubo un error en la consulta');
        }
        var response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
        
    });
}
    //Se expportan las funciones creadas
    module.exports = {
        obtenerPeliculas: obtenerPeliculas
    };