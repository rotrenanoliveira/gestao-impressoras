import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import { DepartmentFactory } from '@test/factories/make-department'
import { UserFactory } from '@test/factories/make-user'
import { WorkstationFactory } from '@test/factories/make-workstation'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Add user to workstation (E2E)', () => {
  let app: INestApplication
  let computerFactory: ComputerFactory
  let departmentFactory: DepartmentFactory
  let prisma: PrismaService
  let userFactory: UserFactory
  let workstationFactory: WorkstationFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ComputerFactory, DepartmentFactory, UserFactory, WorkstationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    computerFactory = moduleRef.get(ComputerFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    workstationFactory = moduleRef.get(WorkstationFactory)

    await app.init()
  })

  test('[PATCH] /workstations/:id/add-user', async () => {
    const department = await departmentFactory.makePrismaDepartment({
      description: 'department-01',
    })

    const computer = await computerFactory.makePrismaComputer({
      contractId: null,
    })

    const user = await userFactory.makePrismaUser({
      departmentId: department.id,
    })

    const workstation = await workstationFactory.makeWorkstationPrisma({
      computerId: computer.id,
      departmentId: department.id,
    })

    const workstationId = workstation.id.toString()

    const response = await request(app.getHttpServer()).patch(`/workstations/${workstationId}/add-user`).send({
      userId: user.id.toString(),
    })

    expect(response.statusCode).toBe(204)

    const usersOnWorkstation = await prisma.workstation.findUniqueOrThrow({
      where: {
        id: workstationId,
      },
      select: {
        users: {
          select: {
            id: true,
          },
        },
      },
    })

    expect(usersOnWorkstation.users.map((user) => user.id.toString())).toContain(user.id.toString())
  })
})
