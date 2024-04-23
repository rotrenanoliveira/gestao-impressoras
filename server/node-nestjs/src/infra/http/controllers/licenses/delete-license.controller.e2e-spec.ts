import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { LicenseFactory } from '@test/factories/make-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Delete license (E2E)', () => {
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

  test('[DELETE] /licenses/:licenseId', async () => {
    const license = await licenseFactory.makePrismaLicense()
    const licenseId = license.id.toString()

    const response = await request(app.getHttpServer()).delete(`/licenses/${licenseId}`).send({})

    expect(response.statusCode).toEqual(204)
  })
})
