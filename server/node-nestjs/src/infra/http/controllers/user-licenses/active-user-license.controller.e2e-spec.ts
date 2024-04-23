import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { LicenseFactory } from '@test/factories/make-license'
import { UserFactory } from '@test/factories/make-user'
import { UserLicenseFactory } from '@test/factories/make-user-license'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Active user license (E2E)', () => {
  let app: INestApplication
  let licenseFactory: LicenseFactory
  let departmentFactory: DepartmentFactory
  let userLicenseFactory: UserLicenseFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, LicenseFactory, DepartmentFactory, UserLicenseFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    licenseFactory = moduleRef.get(LicenseFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userLicenseFactory = moduleRef.get(UserLicenseFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PATCH] /user-licenses/:id/active', async () => {
    const license = await licenseFactory.makePrismaLicense()
    const department = await departmentFactory.makePrismaDepartment()

    const userLicense = await userLicenseFactory.makePrismaUserLicense({
      licenseId: license.id,
      departmentId: department.id,
      status: 'inactive',
      userId: null,
    })
    const userLicenseId = userLicense.id.toString()

    const response = await request(app.getHttpServer()).patch(`/user-licenses/${userLicenseId}/active`).send()

    expect(response.statusCode).toBe(204)

    const userLicenseOnDatabase = await prisma.userLicense.findUniqueOrThrow({
      where: {
        id: userLicenseId,
      },
    })

    expect(userLicenseOnDatabase.status).toEqual('ACTIVE')
  })
})
