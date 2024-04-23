import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ContractFactory } from '@test/factories/make-contract'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit Contract Id (E2E)', () => {
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

  test('[PATCH] /contracts/:id/end-date', async () => {
    const contract = await contractFactory.makePrismaContract({
      endAt: faker.date.soon(),
    })
    const contractId = contract.id.toString()
    const newExpireDate = faker.date.future()

    const response = await request(app.getHttpServer()).patch(`/contracts/${contractId}/end-date`).send({
      endAt: newExpireDate,
    })

    expect(response.statusCode).toEqual(204)

    const contractOnDatabase = await prisma.contract.findUniqueOrThrow({
      where: {
        id: contractId,
      },
    })

    expect(contractOnDatabase).toEqual(
      expect.objectContaining({
        endAt: newExpireDate,
      }),
    )
  })
})
