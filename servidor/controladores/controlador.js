//importar la conexion a la base de datos -Enio
var conexion = require('../lib/conexionbd');

//funcion para devolver las peliculas - Enio
function obtenerPeliculas(req, res) {
    //var peliculas = req.query.peliculas;
    conexion.connect()

    console.log("conectado!")
    // se obtiene el query param peliculas
    var sql = 'select * from peliculas;'
    
    conexion.query(sql, function (error, resultado, fields) {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(500).send('Hubo un error en la consulta');
        }
        var response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
    });

    // conexion.destroy()
}
    //Se expportan las funciones creadas - Enio
    module.exports = {
        obtenerPeliculas: obtenerPeliculas
    };