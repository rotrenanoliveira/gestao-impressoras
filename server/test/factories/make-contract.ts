import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contract, ContractProps } from '@/domain/it-manager/enterprise/entities/contract'
import { faker } from '@faker-js/faker'

export function makeContract(override: Partial<ContractProps> = {}, id?: UniqueEntityID) {
  const contract = Contract.create(
    {
      description: faker.commerce.productDescription(),
      contactEmail: faker.internet.email(),
      startAt: faker.date.recent(),
      endAt: faker.date.future(),
      type: 'rental',
      ...override,
    },
    id,
  )

  return contract
}
