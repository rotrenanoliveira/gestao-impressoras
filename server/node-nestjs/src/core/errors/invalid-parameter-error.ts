export class InvalidParameterError extends Error {
  constructor(message = 'Invalid parameter.') {
    super(message)
    this.name = 'InvalidParameter'
  }
}
