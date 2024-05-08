

function throwCustomError(code, msg) {
    throw new Error(JSON.stringify({code, msg}));
}

function respondWithError(res, e) {
    const err = JSON.parse(e.message);
    res.status(err.code).json({
        mensaje: "Fallido.",
        err: err.msg,
    })
}

function validarObjectId(str) {
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    return objectIdRegex.test(str);
}

function esFechaValida(fechaString) {
    const fecha = new Date(fechaString);
    console.log(fecha);
    console.log(fecha.getTime());
    console.log(!isNaN(fecha.getTime()));
    return !isNaN(fecha.getTime());
}

module.exports = {
    throwCustomError,
    respondWithError,
    validarObjectId,
    esFechaValida
}