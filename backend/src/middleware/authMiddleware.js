const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "No Token",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.user_id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Invalid payload",
      });
    }

    req.user = { user_id: payload.user_id };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Session Expired",
      });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
