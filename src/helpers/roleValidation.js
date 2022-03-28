import Joi from 'joi';
export const roleEntryValidation = Joi.object({
  RoleId: Joi.string()
    .valid('1', '2', '3')
    .required()
    .pattern(/^[0-9]/)
    .messages({
      'string.pattern.base': '{{#label}} must contain a valid id',
      'string.valid.base':
        '{{#label}} must be written as requester : 1, manager : 2, admin : 3',
    }),
  Email: Joi.string().required().email(),
});
