import Joi from 'joi';
import { validateForSchema } from './schemaValidator.js';

const schema = Joi.object({
  projectName: Joi.string().min(3).max(100).required(),
});

export function validateProject(jsonData) {
  return validateForSchema(schema, jsonData);
}
