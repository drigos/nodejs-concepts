import { MalformedInputError } from '../errors';

export default async (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return next(MalformedInputError.fromJsonSyntaxError(err));
  }

  return next(err);
};
