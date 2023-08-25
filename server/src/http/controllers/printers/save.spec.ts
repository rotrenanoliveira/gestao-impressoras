import { app } from '@/app'
import { createPrinter } from '@/utils/tests/create-printer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Save Printer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to save printer', async () => {
    const { id: printerId, device_id: deviceId } = await createPrinter()

    const response = await request(app.server).patch(`/printers/${printerId}`).send({
      name: 'konica',
      ip: '10.0.0.1',
      status: 'warning',
      department: 'office',
    })

    expect(response.status).toBe(200)
    expect(response.body.printer).toEqual(
      expect.objectContaining({
        id: printerId,
        deviceId: deviceId,
        name: 'konica',
        ip: '10.0.0.1',
        status: 'warning',
        department: 'office',
      }),
    )
  })
})
