import Joi from 'joi';
import { validateForSchema } from './schemaValidator.js';

const schema = Joi.object({
  taskName: Joi.string().min(3).max(255).required(),
});

const schemaUpdate = Joi.object({
  taskName: Joi.string().min(3).max(255),
  done: Joi.bool(),
});

export function validateTask(jsonData) {
  return validateForSchema(schema, jsonData);
}

export function validateTaskUpdate(jsonData) {
  return validateForSchema(schemaUpdate, jsonData);
}
