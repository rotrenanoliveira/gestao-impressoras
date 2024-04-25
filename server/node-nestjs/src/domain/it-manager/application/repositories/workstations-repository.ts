import { Workstation } from '../../enterprise/entities/workstation'

export type WorkstationsFilterParams = {
  department?: string
}

export abstract class WorkstationsRepository {
  abstract findMany(params: WorkstationsFilterParams): Promise<Workstation[]>
  abstract findManyByDepartmentId(departmentId: string): Promise<Workstation[]>
  abstract findById(workstationId: string): Promise<Workstation | null>

  abstract create(workstation: Workstation): Promise<void>
  abstract save(workstation: Workstation): Promise<void>
  abstract delete(workstation: Workstation): Promise<void>
}
