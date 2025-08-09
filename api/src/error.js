export function apiError(res, code, message, status = 400, extra = {}) {
  return res.status(status).json({ error: { code, message, ...extra } });
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}