import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit computer (E2E)', () => {
  let app: INestApplication
  let computerFactory: ComputerFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ComputerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    computerFactory = moduleRef.get(ComputerFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /computers/:id', async () => {
    const computer = await computerFactory.makePrismaComputer({
      contractId: null,
    })
    const computerId = computer.id.toString()
    const newWarrantyEndDate = faker.date.future()

    const response = await request(app.getHttpServer()).put(`/computers/${computerId}`).send({
      hostname: 'computer.domain',
      ipAddress: '192.168.0.01',
      operatingSystem: 'Windows XP',
      description: 'new computer',
      model: 'Dell XPS',
      warrantyEndDate: newWarrantyEndDate,
      contractId: null,
    })

    expect(response.statusCode).toBe(204)

    const computerOnDatabase = await prisma.computer.findUniqueOrThrow({
      where: {
        id: computerId,
      },
    })

    expect(computerOnDatabase).toEqual(
      expect.objectContaining({
        hostname: 'computer.domain',
        ipAddress: '192.168.0.01',
        operatingSystem: 'Windows XP',
        description: 'new computer',
        model: 'Dell XPS',
        warrantyEndDate: newWarrantyEndDate,
      }),
    )
  })
})
