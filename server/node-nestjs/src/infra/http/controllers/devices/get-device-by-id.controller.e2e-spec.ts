import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeviceFactory } from '@test/factories/make-device'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Device By Id (E2E)', () => {
  let app: INestApplication
  let deviceFactory: DeviceFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DeviceFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    deviceFactory = moduleRef.get(DeviceFactory)

    await app.init()
  })

  test('[GET] /devices/:id', async () => {
    const device = await deviceFactory.makePrismaDevice({
      model: 'Device model 01',
      contractId: null,
    })
    const deviceId = device.id.toString()

    const response = await request(app.getHttpServer()).get(`/devices/${deviceId}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      device: expect.objectContaining({
        id: expect.any(String),
        model: 'Device model 01',
      }),
    })
  })
})
