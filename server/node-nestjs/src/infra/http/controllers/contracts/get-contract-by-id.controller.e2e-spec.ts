import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ContractFactory } from '@test/factories/make-contract'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Contract By Id (E2E)', () => {
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

  test('[GET] /contracts/:id', async () => {
    const contract = await contractFactory.makePrismaContract({
      description: 'Contract 01',
      contactEmail: 'johndoe@example.com',
    })
    const contractId = contract.id.toString()

    const response = await request(app.getHttpServer()).get(`/contracts/${contractId}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      contract: expect.objectContaining({
        id: contractId,
        description: 'Contract 01',
        contactEmail: 'johndoe@example.com',
      }),
    })
  })
})
