import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import { DepartmentFactory } from '@test/factories/make-department'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create workstation (E2E)', () => {
  let app: INestApplication
  let departmentFactory: DepartmentFactory
  let computerFactory: ComputerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DepartmentFactory, ComputerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    departmentFactory = moduleRef.get(DepartmentFactory)
    computerFactory = moduleRef.get(ComputerFactory)

    await app.init()
  })

  test('[POST] /workstations', async () => {
    const department = await departmentFactory.makePrismaDepartment({
      description: 'Product Design',
    })

    const computer = await computerFactory.makePrismaComputer({
      hostname: 'computer.domain',
      contractId: null,
    })

    const departmentId = department.id.toString()
    const computerId = computer.id.toString()

    const response = await request(app.getHttpServer()).post('/workstations').send({
      tag: 'workstation-01',
      departmentId,
      computerId,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      workstation: expect.objectContaining({
        id: expect.any(String),
        tag: 'workstation-01',
        departmentId,
        computerId,
      }),
    })
  })
})
