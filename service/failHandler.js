const failHandler = function(res, statusCode, message){
    res.status(statusCode).json({
        status: 'success',
        message,
    })
}

module.exports = failHandler;
