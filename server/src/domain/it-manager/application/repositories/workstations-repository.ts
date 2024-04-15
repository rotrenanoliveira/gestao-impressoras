import { Workstation } from '../../enterprise/entities/workstation'

export interface WorkstationsRepository {
  findMany(): Promise<Workstation[]>
  findManyByDepartmentId(departmentId: string): Promise<Workstation[]>
  findById(workstationId: string): Promise<Workstation | null>

  create(workstation: Workstation): Promise<void>
  save(workstation: Workstation): Promise<void>
  delete(workstationId: string): Promise<void>
}
