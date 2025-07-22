const jwt = require('jsonwebtoken');
const { StatusCodes } = require("http-status-codes")


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "No Token",
    });
  }

  const token = authHeader.trim().split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Validate payload structure
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