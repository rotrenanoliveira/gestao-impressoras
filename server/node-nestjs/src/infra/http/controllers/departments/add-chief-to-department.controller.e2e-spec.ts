import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { UserFactory } from '@test/factories/make-user'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Add chief to department (E2E)', () => {
  let app: INestApplication
  let departmentFactory: DepartmentFactory
  let usersFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DepartmentFactory, UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    departmentFactory = moduleRef.get(DepartmentFactory)
    usersFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[PATCH] /departments/:id/add-chief', async () => {
    const department = await departmentFactory.makePrismaDepartment()
    const departmentId = department.id.toString()
    const departmentSlug = department.slug.value

    const chief = await usersFactory.makePrismaUser({
      departmentId: department.id,
    })

    const response = await request(app.getHttpServer()).patch(`/departments/${departmentId}/add-chief`).send({
      chiefId: chief.id.toString(),
    })

    expect(response.statusCode).toBe(204)

    const updateResponse = await request(app.getHttpServer()).get(`/departments/${departmentSlug}`).send()

    expect(updateResponse.body).toEqual({
      department: expect.objectContaining({
        id: departmentId,
        email: department.email,
        slug: department.slug.value,
        description: department.description,
        chief: {
          id: chief.id.toString(),
          name: chief.name,
        },
        updatedAt: expect.any(String),
      }),
    })
  })
})
