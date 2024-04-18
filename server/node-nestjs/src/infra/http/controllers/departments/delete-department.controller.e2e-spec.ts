import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Delete department (E2E)', () => {
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

  test('[DELETE] /departments/:departmentId', async () => {
    const department = await departmentFactory.makePrismaDepartment()
    const departmentId = department.id.toString()

    const response = await request(app.getHttpServer()).delete(`/departments/${departmentId}`).send()

    expect(response.statusCode).toBe(204)
  })
})
