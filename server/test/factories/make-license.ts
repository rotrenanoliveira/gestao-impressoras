import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { License, LicenseProps } from '@/domain/it-manager/enterprise/entities/license'
import { faker } from '@faker-js/faker'

export function makeLicense(override: Partial<LicenseProps> = {}, id?: UniqueEntityID) {
  const license = License.create(
    {
      name: faker.commerce.productName(),
      quantity: faker.number.int({ max: 100 }),
      partner: faker.company.name(),
      expiresAt: faker.date.future(),
      obs: faker.lorem.words(10),
      cost: {
        value: Number(faker.commerce.price()),
        currency: faker.finance.currency().code,
      },
      ...override,
    },
    id,
  )

  return license
}
