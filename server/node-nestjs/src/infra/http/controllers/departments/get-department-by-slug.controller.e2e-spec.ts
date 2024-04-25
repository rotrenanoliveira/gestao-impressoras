import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get department by slug (E2E)', () => {
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

  test('[GET] /departments/:slug', async () => {
    const department = await departmentFactory.makePrismaDepartment()
    const departmentSlug = department.slug.value

    const response = await request(app.getHttpServer()).get(`/departments/${departmentSlug}`).send()

    expect(response.statusCode).toBe(200)

    expect(response.body.department).toEqual(
      expect.objectContaining({
        id: department.id.toString(),
        slug: departmentSlug,
        email: department.email,
        description: department.description,
        chief: null,
      }),
    )
  })
})
