import jwt from 'jsonwebtoken';
import { apiError } from '../errors.js';

export function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return apiError(res, 'UNAUTHORIZED', 'Missing token', 401);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, name }
    next();
  } catch {
    return apiError(res, 'UNAUTHORIZED', 'Invalid token', 401);
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return apiError(res, 'UNAUTHORIZED', 'Missing user', 401);
    if (req.user.role !== role) return apiError(res, 'FORBIDDEN', 'Insufficient role', 403);
    next();
  };
}