//importar la conexion a la base de datos -Enio
const conexion = require('../lib/conexionbd');

//funcion para devolver las peliculas - Enio
obtenerPeliculas = (req, res) => {
    conexion.connect()

    // se obtiene el query param peliculas
    //let sql = 'select * from pelicula;'
    let query = 'select * from pelicula;'

    const anio = req.query.anio;
    const titulo = req.query.titulo;
    const genero = req.query.genero;
    const orden = req.query.columna_orden;
    const pagina = req.query.pagina;
    const cantidad = req.query.cantidad;

    //se filtra por titulo, genero y año
    (titulo && genero && anio) ? query += ` WHERE genero_id = ${genero} AND titulo LIKE "\%${titulo}\%" AND anio = ${anio}`: false;

    (titulo && !genero && anio) ? query += ` WHERE titulo LIKE "\%${titulo}\%" AND anio = ${anio}`: false;
    (titulo && genero && !anio) ? query += ` WHERE genero_id = ${genero} AND titulo LIKE "\%${titulo}\%"`: false;
    (!titulo && genero && anio) ? query += ` WHERE genero_id = ${genero} AND anio = ${anio}`: false;

    (genero && !titulo && !anio) ? query += ` WHERE genero_id = ${genero}`: false;
    (titulo && !genero && !anio) ? query += ` WHERE titulo LIKE "\%${titulo}\%"`: false;
    (anio && !titulo && !genero) ? query += ` WHERE anio = ${anio}`: false;

    //Orden
    switch (orden) {
        case 'titulo':
            query += ` ORDER BY titulo `
            break;
        case 'anio':
            query += ` ORDER BY anio`
            break;
        case 'puntuacion':
            query += ` ORDER BY puntuacion`
            break;
        default:
            break;
    };

    conexion.query(query, (error, resultado) => {

        let limitedQuery = query += ` LIMIT ${(limite) * cantidad},${cantidad}`;
        conexion.query(limitedQuery, (error_, resultado_) => {

            let peliculas = {
                peliculas: resultado_,
                total: resultado.length,
                
            }

            if (error) {
                console.log('No funciona');
                console.log(error_);
    
            } else {
                res.send(peliculas)      
            }
        })
    })
}

generos = (req, res) =>{
    let query = 'SELECT * FROM genero;'

    conexion.query(query, (error, resultado) =>{

        let generos = {
            generos: resultado,
        }

        if (error) {
            console.log('No funciona');
            console.log(err);

        } else {
            res.send(generos)
        }
    })
}

infoPeliculas = (req, res) => {
    const id = req.params.id;
    let query = 'SELECT * FROM pelicula JOIN genero ON genero_id = genero.id WHERE pelicula.id = ${id}'

    conexion.query(query, (error, resultado) => {

        if (error) {
            console.log ('No funciona 2');
            console.log(error);

        } else {
            query = 'SELECT * FROM actor_pelicula JOIN actor_id = actor.id WHERE pelicula.id = ${id}'

            conexion.query(query, (_error, _resultado) => {

                if (_error) {
                    console.log('No funciona 3');
                    console.log(_err);

                } else {
                    var data = {
                        pelicula: resultado[0],
                        actores: _resultado
                    };

                    res.send(data);


                }
            })
        }
    })
}

seguerenciaPeliculas = (req, res) => {
    const genero = req.query.genero;
    const anio_inicio = req.query.anio_inicio;
    const anio_fin = req.query.anio_fin;
    const puntuacion = req.query.puntuacion;


    //Query por defecto
    let query = "SELECT pelicula.*, genero.nombre FROM pelicula JOIN genero ON pelicula.genero_id = genero.id";
    //Si tengo seleccionado un genero 
    (genero) ? query += ` where genero.nombre = '${genero}'` : false;
    //Si tengo seleccionado un genero y 'Estreno' o 'Clásica'
    (anio_inicio && anio_fin && genero) ? query += ` and anio BETWEEN '${anio_inicio}' and '${anio_fin}'` : false;
    //Si tengo seleccionado 'Estreno' o 'Clásica' pero sin genero en particular
    (anio_inicio && anio_fin && !genero) ? query += ` WHERE anio BETWEEN '${anio_inicio}' and '${anio_fin}'` : false;
    //Si tengo seleccionado un genero y puntuación
    (puntuacion && genero) ? query += ` and puntuacion >= ${puntuacion}` : false;
    //Si tengo seleccionado puntuación pero sin género
    (puntuacion && !genero) ? query += ` WHERE puntuacion >= ${puntuacion}` : false;

    console.log(query);

    conexion.query(query, (error, resultado) => {
        if (error) {
            console.log('Hubo un error en la consulta', error.message);
            return res.status(500).send('Hubo un error en la consulta');
        }
        const response = {
            'peliculas': resultado
        };

        res.send(JSON.stringify(response));
    })
}

//Se expportan las funciones creadas - Enio
module.exports = {
    obtenerPeliculas: obtenerPeliculas,
    generos: generos,
    infoPeliculas: infoPeliculas,
    seguerenciaPeliculas: seguerenciaPeliculas
};