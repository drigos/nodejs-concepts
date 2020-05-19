import Joi from './lib/joi';

export const idSchema = Joi.string().uuid({ version: 'uuidv4' });

export const repositorySchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(140)
    .regex(/^[0-9a-zA-Z\u00C0-\u024F\u1E00-\u1EFF &',.-]+$/)
    .message({
      'string.pattern.base':
        '"title" must contain only alphanumeric chars or symbols & \\ \' , . - ',
    }),
  url: Joi.string()
    .trim()
    .uri({ scheme: ['http', 'https'] }),
  techs: Joi.array().items(Joi.string().trim()),
});
