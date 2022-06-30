const appError = (httpStatus, errMessage, next) => {
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOpperational = true;
    next(error);
}
module.exports = appError;
