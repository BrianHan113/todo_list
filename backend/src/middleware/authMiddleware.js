const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new Error('No valid token provided'));
  }

  const token = authHeader.trim().split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Validate payload structure
    if (!payload.user_id || !payload.username) {
      return next(new Error('Invalid token payload'));
    }

    req.user = { user_id: payload.user_id, username: payload.username };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new Error('Session expired. Please log in again.'));
    }
    return next(new Error('Invalid token'));
  }
};

module.exports = authMiddleware;