// utils/errorHandler.js

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [], // array of field errors or additional info
    data: null,
  })
}

export default errorHandler
