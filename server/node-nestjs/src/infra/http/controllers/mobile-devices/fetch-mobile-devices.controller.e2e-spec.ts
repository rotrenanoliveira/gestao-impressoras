import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { MobileDeviceFactory } from '@test/factories/make-mobile-device'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch Mobile Devices (E2E)', () => {
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

  test('[GET] /mobile-devices', async () => {
    for (let i = 0; i < 5; i++) {
      await mobileDeviceFactory.makeMobileDevicePrisma({
        contractId: null,
        departmentId: null,
      })
    }

    const response = await request(app.getHttpServer()).get('/mobile-devices').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.mobileDevices).toHaveLength(5)
  })
})
