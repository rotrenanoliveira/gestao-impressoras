import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Delete department (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let departmentFactory: DepartmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DepartmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    departmentFactory = moduleRef.get(DepartmentFactory)

    await app.init()
  })

  test('[DELETE] /departments/:id', async () => {
    const department = await departmentFactory.makePrismaDepartment()
    const departmentId = department.id.toString()

    const response = await request(app.getHttpServer()).delete(`/departments/${departmentId}`).send()
    expect(response.statusCode).toBe(204)

    const departmentOnDatabase = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
    })

    expect(departmentOnDatabase).toBeNull()
  })
})
