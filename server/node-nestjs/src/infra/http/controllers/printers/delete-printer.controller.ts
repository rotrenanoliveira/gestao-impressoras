import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeletePrinterUseCaseAdapter } from './adapters/delete-printer-adapter'

@Controller('/printers/:id')
export class DeletePrinterController {
  constructor(private deletePrinter: DeletePrinterUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') printerId: string) {
    const result = await this.deletePrinter.execute({
      printerId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
