import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { LicenseFactory } from '@test/factories/make-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch Licenses (E2E)', () => {
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

  test('[GET] /licenses', async () => {
    for (let i = 0; i < 5; i++) {
      await licenseFactory.makePrismaLicense({
        expiresAt: faker.date.future({
          refDate: new Date('2025-01-01'),
          years: 2,
        }),
      })
    }

    const response = await request(app.getHttpServer()).get('/licenses').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.licenses).toHaveLength(5)
  })

  test('[GET] /licenses', async () => {
    for (let i = 0; i < 5; i++) {
      await licenseFactory.makePrismaLicense({
        expiresAt: faker.date.future({
          refDate: new Date('2025-01-01'),
          years: 2,
        }),
      })
    }

    for (let i = 0; i < 3; i++) {
      await licenseFactory.makePrismaLicense({
        expiresAt: faker.date.soon({ days: 20 }),
      })
    }

    const response = await request(app.getHttpServer()).get('/licenses?q=expiring_soon').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.licenses).toHaveLength(3)
  })
})
