import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { UserFactory } from '@test/factories/make-user'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe.only('Fetch users (E2E)', () => {
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

  test('[GET] /users', async () => {
    const department = await departmentFactory.makePrismaDepartment()

    for (let i = 0; i < 5; i++) {
      await userFactory.makePrismaUser({
        departmentId: department.id,
      })
    }

    const response = await request(app.getHttpServer()).get('/users').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.users).toHaveLength(5)
  })
})
