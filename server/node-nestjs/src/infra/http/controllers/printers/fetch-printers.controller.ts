import { BadRequestException, Controller, Get } from '@nestjs/common'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { FetchPrintersUseCaseAdapter } from './adapters/fetch-printers-adapter'

@Controller('/printers')
export class FetchPrintersController {
  constructor(private fetchPrinters: FetchPrintersUseCaseAdapter) {}

  @Get()
  async handle() {
    const result = await this.fetchPrinters.execute()

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }

    const { printers } = result.result

    return {
      printers: printers.map(PrinterPresenter.toHTTP),
    }
  }
}
