import { FastifyInstance } from 'fastify'
import { register } from './register'
import { registerRentedDevice } from './register-rented-device'

export async function deviceRoutes(app: FastifyInstance) {
  // Devices General
  app.post('/devices', register)

  // Rented Devices
  app.post('/devices/rented', registerRentedDevice)
}
