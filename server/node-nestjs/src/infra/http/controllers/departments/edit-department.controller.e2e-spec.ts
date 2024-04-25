import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Edit department (E2E)', () => {
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

  test('[PUT] /departments/:id', async () => {
    const department = await departmentFactory.makePrismaDepartment()
    const departmentId = department.id.toString()

    const response = await request(app.getHttpServer()).put(`/departments/${departmentId}`).send({
      description: 'Product Design',
      email: 'product.design@example.com',
    })

    expect(response.statusCode).toBe(204)

    const departmentSlug = 'product-design'
    const updateResponse = await request(app.getHttpServer()).get(`/departments/${departmentSlug}`).send()

    expect(updateResponse.body).toEqual({
      department: expect.objectContaining({
        id: departmentId,
        slug: 'product-design',
        description: 'Product Design',
        email: 'product.design@example.com',
        chief: null,
      }),
    })
  })
})
