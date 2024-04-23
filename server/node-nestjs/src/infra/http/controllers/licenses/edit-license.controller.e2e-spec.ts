import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { LicenseFactory, makeLicense } from '@test/factories/make-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit license (E2E)', () => {
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

  test('[PUT] /licenses/:licenseId', async () => {
    const license = await licenseFactory.makePrismaLicense()
    const licenseId = license.id.toString()

    const newLicense = makeLicense()

    const response = await request(app.getHttpServer()).put(`/licenses/${licenseId}`).send({
      name: newLicense.name,
      partner: newLicense.partner,
      quantity: newLicense.quantity,
      expiresAt: newLicense.expiresAt,
      obs: newLicense.obs,
      cost: newLicense.cost,
    })

    expect(response.statusCode).toEqual(204)

    const licenseOnDatabase = await prisma.license.findUniqueOrThrow({ where: { id: licenseId } })

    expect(licenseOnDatabase).toEqual({
      id: expect.any(String),
      name: newLicense.name,
      partner: newLicense.partner,
      quantity: newLicense.quantity,
      expiresAt: newLicense.expiresAt,
      obs: newLicense.obs,
      cost: JSON.stringify(newLicense.cost),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })
})
