import BaseJoi from '@hapi/joi';

const Joi = BaseJoi.defaults((schema) => {
  return schema.prefs({ abortEarly: false });
});

export default Joi;
