import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ContractFactory } from '@test/factories/make-contract'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit Contract (E2E)', () => {
  let app: INestApplication
  let contractFactory: ContractFactory
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ContractFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    contractFactory = moduleRef.get(ContractFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /contracts/:id', async () => {
    const contract = await contractFactory.makePrismaContract({
      endAt: faker.date.soon(),
    })
    const contractId = contract.id.toString()

    const response = await request(app.getHttpServer()).put(`/contracts/${contractId}`).send({
      description: 'Contract description',
      contactEmail: faker.internet.email(),
      startAt: faker.date.recent(),
      endAt: faker.date.future(),
      type: 'rental',
    })

    expect(response.statusCode).toEqual(204)

    const contractOnDatabase = await prisma.contract.findUniqueOrThrow({
      where: {
        id: contractId,
      },
    })

    expect(contractOnDatabase).toEqual(
      expect.objectContaining({
        description: 'Contract description',
        type: 'RENTAL',
      }),
    )
  })
})
