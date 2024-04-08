import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repositories'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

export class InMemoryDepartmentsRepository implements DepartmentsRepository {
  public items: Department[] = []

  async findById(id: string): Promise<Department | null> {
    const department = this.items.find((department) => department.id.toString() === id)

    if (!department) {
      return null
    }

    return department
  }

  async findBySlug(slug: string): Promise<Department | null> {
    const department = this.items.find((department) => department.slug.value === slug)

    if (!department) {
      return null
    }

    return department
  }

  async findMany(): Promise<Department[]> {
    return this.items
  }

  async create(department: Department): Promise<void> {
    this.items.push(department)
  }

  async save(department: Department): Promise<void> {
    this.items.push(department)
  }

  async delete(id: string): Promise<void> {
    const departmentIndex = this.items.findIndex((department) => department.id.toString() === id)

    this.items.splice(departmentIndex, 1)
  }
}
