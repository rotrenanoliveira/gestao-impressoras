import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { UserFactory } from '@test/factories/make-user'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Inactive user (E2E)', () => {
  let app: INestApplication
  let userFactory: UserFactory
  let departmentFactory: DepartmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, DepartmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[PATCH] /users/:userId/active', async () => {
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      departmentId: department.id,
    })
    const userId = user.id.toString()

    const response = await request(app.getHttpServer()).patch(`/users/${userId}/inactive`).send()
    expect(response.statusCode).toBe(204)

    const getUserResponse = await request(app.getHttpServer()).get(`/users/${userId}`).send()
    expect(getUserResponse.statusCode).toBe(200)
    expect(getUserResponse.body.user).toEqual(
      expect.objectContaining({
        status: 'inactive',
        isActive: false,
      }),
    )
  })
})
