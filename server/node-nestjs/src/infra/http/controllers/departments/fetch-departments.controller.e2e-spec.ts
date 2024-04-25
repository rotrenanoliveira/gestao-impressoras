import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch departments (E2E)', () => {
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

  test('[GET] /departments', async () => {
    for (let i = 0; i < 5; i++) {
      await departmentFactory.makePrismaDepartment()
    }

    const response = await request(app.getHttpServer()).get('/departments')

    expect(response.statusCode).toBe(200)
    expect(response.body.departments).toHaveLength(5)
  })
})
