import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department } from '../../enterprise/entities/department'
import { DepartmentsRepository } from '../repositories/departments-repositories'

interface RegisterDepartmentProps {
  description: string
  email: string | null
  chiefId: string
}

export class RegisterDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ description, email, chiefId }: RegisterDepartmentProps) {
    const department = Department.create({
      chiefId: new UniqueEntityID(chiefId),
      description,
      email,
    })

    await this.departmentsRepository.create(department)

    return {
      department,
    }
  }
}
