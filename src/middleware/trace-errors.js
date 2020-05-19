import { v4 as uuid } from 'uuid';

export default async (err, req, res, next) => {
  if (err.extensions && err.extensions.traceId) return next(err);

  err.extensions = err.extensions || {};
  err.extensions.traceId = uuid();

  return next(err);
};
