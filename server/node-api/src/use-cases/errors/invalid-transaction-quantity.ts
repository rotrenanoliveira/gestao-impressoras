export class InvalidTransactionQuantityError extends Error {
  constructor() {
    super('The quantity to be consumed must not be greater than the quantity available.')
  }
}
