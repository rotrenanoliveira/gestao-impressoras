import { app } from '@/app'
import { createComputer } from '@/utils/tests/create-computer'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Get Computer By ID (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get computer by id', async () => {
    const { id: computerId, device_id: deviceId } = await createComputer()

    const response = await request(app.server).get(`/computers/${computerId}`).send()

    expect(response.status).toBe(200)
    expect(response.body.computer).toEqual(
      expect.objectContaining({
        id: computerId,
        deviceId: deviceId,
        name: 'notebook',
        usedBy: 'john doe',
        status: 'ok',
      }),
    )
  })
})
