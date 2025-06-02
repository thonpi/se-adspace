import Joi from 'joi';

export const validateJoiSchema = (schema: Joi.Schema, data: any) => {
  const { error, value } = schema.validate(data);
  if (error) {
    throw new Error(error.message);
  }
  return value;
};
