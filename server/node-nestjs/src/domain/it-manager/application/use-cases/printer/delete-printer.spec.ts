import { makePrinter } from 'test/factories/make-printer'
import { InMemoryPrintersRepository } from 'test/repositories/in-memory-printers-repository'

import { DeletePrinterUseCase } from './delete-printer'

let printersRepository: InMemoryPrintersRepository
let sut: DeletePrinterUseCase

describe('Delete printer', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    sut = new DeletePrinterUseCase(printersRepository)
  })

  it('should be able to delete printer', async () => {
    const printer = makePrinter()
    printersRepository.items.push(printer)

    const result = await sut.execute({
      printerId: printer.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
    expect(printersRepository.items).toHaveLength(0)
  })
})
