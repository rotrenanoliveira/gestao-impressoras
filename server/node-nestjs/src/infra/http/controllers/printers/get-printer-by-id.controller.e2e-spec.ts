import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrinterFactory } from '@test/factories/make-printer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Printer By Id (E2E)', () => {
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

  test('[GET] /printers/:printerId', async () => {
    const printer = await printerFactory.makePrinterPrisma({
      contractId: null,
    })
    const printerId = printer.id.toString()

    const response = await request(app.getHttpServer()).get(`/printers/${printerId}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      printer: expect.objectContaining({
        name: printer.name,
        colorMode: printer.colorMode,
        printingType: printer.printingType,
        ipAddress: printer.ipAddress,
        serialNumber: printer.serialNumber,
        model: printer.model,
        invoice: printer.invoice,
        assetTag: printer.assetTag,
        obs: printer.obs,
      }),
    })
  })
})
