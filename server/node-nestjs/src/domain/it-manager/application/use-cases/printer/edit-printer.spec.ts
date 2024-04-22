import { faker } from '@faker-js/faker'
import { makePrinter } from 'test/factories/make-printer'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { InMemoryPrintersRepository } from 'test/repositories/in-memory-printers-repository'

import { EditPrinterUseCase } from './edit-printer'

let printersRepository: InMemoryPrintersRepository
let contractsRepository: InMemoryContractsRepository
let sut: EditPrinterUseCase

describe('Edit printer', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new EditPrinterUseCase(printersRepository, contractsRepository)
  })

  it('should be able to edit printer', async () => {
    const printer = makePrinter()
    printersRepository.items.push(printer)

    const result = await sut.execute({
      printerId: printer.id.toString(),
      name: 'Printer 1',
      model: 'Model 01',
      ipAddress: faker.internet.ip(),
      warrantyEndDate: null,
      contractId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.printer).toEqual(
        expect.objectContaining({
          name: 'Printer 1',
          model: 'Model 01',
          contractId: null,
        }),
      )
    }
  })

  it('should not be able to edit printer with invalid id', async () => {
    const result = await sut.execute({
      printerId: 'non-existing-printer',
      name: 'Printer 1',
      model: 'Model 01',
      ipAddress: faker.internet.ip(),
      warrantyEndDate: null,
      contractId: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should not be able to edit printer with invalid contract id', async () => {
    const printer = makePrinter()
    printersRepository.items.push(printer)

    const result = await sut.execute({
      printerId: printer.id.toString(),
      contractId: 'non-existing-contract',
      name: 'Printer 1',
      model: 'Model 01',
      ipAddress: faker.internet.ip(),
      warrantyEndDate: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
