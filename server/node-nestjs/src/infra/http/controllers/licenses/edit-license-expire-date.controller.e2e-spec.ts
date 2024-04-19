import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { LicenseFactory } from '@test/factories/make-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit license expire date (E2E)', () => {
  let app: INestApplication
  let licenseFactory: LicenseFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [LicenseFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    licenseFactory = moduleRef.get(LicenseFactory)

    await app.init()
  })

  test('[PATCH] /licenses/:licenseId/expire-date', async () => {
    const license = await licenseFactory.makePrismaLicense()
    const licenseId = license.id.toString()

    const newExpireDate = faker.date.future()

    const response = await request(app.getHttpServer()).patch(`/licenses/${licenseId}/expire-date`).send({
      expiresAt: newExpireDate,
    })

    expect(response.statusCode).toEqual(204)

    const licenseOnDatabase = await prisma.license.findUniqueOrThrow({
      where: {
        id: licenseId,
      },
    })

    expect(licenseOnDatabase.expiresAt).toEqual(newExpireDate)
  })
})
