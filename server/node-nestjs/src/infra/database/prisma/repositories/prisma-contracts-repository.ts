import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

import { PrismaContractMapper } from '../mappers/prisma-contracts-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaContractsRepository implements ContractsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(contractId: string): Promise<Contract | null> {
    const contract = await this.prisma.contract.findUnique({
      where: {
        id: contractId,
      },
    })

    if (!contract) {
      return null
    }

    return PrismaContractMapper.toDomain(contract)
  }

  async findMany(): Promise<Contract[]> {
    const contracts = await this.prisma.contract.findMany()

    return contracts.map(PrismaContractMapper.toDomain)
  }

  async create(contract: Contract): Promise<void> {
    const data = PrismaContractMapper.toPersistence(contract)

    await this.prisma.contract.create({
      data,
    })
  }

  async save(contract: Contract): Promise<void> {
    const data = PrismaContractMapper.toPersistence(contract)

    await this.prisma.contract.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(contract: Contract): Promise<void> {
    const data = PrismaContractMapper.toPersistence(contract)

    await this.prisma.contract.delete({
      where: {
        id: data.id,
      },
    })
  }
}
