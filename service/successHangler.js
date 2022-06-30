const successHandler = function(res, statusCode, message, data){
    res.status(statusCode).json({
        status: 'success',
        message,
        data
    })
}

module.exports = successHandler;
