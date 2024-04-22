import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contract, ContractProps } from '@/domain/it-manager/enterprise/entities/contract'
import { PrismaContractMapper } from '@/infra/database/prisma/mappers/prisma-contracts-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

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

@Injectable()
export class ContractFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaContract(data: Partial<ContractProps> = {}): Promise<Contract> {
    const contract = makeContract(data)

    await this.prisma.contract.create({
      data: PrismaContractMapper.toPersistence(contract),
    })

    return contract
  }
}
