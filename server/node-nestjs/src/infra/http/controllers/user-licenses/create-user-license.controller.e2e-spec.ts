import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { LicenseFactory } from '@test/factories/make-license'
import { UserFactory } from '@test/factories/make-user'
import { UserLicenseFactory } from '@test/factories/make-user-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create user license (E2E)', () => {
  let app: INestApplication
  let licenseFactory: LicenseFactory
  let departmentFactory: DepartmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, LicenseFactory, DepartmentFactory, UserLicenseFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    licenseFactory = moduleRef.get(LicenseFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)

    await app.init()
  })

  test('[POST] /user-licenses', async () => {
    const license = await licenseFactory.makePrismaLicense()
    const department = await departmentFactory.makePrismaDepartment()

    const response = await request(app.getHttpServer()).post(`/user-licenses/`).send({
      licenseId: license.id.toString(),
      departmentId: department.id.toString(),
      userId: null,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      userLicense: {
        id: expect.any(String),
        licenseId: license.id.toString(),
        departmentId: department.id.toString(),
        type: 'department',
        status: 'active',
      },
    })
  })
})
