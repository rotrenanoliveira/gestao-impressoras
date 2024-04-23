import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { LicenseFactory } from '@test/factories/make-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get License By Id (E2E)', () => {
  let app: INestApplication
  let licenseFactory: LicenseFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [LicenseFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    licenseFactory = moduleRef.get(LicenseFactory)

    await app.init()
  })

  test('[GET] /licenses/:licenseId', async () => {
    const license = await licenseFactory.makePrismaLicense()
    const licenseId = license.id.toString()

    const response = await request(app.getHttpServer()).get(`/licenses/${licenseId}`).send()

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      license: {
        id: expect.any(String),
        name: license.name,
        partner: license.partner,
        quantity: license.quantity,
        daysToExpire: license.daysUntilExpires,
        totalCost: license.totalCost,
        cost: license.cost,
        obs: license.obs,
        expiresAt: license.expiresAt?.toISOString(),
        createdAt: expect.any(String),
      },
    })
  })
})
