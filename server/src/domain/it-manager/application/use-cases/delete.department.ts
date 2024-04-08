import { DepartmentsRepository } from '../repositories/departments-repositories'

interface DeleteDepartmentUseCaseProps {
  departmentId: string
}

export class DeleteDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId }: DeleteDepartmentUseCaseProps) {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      throw new Error('Department not found')
    }

    await this.departmentsRepository.delete(departmentId)
  }
}
