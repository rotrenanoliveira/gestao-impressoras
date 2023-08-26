import { app } from '@/app'
import { createComputer } from '@/utils/tests/create-computer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Save Computer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to save computer', async () => {
    const { id: computerId, device_id: deviceId } = await createComputer()

    const response = await request(app.server).put(`/computers/${computerId}`).send({
      name: 'desktop',
      usedBy: 'jerry',
      status: 'warning',
      department: 'office',
    })

    expect(response.status).toBe(200)
    expect(response.body.computer).toEqual(
      expect.objectContaining({
        id: computerId,
        deviceId: deviceId,
        name: 'desktop',
        usedBy: 'jerry',
        specs: expect.any(Object),
      }),
    )
  })
})
