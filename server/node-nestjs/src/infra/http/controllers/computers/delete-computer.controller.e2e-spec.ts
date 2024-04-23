import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ComputerFactory } from '@test/factories/make-computer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Delete computer (E2E)', () => {
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

  test('[DELETE] /computers/:id', async () => {
    const computer = await computerFactory.makePrismaComputer({
      contractId: null,
    })
    const computerId = computer.id.toString()

    const response = await request(app.getHttpServer()).delete(`/computers/${computerId}`).send()

    expect(response.statusCode).toBe(204)
  })
})
