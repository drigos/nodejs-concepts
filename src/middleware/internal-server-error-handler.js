import { InternalServerError } from '../errors';

export default async (err, req, res, next) => {
  if (res.headersSent) return next(err);

  const error = new InternalServerError(err);

  return res.status(error.status).jsonError(error);
};
