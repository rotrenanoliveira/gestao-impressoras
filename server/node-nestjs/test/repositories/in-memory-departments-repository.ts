import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentWithChiefDetails } from '@/domain/it-manager/enterprise/entities/value-objects/department-with-chief-details'

import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryDepartmentsRepository implements DepartmentsRepository {
  constructor(private usersRepository: InMemoryUsersRepository) {}

  public items: Department[] = []

  async findMany(): Promise<Department[]> {
    const departments = this.items

    return departments
  }

  async findManyWithChiefs(): Promise<DepartmentWithChiefDetails[]> {
    const departments = this.items.map((department) => {
      const chiefData = department.chiefId
        ? this.usersRepository.items.find((user) => user.id === department.chiefId)
        : null

      const chief = chiefData
        ? {
            id: chiefData.id,
            name: chiefData.name,
          }
        : null

      return DepartmentWithChiefDetails.create({
        departmentId: department.id,
        slug: department.slug,
        email: department.email,
        description: department.description,
        updatedAt: department.updatedAt,
        chief,
      })
    })

    return departments
  }

  async findById(id: string): Promise<Department | null> {
    const department = this.items.find((department) => department.id.toString() === id)

    if (!department) {
      return null
    }

    return department
  }

  async findBySlug(slug: string): Promise<DepartmentWithChiefDetails | null> {
    const department = this.items.find((department) => department.slug.value === slug)

    if (!department) {
      return null
    }

    const chiefData = department.chiefId
      ? this.usersRepository.items.find((user) => user.id === department.chiefId)
      : null

    const chief = chiefData
      ? {
          id: chiefData.id,
          name: chiefData.name,
        }
      : null

    return DepartmentWithChiefDetails.create({
      departmentId: department.id,
      slug: department.slug,
      email: department.email,
      description: department.description,
      updatedAt: department.updatedAt,
      chief,
    })
  }

  async create(department: Department): Promise<void> {
    this.items.push(department)
  }

  async save(department: Department): Promise<void> {
    const departmentIndex = this.items.findIndex((_department) => _department.id === department.id)

    this.items[departmentIndex] = department
  }

  async delete(department: Department): Promise<void> {
    const departmentIndex = this.items.findIndex((item) => item.equals(department))

    this.items.splice(departmentIndex, 1)
  }
}
