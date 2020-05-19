import Joi from '../lib/joi';
import { makeValidateFn } from '../lib/validation';
import { repositorySchema } from '../validation-schemas';

export const createRepositorySchema = Joi.object({
  title: repositorySchema.extract('title').required(),
  url: repositorySchema.extract('url').required(),
  techs: repositorySchema.extract('techs').required(),
});

export default makeValidateFn(createRepositorySchema);
