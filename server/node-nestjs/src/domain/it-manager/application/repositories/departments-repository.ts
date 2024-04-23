import { Department } from '../../enterprise/entities/department'

export abstract class DepartmentsRepository {
  abstract findById(id: string): Promise<Department | null>
  abstract findBySlug(slug: string): Promise<Department | null>
  abstract findMany(): Promise<Department[]>

  abstract create(department: Department): Promise<void>
  abstract save(department: Department): Promise<void>
  abstract delete(department: Department): Promise<void>
}
