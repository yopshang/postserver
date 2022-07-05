const failHandler = function(res, statusCode, message){
    res.status(statusCode).json({
        status: 'fail',
        message,
    })
}

module.exports = failHandler;
