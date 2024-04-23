import { Module } from '@nestjs/common'

import { DatabaseModule } from '@/infra/database/database.module'

import { CreatePrinterUseCaseAdapter } from './adapters/create-printer-adapter'
import { DeletePrinterUseCaseAdapter } from './adapters/delete-printer-adapter'
import { EditPrinterUseCaseAdapter } from './adapters/edit-printer-adapter'
import { FetchPrintersUseCaseAdapter } from './adapters/fetch-printers-adapter'
import { GetPrinterByIdUseCaseAdapter } from './adapters/get-printer-by-id-adapter'
import { CreatePrinterController } from './create-printer.controller'
import { DeletePrinterController } from './delete-printer.controller'
import { EditePrinterController } from './edit-printer.controller'
import { FetchPrintersController } from './fetch-printers.controller'
import { GetPrinterByIdController } from './get-printer-by-id.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreatePrinterController,
    DeletePrinterController,
    EditePrinterController,
    FetchPrintersController,
    GetPrinterByIdController,
  ],
  providers: [
    CreatePrinterUseCaseAdapter,
    DeletePrinterUseCaseAdapter,
    EditPrinterUseCaseAdapter,
    FetchPrintersUseCaseAdapter,
    GetPrinterByIdUseCaseAdapter,
  ],
})
export class PrinterModule {}
