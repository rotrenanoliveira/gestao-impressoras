import { InMemoryPrintersRepository } from 'test/repositories/in-memory-printers-repository'
import { makePrinter } from 'test/factories/make-printer'
import { GetPrinterByIdUseCase } from './get-printer-by-id'

let printersRepository: InMemoryPrintersRepository
let sut: GetPrinterByIdUseCase

describe('Get printer by id', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    sut = new GetPrinterByIdUseCase(printersRepository)
  })

  it('should be able to get printer by id', async () => {
    const printer = makePrinter({
      name: 'Printer 01',
    })
    printersRepository.items.push(printer)

    const result = await sut.execute({
      printerId: printer.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.printer).toEqual(
        expect.objectContaining({
          id: printer.id,
          name: 'Printer 01',
        }),
      )
    }
  })

  it('should not be able to get printer by invalid id', async () => {
    const result = await sut.execute({
      printerId: 'non-existing-printer',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
