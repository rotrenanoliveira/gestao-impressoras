import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { makeContract } from 'test/factories/make-contract'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryMobileDevicesRepository } from 'test/repositories/in-memory-mobile-devices-repository'

import { CreateMobileDeviceUseCase } from './create-mobile-device'

let mobileDevicesRepository: InMemoryMobileDevicesRepository
let contractsRepository: InMemoryContractsRepository
let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: CreateMobileDeviceUseCase

describe('Register mobile device', () => {
  beforeEach(() => {
    mobileDevicesRepository = new InMemoryMobileDevicesRepository()
    contractsRepository = new InMemoryContractsRepository()
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    sut = new CreateMobileDeviceUseCase(mobileDevicesRepository, contractsRepository, departmentsRepository)
  })

  it('should be able to register mobile device', async () => {
    const contract = makeContract()
    contractsRepository.items.push(contract)

    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const result = await sut.execute({
      name: 'iPhone 15',
      model: 'iPhone 15',
      serialNumber: 'SMPH00123',
      type: 'celular',
      invoice: 'Invoice 01',
      operatingSystem: 'iOS 17',
      purchaseDate: new Date(),
      departmentId: department.id.toString(),
      contractId: contract.id.toString(),
      warrantyEndDate: null,
      serviceCompany: null,
      serviceNumber: null,
      assetTag: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.mobileDevice).toEqual(
        expect.objectContaining({
          name: 'iPhone 15',
          model: 'iPhone 15',
          serialNumber: 'SMPH00123',
          type: 'celular',
          invoice: 'Invoice 01',
          operatingSystem: 'iOS 17',
          purchaseDate: expect.any(Date),
          departmentId: department.id,
          contractId: contract.id,
          warrantyEndDate: null,
          serviceCompany: null,
          serviceNumber: null,
          assetTag: null,
        }),
      )
    }
  })

  it('should not be able to register a mobile device with invalid contract', async () => {
    const department = makeDepartment()

    const result = await sut.execute({
      contractId: 'non-existent-contract',
      name: 'iPhone 15',
      model: 'iPhone 15',
      serialNumber: 'SMPH00123',
      type: 'celular',
      invoice: 'Invoice 01',
      operatingSystem: 'iOS 17',
      purchaseDate: new Date(),
      departmentId: department.id.toString(),
      warrantyEndDate: null,
      serviceCompany: null,
      serviceNumber: null,
      assetTag: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should not be able to register a mobile device with invalid department', async () => {
    const contract = makeContract()

    const result = await sut.execute({
      departmentId: 'non-existent-department',
      name: 'iPhone 15',
      model: 'iPhone 15',
      serialNumber: 'SMPH00123',
      type: 'celular',
      invoice: 'Invoice 01',
      operatingSystem: 'iOS 17',
      purchaseDate: new Date(),
      contractId: contract.id.toString(),
      warrantyEndDate: null,
      serviceCompany: null,
      serviceNumber: null,
      assetTag: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
