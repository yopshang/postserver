const appError = (httpStatus, errMessage, next) => {
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOperational = true;  // 設定是否為不明錯誤
    next(error);
}
module.exports = appError;
