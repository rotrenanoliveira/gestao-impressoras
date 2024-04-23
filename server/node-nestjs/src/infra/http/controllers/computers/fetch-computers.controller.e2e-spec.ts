import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch computers (E2E)', () => {
  let app: INestApplication
  let computerFactory: ComputerFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ComputerFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    computerFactory = moduleRef.get(ComputerFactory)

    await app.init()
  })

  test('[GET] /computers', async () => {
    for (let i = 0; i < 5; i++) {
      await computerFactory.makePrismaComputer({
        contractId: null,
      })
    }

    const response = await request(app.getHttpServer()).get('/computers/').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.computers).toHaveLength(5)
  })
})
