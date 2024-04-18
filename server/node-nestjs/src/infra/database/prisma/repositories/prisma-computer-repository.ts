import { Injectable } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

@Injectable()
export class PrismaComputersRepository implements ComputersRepository {
  async findById(computerId: string): Promise<Computer | null> {
    throw new Error('Method not implemented.')
  }

  async findMany(): Promise<Computer[]> {
    throw new Error('Method not implemented.')
  }

  async create(computer: Computer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async save(computer: Computer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(computerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
