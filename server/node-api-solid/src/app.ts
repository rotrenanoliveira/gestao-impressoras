import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from './env'

import { deviceRoutes } from './http/controllers/devices/routes'
import { inventoryRoutes } from './http/controllers/inventory/routes'

export const app = fastify()

// Routes
app.register(deviceRoutes)
app.register(inventoryRoutes)

// HANDLE GLOBAL ERRORS
app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({ message: err.message, issue: err.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
