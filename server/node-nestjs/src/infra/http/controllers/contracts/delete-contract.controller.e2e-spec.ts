import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ContractFactory } from '@test/factories/make-contract'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Delete contract (E2E)', () => {
  let app: INestApplication
  let contractFactory: ContractFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ContractFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    contractFactory = moduleRef.get(ContractFactory)

    await app.init()
  })

  test('[DELETE] /contracts/:id', async () => {
    const contract = await contractFactory.makePrismaContract({})
    const contractId = contract.id.toString()

    const response = await request(app.getHttpServer()).delete(`/contracts/${contractId}`).send({})

    expect(response.statusCode).toEqual(204)
  })
})
