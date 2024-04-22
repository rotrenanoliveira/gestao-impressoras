import { faker } from '@faker-js/faker'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrinterFactory } from '@test/factories/make-printer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Edit Printer (E2E)', () => {
  let app: INestApplication
  let printerFactory: PrinterFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [PrinterFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    printerFactory = moduleRef.get(PrinterFactory)

    await app.init()
  })

  test('[PUT] /printers/:printerId', async () => {
    const printer = await printerFactory.makePrinterPrisma({
      contractId: null,
    })
    const printerId = printer.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/printers/${printerId}`)
      .send({
        name: 'Printer HP 01',
        model: 'HP Deskjet 1000',
        ipAddress: faker.internet.ipv4(),
        warrantyEndDate: faker.date.future({ years: 1 }),
        contractId: null,
      })

    expect(response.statusCode).toBe(204)
  })
})
