import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import { DepartmentFactory } from '@test/factories/make-department'
import { WorkstationFactory } from '@test/factories/make-workstation'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Delete workstation (E2E)', () => {
  let app: INestApplication
  let departmentFactory: DepartmentFactory
  let computerFactory: ComputerFactory
  let workstationFactory: WorkstationFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [DepartmentFactory, ComputerFactory, WorkstationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    departmentFactory = moduleRef.get(DepartmentFactory)
    computerFactory = moduleRef.get(ComputerFactory)
    workstationFactory = moduleRef.get(WorkstationFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[DELETE] /workstations/:id', async () => {
    const department = await departmentFactory.makePrismaDepartment({
      description: 'Product Design',
    })

    const computer = await computerFactory.makePrismaComputer({
      hostname: 'computer.domain',
      contractId: null,
    })

    const workstation = await workstationFactory.makeWorkstationPrisma({
      tag: 'workstation-01',
      departmentId: department.id,
      computerId: computer.id,
    })

    const workstationId = workstation.id.toString()

    const response = await request(app.getHttpServer()).delete(`/workstations/${workstationId}`).send()

    expect(response.statusCode).toBe(204)

    const workstationOnDatabase = await prisma.workstation.findUnique({
      where: {
        id: workstationId,
      },
    })

    expect(workstationOnDatabase).toBeNull()
  })
})
