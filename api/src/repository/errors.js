export class NotFoundError extends Error {
  constructor(name, id) {
    super(`${name} not found for id ${id}`);
  }
}
