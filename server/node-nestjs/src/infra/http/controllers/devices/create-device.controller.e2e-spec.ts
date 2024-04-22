import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'

describe('Create device (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /devices', async () => {
    const response = await request(app.getHttpServer()).post('/devices').send({
      serialNumber: 'DEV0123',
      model: 'Device model 01',
      invoice: 'NF0001',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: null,
      contractId: null,
      assetTag: null,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      device: {
        id: expect.any(String),
        serialNumber: 'DEV0123',
        model: 'Device model 01',
        invoice: 'NF0001',
        purchaseDate: expect.any(String),
        warrantyEndDate: null,
        assetTag: null,
      },
    })
  })
})
