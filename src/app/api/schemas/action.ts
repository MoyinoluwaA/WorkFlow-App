import * as Joi from 'joi';

/**
 * @description Schema used to validate trigger action request body
 */
export const addActionSchema = {
  schema: Joi.object().keys({
    action: Joi.string().required().valid('GET', 'get'),
    url: Joi.string().uri().required(),
    triggerInput: Joi.string().allow(''),
    triggerInputValue: Joi.string().allow(''),
  }),
  message: 'Input error while adding action configuration',
};
