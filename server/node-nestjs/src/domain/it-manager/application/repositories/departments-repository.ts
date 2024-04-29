import { Department } from '../../enterprise/entities/department'
import { DepartmentWithChiefDetails } from '../../enterprise/entities/value-objects/department-with-chief-details'

export abstract class DepartmentsRepository {
  abstract findMany(): Promise<Department[]>
  abstract findManyWithChiefs(): Promise<DepartmentWithChiefDetails[]>
  abstract findById(id: string): Promise<Department | null>
  abstract findBySlug(slug: string): Promise<DepartmentWithChiefDetails | null>

  abstract create(department: Department): Promise<void>
  abstract save(department: Department): Promise<void>
  abstract delete(department: Department): Promise<void>
}
