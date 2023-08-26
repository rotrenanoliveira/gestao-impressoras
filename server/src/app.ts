import fastify from 'fastify'
import cors from '@fastify/cors'

import { env } from './env'

import { ZodError } from 'zod'
import { ResourceNotFound } from './use-cases/errors/resource-not-found'

import { computerRoutes } from './http/controllers/computers/route'
import { printerRoutes } from './http/controllers/printers/route'
import { inkStockRoutes } from './http/controllers/ink-stock/route'

export const app = fastify()

app.register(cors, {
  origin: (_, cb) => {
    cb(null, true)
  },
})

// Routes
app.register(computerRoutes)
app.register(printerRoutes)
app.register(inkStockRoutes)

// HANDLE GLOBAL ERRORS
app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({ message: err.message, issue: err.format() })
  }

  if (err instanceof ResourceNotFound) {
    return reply.status(404).send({ message: err.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
