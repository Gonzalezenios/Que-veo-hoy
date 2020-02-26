//funcion para devolver las peliculas
function obtenerPeliculas (req,res) {
    var peliculas = req.query.peliculas;


    res.send(peliculas);
}

module.exports ={
    obtenerPeliculas : obtenerPeliculas
};


//ejemplo de como diseñar el controlador

function saludar (req, res) {
    var nombre = req.query.nombre;

    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth();
    var año = fecha.getFullYear();

    var meses = new Array();
    meses[0] = 'Enero';
    meses[1] = 'Febrero';
    meses[2] = 'Marzo';
    meses[3] = 'Abril';
    meses[4] = 'Mayo';
    meses[5] = 'Junio';
    meses[6] = 'Julio';
    meses[7] = 'Agosto';
    meses[8] = 'Septiembre';
    meses[9] = 'Octubre';
    meses[10] = 'Noviembre';
    meses[11] = 'Diciembre';    
    var mes_nombre = meses[mes];
    res.send('Hola '+nombre+', hoy es'+dia+' de '+ mes_nombre+' de '+año);
}

module.exports = {
    saludar : saludar
};