import { Contract as PrismaContract, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

export class PrismaContractMapper {
  static toDomain(raw: PrismaContract): Contract {
    const type = raw.type === 'RENTAL' ? 'rental' : 'loan'

    return Contract.create(
      {
        description: raw.description,
        contactEmail: raw.contactEmail,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        startAt: raw.startAt,
        endAt: raw.endAt,
        attachments: [],
        type,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(contract: Contract): Prisma.ContractUncheckedCreateInput {
    return {
      id: contract.id.toString(),
      contactEmail: contract.contactEmail,
      description: contract.description,
      createdAt: contract.createdAt,
      startAt: contract.startAt,
      endAt: contract.endAt,
      type: contract.type === 'rental' ? 'RENTAL' : 'LOAN',
    }
  }
}
