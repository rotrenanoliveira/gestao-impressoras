import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Computer, ComputerProps } from '@/domain/it-manager/enterprise/entities/computer'
import { faker } from '@faker-js/faker'

export function makeComputer(override: Partial<ComputerProps> = {}, id?: UniqueEntityID) {
  const device = {
    contractId: new UniqueEntityID(),
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    invoice: faker.number.int().toString(),
    assetTag: faker.number.int().toString(),
    purchaseDate: faker.date.recent(),
    warrantyEndDate: faker.date.future(),
  }
  const computer = Computer.create(
    {
      hostname: faker.internet.domainName(),
      ipAddress: faker.internet.ip(),
      description: faker.commerce.productDescription(),
      operatingSystem: 'Windows XP',
      type: 'desktop',
      ...device,
      ...override,
    },
    id,
  )

  return computer
}
