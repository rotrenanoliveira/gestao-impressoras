import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

import { PrismaComputerMapper } from '../mappers/prisma-computer-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaComputersRepository implements ComputersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(computerId: string): Promise<Computer | null> {
    const computer = await this.prisma.computer.findUnique({
      where: {
        id: computerId,
      },
    })

    if (!computer) {
      return null
    }

    return PrismaComputerMapper.toDomain(computer)
  }

  async findMany(): Promise<Computer[]> {
    const computers = await this.prisma.computer.findMany()

    return computers.map(PrismaComputerMapper.toDomain)
  }

  async create(computer: Computer): Promise<void> {
    const data = PrismaComputerMapper.toPersistence(computer)

    await this.prisma.computer.create({
      data,
    })
  }

  async save(computer: Computer): Promise<void> {
    const data = PrismaComputerMapper.toPersistence(computer)

    await this.prisma.computer.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(computer: Computer): Promise<void> {
    const data = PrismaComputerMapper.toPersistence(computer)

    await this.prisma.computer.delete({
      where: {
        id: data.id,
      },
    })
  }
}
