import {
  WorkstationsFilterParams,
  WorkstationsRepository,
} from '@/domain/it-manager/application/repositories/workstations-repository'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

import { InMemoryDepartmentsRepository } from './in-memory-departments-repository'

export class InMemoryWorkstationsRepository implements WorkstationsRepository {
  constructor(private departmentsRepository: InMemoryDepartmentsRepository) {}

  public items: Workstation[] = []

  async findMany(params: WorkstationsFilterParams): Promise<Workstation[]> {
    if (params.department) {
      const department = await this.departmentsRepository.findBySlug(params.department)

      if (!department) {
        return []
      }

      const workstations = this.items.filter((workstation) => workstation.departmentId === department.departmentId)

      return workstations
    }

    const workstations = this.items

    return workstations
  }

  async findManyByDepartmentId(departmentId: string): Promise<Workstation[]> {
    const workstations = this.items.filter((workstation) => workstation.departmentId.toString() === departmentId)

    return workstations
  }

  async findById(workstationId: string): Promise<Workstation | null> {
    const workstation = this.items.find((item) => item.id.toString() === workstationId)

    return workstation ?? null
  }

  async create(workstation: Workstation): Promise<void> {
    this.items.push(workstation)
  }

  async save(workstation: Workstation): Promise<void> {
    const workstationIndex = this.items.findIndex((item) => item.equals(workstation))

    this.items[workstationIndex] = workstation
  }

  async delete(workstation: Workstation): Promise<void> {
    const workstationIndex = this.items.findIndex((item) => item.equals(workstation))

    this.items.splice(workstationIndex, 1)
  }
}
