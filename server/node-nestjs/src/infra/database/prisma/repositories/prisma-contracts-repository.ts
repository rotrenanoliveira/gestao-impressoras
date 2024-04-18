import { Injectable } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

@Injectable()
export class PrismaContractsRepository implements ContractsRepository {
  async findById(contractId: string): Promise<Contract | null> {
    throw new Error('Method not implemented.')
  }

  async findMany(): Promise<Contract[]> {
    throw new Error('Method not implemented.')
  }

  async create(contract: Contract): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(contract: Contract): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(contract: Contract): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
