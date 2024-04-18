import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create user (E2E)', () => {
  let app: INestApplication
  let departmentFactory: DepartmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DepartmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    departmentFactory = moduleRef.get(DepartmentFactory)

    await app.init()
  })

  test('[POST] /users', async () => {
    const department = await departmentFactory.makePrismaDepartment()

    const response = await request(app.getHttpServer()).post('/users').send({
      departmentId: department.id.toString(),
      email: 'johndoe@example.com',
      name: 'John Doe',
      badge: '123456',
      workstationId: null,
      phone: null,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      user: {
        id: expect.any(String),
        departmentId: department.id.toString(),
        name: 'John Doe',
        email: 'johndoe@example.com',
        badge: '123456',
        isActive: true,
        status: 'active',
        workstationId: null,
        phone: null,
      },
    })
  })
})
