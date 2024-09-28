export class EntityNotFoundError extends Error {
  constructor(
    private readonly entityName: string,
    private readonly entityId: string | number,
  ) {
    super(`${entityName} with id ${entityId.toString()} not found`);
  }
}
