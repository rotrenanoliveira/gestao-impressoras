import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation, WorkstationProps } from '@/domain/it-manager/enterprise/entities/workstation'
import { PrismaWorkstationMapper } from '@/infra/database/prisma/mappers/prisma-workstation-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeWorkstation(override: Partial<WorkstationProps> = {}, id?: UniqueEntityID) {
  const workstation = Workstation.create(
    {
      departmentId: new UniqueEntityID(),
      computerId: new UniqueEntityID(),
      tag: faker.lorem.word(),
      ...override,
    },
    id,
  )

  return workstation
}

@Injectable()
export class WorkstationFactory {
  constructor(private prisma: PrismaService) {}

  async makeWorkstationPrisma(data: Partial<WorkstationProps> = {}) {
    const workstation = makeWorkstation(data)

    await this.prisma.workstation.create({
      data: PrismaWorkstationMapper.toPersistence(workstation),
    })

    return workstation
  }
}
