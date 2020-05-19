import { ApplicationError } from '../lib/errors';

function isHandleableError(err) {
  return (err instanceof ApplicationError);
}

export default async (err, req, res, next) => {
  if (!isHandleableError(err) || res.headersSent) {
    return next(err);
  }

  return res.status(err.status).jsonError(err);
};
