import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Create contract (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /contracts', async () => {
    const response = await request(app.getHttpServer()).post('/contracts').send({
      description: 'Contract description',
      contactEmail: faker.internet.email(),
      startAt: faker.date.recent(),
      endAt: faker.date.future(),
      type: 'rental',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      contract: {
        id: expect.any(String),
        description: 'Contract description',
        type: 'rental',
        contactEmail: expect.any(String),
        startAt: expect.any(String),
        endAt: expect.any(String),
      },
    })
  })
})
