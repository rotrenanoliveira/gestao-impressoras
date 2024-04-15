import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { MobileDevice, MobileDeviceProps } from '@/domain/it-manager/enterprise/entities/mobile-device'
import { faker } from '@faker-js/faker'

export function makeMobileDevice(override: Partial<MobileDeviceProps> = {}, id?: UniqueEntityID) {
  const device = {
    contractId: new UniqueEntityID(),
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    invoice: faker.number.int().toString(),
    assetTag: faker.number.int().toString(),
    purchaseDate: faker.date.recent(),
    warrantyEndDate: faker.date.future(),
  }

  const mobileDevice = MobileDevice.create(
    {
      name: faker.commerce.productName(),
      departmentId: new UniqueEntityID(),
      type: 'celular',
      operatingSystem: 'Android',
      serviceCompany: null,
      serviceNumber: null,
      ...device,
      ...override,
    },
    id,
  )

  return mobileDevice
}
