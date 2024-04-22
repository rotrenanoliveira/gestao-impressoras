import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'

describe('Create printer (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /printers', async () => {
    const response = await request(app.getHttpServer())
      .post('/printers')
      .send({
        name: 'Printer 01',
        colorMode: 'color',
        printingType: 'inkjet',
        ipAddress: '192.168.0.10',
        serialNumber: 'DEV0123',
        model: 'HP Deskjet',
        invoice: 'NF0123',
        purchaseDate: faker.date.recent(),
        warrantyEndDate: faker.date.future({ years: 1 }),
        contractId: null,
        assetTag: null,
        obs: null,
      })

    expect(response.statusCode).toBe(201)

    expect(response.body).toEqual({
      printer: expect.objectContaining({
        id: expect.any(String),
        name: 'Printer 01',
        colorMode: 'color',
        printingType: 'inkjet',
        ipAddress: '192.168.0.10',
        serialNumber: 'DEV0123',
        model: 'HP Deskjet',
        invoice: 'NF0123',
        assetTag: null,
        obs: null,
      }),
    })
  })
})
