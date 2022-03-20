import Joi from 'joi';
import { validateForSchema } from './schemaValidator.js';

const schemaRegister = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(4).max(255).required(),
  name: Joi.string().min(3).max(255).required(),
});

const schemaLogin = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export function validateUser(jsonData) {
  return validateForSchema(schemaRegister, jsonData);
}

export function validateUserLogin(jsonData) {
  return validateForSchema(schemaLogin, jsonData);
}
