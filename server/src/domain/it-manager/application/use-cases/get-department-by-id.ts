import { DepartmentsRepository } from '../repositories/departments-repositories'

interface GetDepartmentByIdUseCaseProps {
  departmentId: string
}

export class GetDepartmentByIdUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ departmentId }: GetDepartmentByIdUseCaseProps) {
    const department = await this.departmentsRepository.findById(departmentId)

    if (!department) {
      throw new Error('Department not found')
    }

    return {
      department,
    }
  }
}
