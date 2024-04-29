import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import { UserFactory } from '@test/factories/make-user'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Edit chief to department (E2E)', () => {
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

  test.only('[PATCH] /departments/:id/edit-chief', async () => {
    const department = await departmentFactory.makePrismaDepartment()
    const departmentId = department.id.toString()
    const departmentSlug = department.slug.value

    const [pastChief, newChief] = await Promise.all([
      usersFactory.makePrismaUser({
        name: 'Joe Doe',
        departmentId: department.id,
      }),
      usersFactory.makePrismaUser({
        name: 'Jane Doe',
        departmentId: department.id,
      }),
    ])

    await request(app.getHttpServer()).patch(`/departments/${departmentId}/add-chief`).send({
      chiefId: pastChief.id.toString(),
    })

    const response = await request(app.getHttpServer()).patch(`/departments/${departmentId}/edit-chief`).send({
      chiefId: newChief.id.toString(),
    })

    expect(response.statusCode).toBe(204)

    const updateResponse = await request(app.getHttpServer()).get(`/departments/${departmentSlug}`).send()

    expect(updateResponse.body).toEqual({
      department: expect.objectContaining({
        id: departmentId,
        description: department.description,
        slug: department.slug.value,
        email: department.email,
        chief: expect.objectContaining({
          id: newChief.id.toString(),
          name: newChief.name,
        }),
        updatedAt: expect.any(String),
      }),
    })
  })
})
