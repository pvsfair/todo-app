export function validateForSchema(schema, jsonData) {
  const result = schema.validate(jsonData, { abortEarly: false });
  if (result.error) {
    throw result.error.details.map((detail) => detail.message).join(', ');
  }
}
