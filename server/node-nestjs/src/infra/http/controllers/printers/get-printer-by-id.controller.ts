import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { GetPrinterByIdUseCaseAdapter } from './adapters/get-printer-by-id-adapter'

@Controller('/printers/:id')
export class GetPrinterByIdController {
  constructor(private getPrinterById: GetPrinterByIdUseCaseAdapter) {}

  @Get()
  async handle(@Param('id') printerId: string) {
    const result = await this.getPrinterById.execute({
      printerId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { printer } = result.result

    return {
      printer: PrinterPresenter.toHTTP(printer),
    }
  }
}
