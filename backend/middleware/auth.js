import { verify } from 'jsonwebtoken';

export default function (req, res, next) {
  const header = req.header('Authorization');
  const token = header && header.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token, auth denied' });

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
