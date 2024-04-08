import { Department } from '../../enterprise/entities/department'

export interface DepartmentsRepository {
  findById(id: string): Promise<Department | null>
  findBySlug(slug: string): Promise<Department | null>
  findMany(): Promise<Department[]>

  create(department: Department): Promise<void>
  save(department: Department): Promise<void>

  delete(id: string): Promise<void>
}
