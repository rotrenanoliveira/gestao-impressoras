import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrinterFactory } from '@test/factories/make-printer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Delete printer (E2E)', () => {
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

  test('[DELETE] /printers/:printerId', async () => {
    const printer = await printerFactory.makePrinterPrisma({
      contractId: null,
    })
    const printerId = printer.id.toString()

    const response = await request(app.getHttpServer()).delete(`/printers/${printerId}`).send()

    expect(response.statusCode).toBe(204)
  })
})
