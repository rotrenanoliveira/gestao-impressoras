import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Device, DeviceProps } from '@/domain/it-manager/enterprise/entities/device'
import { faker } from '@faker-js/faker'

export function makeDevice(override: Partial<DeviceProps> = {}, id?: UniqueEntityID) {
  const device = Device.create(
    {
      contractId: new UniqueEntityID(),
      serialNumber: faker.number.int().toString(),
      model: faker.commerce.productName(),
      invoice: faker.number.int().toString(),
      assetTag: faker.number.int().toString(),
      purchaseDate: faker.date.recent(),
      warrantyEndDate: faker.date.future(),
      ...override,
    },
    id,
  )

  return device
}
