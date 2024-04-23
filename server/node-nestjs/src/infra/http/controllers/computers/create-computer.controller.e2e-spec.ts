import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'

describe('Create computer (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /computers', async () => {
    const response = await request(app.getHttpServer()).post('/computers').send({
      hostname: 'computer.domain',
      invoice: 'NF',
      type: 'DESKTOP',
      model: 'Dell XPS',
      ipAddress: 'DYNAMIC',
      description: 'computer',
      serialNumber: 'DEV0123',
      operatingSystem: 'Windows XP',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: null,
      contractId: null,
      assetTag: null,
    })

    expect(response.statusCode).toBe(201)

    expect(response.body).toEqual({
      computer: {
        id: expect.any(String),
        hostname: 'computer.domain',
        invoice: 'NF',
        type: 'DESKTOP',
        model: 'Dell XPS',
        ipAddress: 'DYNAMIC',
        description: 'computer',
        serialNumber: 'DEV0123',
        operatingSystem: 'Windows XP',
        purchaseDate: expect.any(String),
        warrantyEndDate: null,
        assetTag: null,
      },
    })
  })
})
