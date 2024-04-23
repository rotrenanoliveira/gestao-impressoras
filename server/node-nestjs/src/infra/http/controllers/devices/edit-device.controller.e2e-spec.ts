import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeviceFactory } from '@test/factories/make-device'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Edit device (E2E)', () => {
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

  test('[PUT] /devices/:id', async () => {
    const device = await deviceFactory.makePrismaDevice({
      contractId: null,
    })
    const deviceId = device.id.toString()
    const newWarrantyEndDate = faker.date.future()

    const response = await request(app.getHttpServer()).put(`/devices/${deviceId}`).send({
      model: 'Device model',
      warrantyEndDate: newWarrantyEndDate,
      contractId: null,
    })

    expect(response.statusCode).toBe(204)
  })
})
