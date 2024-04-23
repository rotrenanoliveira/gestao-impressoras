import { Prisma, Workstation as PrismaWorkstation } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export class PrismaWorkstationMapper {
  static toDomain(raw: PrismaWorkstation): Workstation {
    const computerId = raw.computerId ? new UniqueEntityID(raw.computerId) : null

    return Workstation.create(
      {
        tag: raw.tag,
        departmentId: new UniqueEntityID(raw.departmentId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        computerId,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(workstation: Workstation): Prisma.WorkstationUncheckedCreateInput {
    const computerId = workstation.computerId ? workstation.computerId.toString() : null

    return {
      id: workstation.id.toString(),
      departmentId: workstation.departmentId.toString(),
      tag: workstation.tag,
      computerId,
      createdAt: workstation.createdAt,
    }
  }
}
