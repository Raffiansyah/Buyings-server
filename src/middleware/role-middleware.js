import jwt from 'jsonwebtoken';

export const roleMiddleware = async (req, res, next) => {
  const token = req.get('Authorization')?.split(' ')[1];
  const supabaseKey = process.env.JWT_SECRET_KEY;
  try {
    if (token) {
      const decoded = jwt.verify(token, supabaseKey);
      if (decoded.role !== 'admin') {
        return res.status(401).json({ error: 'No Access' });
      }
      next();
    } else {
      return res.status(401).json({ error: 'Not Authorized, Access Denied' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token, Auth Denied', message: error });
  }
};
