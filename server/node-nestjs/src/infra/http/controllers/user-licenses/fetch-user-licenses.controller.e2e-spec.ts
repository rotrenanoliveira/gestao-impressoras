import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { LicenseFactory } from '@test/factories/make-license'
import { UserFactory } from '@test/factories/make-user'
import { UserLicenseFactory } from '@test/factories/make-user-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch user license (E2E)', () => {
  let app: INestApplication
  let licenseFactory: LicenseFactory
  let departmentFactory: DepartmentFactory
  let userLicenseFactory: UserLicenseFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, LicenseFactory, DepartmentFactory, UserLicenseFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    licenseFactory = moduleRef.get(LicenseFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userLicenseFactory = moduleRef.get(UserLicenseFactory)

    await app.init()
  })

  test('[GET] /user-licenses/:id/active', async () => {
    const license = await licenseFactory.makePrismaLicense({
      quantity: 5,
    })

    for (let i = 0; i < 5; i++) {
      const department = await departmentFactory.makePrismaDepartment()

      await userLicenseFactory.makePrismaUserLicense({
        licenseId: license.id,
        departmentId: department.id,
        status: 'inactive',
        userId: null,
      })
    }

    const response = await request(app.getHttpServer()).get('/user-licenses').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.userLicenses).toHaveLength(5)
  })
})
