import { InvalidInputError } from './errors';

export function makeValidateFn(schema, message) {
  return (...input) => {
    const { error, value } = schema.validate(...input);

    if (error) {
      throw InvalidInputError.fromJoiError(error, message);
    }

    return value;
  };
}
