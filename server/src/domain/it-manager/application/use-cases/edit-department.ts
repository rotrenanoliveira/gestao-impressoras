import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DepartmentsRepository } from '../repositories/departments-repositories'

interface EditDepartmentProps {
  departmentId: string
  chiefId: string
  description: string
  email: string | null
}

export class EditDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId, chiefId, description, email }: EditDepartmentProps) {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      throw new Error('Department not found')
    }

    department.description = description
    department.email = email
    department.chiefId = new UniqueEntityID(chiefId)

    await this.departmentsRepository.save(department)

    return {
      department,
    }
  }
}
