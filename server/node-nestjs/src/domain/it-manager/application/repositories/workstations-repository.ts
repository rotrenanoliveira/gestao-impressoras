import { Workstation } from '../../enterprise/entities/workstation'

export abstract class WorkstationsRepository {
  abstract findMany(): Promise<Workstation[]>
  abstract findManyByDepartmentId(departmentId: string): Promise<Workstation[]>
  abstract findById(workstationId: string): Promise<Workstation | null>

  abstract create(workstation: Workstation): Promise<void>
  abstract save(workstation: Workstation): Promise<void>
  abstract delete(workstation: Workstation): Promise<void>
}
