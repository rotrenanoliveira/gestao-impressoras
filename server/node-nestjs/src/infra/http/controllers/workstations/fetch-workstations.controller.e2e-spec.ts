import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import { DepartmentFactory } from '@test/factories/make-department'
import { WorkstationFactory } from '@test/factories/make-workstation'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch workstations (E2E)', () => {
  let app: INestApplication
  let departmentFactory: DepartmentFactory
  let computerFactory: ComputerFactory
  let workstationFactory: WorkstationFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DepartmentFactory, ComputerFactory, WorkstationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    departmentFactory = moduleRef.get(DepartmentFactory)
    computerFactory = moduleRef.get(ComputerFactory)
    workstationFactory = moduleRef.get(WorkstationFactory)

    await app.init()
  })

  test('[GET] /workstations', async () => {
    const department = await departmentFactory.makePrismaDepartment({
      description: 'Product Design',
    })

    for (let i = 0; i < 5; i++) {
      const computer = await computerFactory.makePrismaComputer({
        hostname: 'computer.domain',
        contractId: null,
      })

      await workstationFactory.makeWorkstationPrisma({
        tag: 'workstation-01',
        departmentId: department.id,
        computerId: computer.id,
      })
    }

    const response = await request(app.getHttpServer()).get('/workstations').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.workstations).toHaveLength(5)
  })
})
