export interface ResourceNotFoundError {
  name: 'ResourceNotFound'
  message: string
}

export function ResourceNotFound(message = 'Resource not found.'): ResourceNotFoundError {
  return {
    name: 'ResourceNotFound',
    message,
  }
}
