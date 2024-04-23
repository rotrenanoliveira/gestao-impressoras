import { Injectable } from '@nestjs/common'

import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { PrismaWorkstationMapper } from '../mappers/prisma-workstation-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaWorkstationsRepository implements WorkstationsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Workstation[]> {
    const workstations = await this.prisma.workstation.findMany()

    return workstations.map(PrismaWorkstationMapper.toDomain)
  }

  async findManyByDepartmentId(departmentId: string): Promise<Workstation[]> {
    const workstations = await this.prisma.workstation.findMany({
      where: {
        departmentId,
      },
    })

    return workstations.map(PrismaWorkstationMapper.toDomain)
  }

  async findById(workstationId: string): Promise<Workstation | null> {
    const workstation = await this.prisma.workstation.findUnique({
      where: {
        id: workstationId,
      },
    })

    if (!workstation) {
      return null
    }

    return PrismaWorkstationMapper.toDomain(workstation)
  }

  async create(workstation: Workstation): Promise<void> {
    const data = PrismaWorkstationMapper.toPersistence(workstation)

    await this.prisma.workstation.create({
      data,
    })
  }

  async save(workstation: Workstation): Promise<void> {
    const data = PrismaWorkstationMapper.toPersistence(workstation)

    await this.prisma.workstation.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(workstation: Workstation): Promise<void> {
    const data = PrismaWorkstationMapper.toPersistence(workstation)

    await this.prisma.workstation.delete({
      where: {
        id: data.id,
      },
    })
  }
}
