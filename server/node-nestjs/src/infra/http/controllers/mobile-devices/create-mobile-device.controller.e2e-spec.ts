import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'

describe('Create Mobile Device (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /mobile-devices', async () => {
    const response = await request(app.getHttpServer()).post('/mobile-devices').send({
      name: 'smartphone',
      model: 'iPhone 15',
      serialNumber: 'DEV0123',
      type: 'celular',
      invoice: 'NF0123',
      operatingSystem: 'iOs',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      serviceCompany: null,
      serviceNumber: null,
      departmentId: null,
      contractId: null,
      assetTag: null,
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      mobileDevice: expect.objectContaining({
        id: expect.any(String),
        name: 'smartphone',
        model: 'iPhone 15',
        serialNumber: 'DEV0123',
        type: 'celular',
        invoice: 'NF0123',
        operatingSystem: 'iOs',
      }),
    })
  })
})
