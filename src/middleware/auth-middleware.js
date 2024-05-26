import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];
    const supabaseKey = process.env.JWT_SECRET_KEY;
    if (token) {
      jwt.verify(token, supabaseKey);
    } else {
      return res.status(401).json({ error: 'No Token, Auth Denied' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token, Auth Denied', message: error });
  }
};
