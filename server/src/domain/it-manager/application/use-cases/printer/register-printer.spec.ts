import { faker } from '@faker-js/faker'

import { InMemoryPrintersRepository } from 'test/repositories/in-memory-printers-repository'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { makeContract } from 'test/factories/make-contract'
import { RegisterPrinterUseCase } from './register-printer'

let printersRepository: InMemoryPrintersRepository
let contractsRepository: InMemoryContractsRepository
let sut: RegisterPrinterUseCase

describe('Register printer', () => {
  beforeEach(() => {
    printersRepository = new InMemoryPrintersRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new RegisterPrinterUseCase(printersRepository, contractsRepository)
  })

  it('should be able to register a printer', async () => {
    const result = await sut.execute({
      colorMode: 'black-and-white',
      printingType: 'inkjet',
      name: 'Printer 1',
      ipAddress: 'dynamic',
      model: 'Model 01',
      serialNumber: 'PRINTER00123',
      invoice: 'NF00123',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: null,
      assetTag: null,
      obs: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.printer).toEqual(
        expect.objectContaining({
          colorMode: 'black-and-white',
          printingType: 'inkjet',
        }),
      )
    }
  })

  it('should be able to register a printer with contract', async () => {
    const contract = makeContract()
    contractsRepository.items.push(contract)

    const result = await sut.execute({
      colorMode: 'black-and-white',
      printingType: 'inkjet',
      name: 'Printer 1',
      ipAddress: 'dynamic',
      model: 'Model 01',
      serialNumber: 'PRINTER00123',
      invoice: 'NF00123',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: contract.id.toString(),
      assetTag: null,
      obs: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()
  })

  it('should not be able to register printer with invalid contract id', async () => {
    const result = await sut.execute({
      colorMode: 'black-and-white',
      printingType: 'inkjet',
      name: 'Printer 1',
      ipAddress: 'dynamic',
      model: 'Model 01',
      serialNumber: 'PRINTER00123',
      invoice: 'NF00123',
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      contractId: 'non-existing-contract',
      assetTag: null,
      obs: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
