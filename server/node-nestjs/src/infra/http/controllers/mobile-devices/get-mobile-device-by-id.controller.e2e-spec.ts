import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { MobileDeviceFactory } from '@test/factories/make-mobile-device'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Delete Mobile Device (E2E)', () => {
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

  test('[GET] /mobile-devices/:id', async () => {
    const mobileDevice = await mobileDeviceFactory.makeMobileDevicePrisma({
      contractId: null,
      departmentId: null,
    })

    const mobileDeviceId = mobileDevice.id.toString()

    const response = await request(app.getHttpServer()).get(`/mobile-devices/${mobileDeviceId}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      mobileDevice: expect.objectContaining({
        id: mobileDevice.id.toString(),
        name: mobileDevice.name,
      }),
    })
  })
})
