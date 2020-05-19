import Joi from '../lib/joi';
import { makeValidateFn } from '../lib/validation';
import { repositorySchema } from '../validation-schemas';

export const updateRepositorySchema = Joi.object({
  title: repositorySchema.extract('title'),
  url: repositorySchema.extract('url'),
  techs: repositorySchema.extract('techs'),
});

export default makeValidateFn(updateRepositorySchema);
