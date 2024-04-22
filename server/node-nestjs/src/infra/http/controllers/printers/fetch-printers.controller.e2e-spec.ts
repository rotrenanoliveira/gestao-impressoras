import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { PrinterFactory } from '@test/factories/make-printer'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Fetch printers (E2E)', () => {
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

  test('[GET] /printers', async () => {
    for (let i = 0; i < 5; i++) {
      await printerFactory.makePrinterPrisma({
        name: `Printer 0${i}`,
        contractId: null,
      })
    }

    const response = await request(app.getHttpServer()).get('/printers').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.printers).toHaveLength(5)
  })
})
