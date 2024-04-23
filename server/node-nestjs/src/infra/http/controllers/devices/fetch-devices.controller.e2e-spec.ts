import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DeviceFactory } from '@test/factories/make-device'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch devices (E2E)', () => {
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

  test('[GET] /devices', async () => {
    for (let i = 0; i < 5; i++) {
      await deviceFactory.makePrismaDevice({
        contractId: null,
      })
    }

    const response = await request(app.getHttpServer()).get('/devices').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.devices).toHaveLength(5)
  })
})
