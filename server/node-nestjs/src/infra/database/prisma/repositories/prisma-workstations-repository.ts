import { Injectable } from '@nestjs/common'

import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

@Injectable()
export class PrismaWorkstationsRepository implements WorkstationsRepository {
  findMany(): Promise<Workstation[]> {
    throw new Error('Method not implemented.')
  }

  findManyByDepartmentId(departmentId: string): Promise<Workstation[]> {
    throw new Error('Method not implemented.')
  }

  findById(workstationId: string): Promise<Workstation | null> {
    throw new Error('Method not implemented.')
  }

  create(workstation: Workstation): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(workstation: Workstation): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(workstationId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
