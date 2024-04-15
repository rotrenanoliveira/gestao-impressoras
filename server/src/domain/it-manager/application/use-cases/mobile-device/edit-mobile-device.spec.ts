import { makeContract } from 'test/factories/make-contract'
import { makeDepartment } from 'test/factories/make-department'
import { makeMobileDevice } from 'test/factories/make-mobile-device'
import { InMemoryContractsRepository } from 'test/repositories/in-memory-contracts-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryMobileDevicesRepository } from 'test/repositories/in-memory-mobile-devices-repository'
import { EditMobileDeviceUseCase } from './edit-mobile-device'

let mobileDevicesRepository: InMemoryMobileDevicesRepository
let contractsRepository: InMemoryContractsRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: EditMobileDeviceUseCase

describe('Register mobile device', () => {
  beforeEach(() => {
    mobileDevicesRepository = new InMemoryMobileDevicesRepository()
    contractsRepository = new InMemoryContractsRepository()
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new EditMobileDeviceUseCase(mobileDevicesRepository, contractsRepository, departmentsRepository)
  })

  it('should be able to edit mobile device', async () => {
    const contract = makeContract()
    contractsRepository.items.push(contract)

    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const newMobileDevice = makeMobileDevice({
      contractId: contract.id,
      departmentId: department.id,
    })
    mobileDevicesRepository.items.push(newMobileDevice)

    const result = await sut.execute({
      mobileDeviceId: newMobileDevice.id.toString(),
      departmentId: department.id.toString(),
      contractId: contract.id.toString(),
      name: "Department's iPhone",
      operatingSystem: 'iOS 17.4',
      model: 'iPhone 15',
      warrantyEndDate: null,
      serviceCompany: null,
      serviceNumber: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.mobileDevice).toEqual(
        expect.objectContaining({
          id: newMobileDevice.id,
          name: "Department's iPhone",
          operatingSystem: 'iOS 17.4',
          model: 'iPhone 15',
        }),
      )
    }
  })

  it('should not be able to edit a mobile device with invalid contract', async () => {
    const department = makeDepartment()

    const newMobileDevice = makeMobileDevice({
      departmentId: department.id,
    })
    mobileDevicesRepository.items.push(newMobileDevice)

    const result = await sut.execute({
      contractId: 'non-existent-contract',
      mobileDeviceId: newMobileDevice.id.toString(),
      departmentId: department.id.toString(),
      name: "Department's iPhone",
      operatingSystem: 'iOS 17.4',
      model: 'iPhone 15',
      warrantyEndDate: null,
      serviceCompany: null,
      serviceNumber: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should not be able to edit a mobile device with invalid department', async () => {
    const contract = makeContract()

    const newMobileDevice = makeMobileDevice({
      contractId: contract.id,
    })
    mobileDevicesRepository.items.push(newMobileDevice)

    const result = await sut.execute({
      departmentId: 'non-existent-department',
      mobileDeviceId: newMobileDevice.id.toString(),
      contractId: contract.id.toString(),
      name: "Department's iPhone",
      operatingSystem: 'iOS 17.4',
      model: 'iPhone 15',
      warrantyEndDate: null,
      serviceCompany: null,
      serviceNumber: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
