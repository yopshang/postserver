const handleErrorAsync = async function handleErrorAsync(func){
    return function(req, res, next){
        func(req, res, next).catch(
            function(error){
                return next(error);
            }
        )
    }
}

module.exports = handleErrorAsync;
