const toUpperCamelCase = (str, separator = /[._\s:-]/) => {
  return str
    .split(separator)
    .map((substr) => substr.toLowerCase())
    .map((substr) => substr.replace(/^./, (match) => match.toUpperCase()))
    .join('');
}

export class ApplicationError extends Error {
  constructor(message, codification, extensions) {
    super(message);

    if (this.constructor === ApplicationError) {
      throw new TypeError(
        'Abstract class `ApplicationError` should not be instantiated directly'
      );
    }

    const { type, code, status } = codification;

    this.type = type;
    this.code = code || type;
    this.status = status;
    this.extensions = extensions;

    Object.defineProperty(this, 'name', { value: this.constructor.name });
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidInputError extends ApplicationError {
  constructor(message = 'Input is invalid', invalidInput) {
    super(
      message,
      {
        code: 'InvalidInput',
        status: 400,
      },
      { invalidInput: [].concat(invalidInput) }
    );
  }

  static fromSingleInput(input, message) {
    const { name, message: inputMessage, code } = input;

    return new InvalidInputError(message || inputMessage, {
      [name]: [
        {
          code,
          message: inputMessage,
        },
      ],
    });
  }

  static fromJoiError(joiError, message) {
    const invalidInput = joiError.details.reduce((input, el) => {
      const { peers, label } = el.context;
      const fieldNames = peers || [label];

      // string type check is just for safety.
      const code =
        typeof el.type === 'string' ? toUpperCamelCase(el.type) : el.type;

      fieldNames.forEach((fieldName) => {
        if (!input[fieldName]) input[fieldName] = [];
        input[fieldName].push({ code, message: el.message });
      });

      return input;
    }, {});

    return new InvalidInputError(message || joiError.message, invalidInput);
  }
}

export class NotUniqueError extends ApplicationError {
  get subjects() {
    return this.extensions && this.extensions.subjects;
  }

  constructor(message, { subjects }) {
    super(
      message,
      {
        code: 'NotUnique',
        status: 409,
      },
      { subjects: [].concat(subjects) }
    );
  }
}
