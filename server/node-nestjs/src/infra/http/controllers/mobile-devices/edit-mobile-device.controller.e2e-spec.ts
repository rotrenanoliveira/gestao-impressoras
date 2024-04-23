import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { MobileDeviceFactory } from '@test/factories/make-mobile-device'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Edit Mobile Device (E2E)', () => {
  let app: INestApplication
  let mobileDeviceFactory: MobileDeviceFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [MobileDeviceFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    mobileDeviceFactory = moduleRef.get(MobileDeviceFactory)

    await app.init()
  })

  test('[PUT] /mobile-devices/:id', async () => {
    const mobileDevice = await mobileDeviceFactory.makeMobileDevicePrisma({
      contractId: null,
      departmentId: null,
    })

    const mobileDeviceId = mobileDevice.id.toString()

    const response = await request(app.getHttpServer()).put(`/mobile-devices/${mobileDeviceId}`).send({
      name: 'smartphone',
      model: 'iPhone 15',
      operatingSystem: 'iOs',
      contractId: null,
      departmentId: null,
      serviceNumber: null,
      serviceCompany: null,
      warrantyEndDate: null,
    })

    expect(response.statusCode).toBe(204)
  })
})
