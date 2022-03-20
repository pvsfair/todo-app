import Joi from 'joi';
import { validateForSchema } from './schemaValidator.js';

const schema = Joi.object({
  taskName: Joi.string().min(3).max(255).required(),
});

export function validateTask(jsonData) {
  return validateForSchema(schema, jsonData);
}
