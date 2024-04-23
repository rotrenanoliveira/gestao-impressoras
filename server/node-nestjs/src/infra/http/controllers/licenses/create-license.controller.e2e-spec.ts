import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { makeLicense } from '@test/factories/make-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create license (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /licenses', async () => {
    const license = makeLicense()

    const response = await request(app.getHttpServer()).post('/licenses').send({
      name: license.name,
      partner: license.partner,
      quantity: license.quantity,
      expiresAt: license.expiresAt,
      obs: license.obs,
      cost: license.cost,
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      license: {
        id: expect.any(String),
        name: license.name,
        partner: license.partner,
        quantity: license.quantity,
        daysToExpire: license.daysUntilExpires,
        totalCost: license.totalCost,
        createdAt: expect.any(String),
        expiresAt: license.expiresAt?.toISOString(),
        cost: license.cost,
        obs: license.obs,
      },
    })
  })
})
