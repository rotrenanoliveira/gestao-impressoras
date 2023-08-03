export class InvalidOperationError extends Error {
  constructor() {
    super('The quantity of items must not be changed directly.')
  }
}
