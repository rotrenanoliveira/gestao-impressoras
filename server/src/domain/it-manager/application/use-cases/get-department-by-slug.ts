import { DepartmentsRepository } from '../repositories/departments-repositories'

interface GetDepartmentBySlugUseCaseProps {
  slug: string
}

export class GetDepartmentBySlugUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ slug }: GetDepartmentBySlugUseCaseProps) {
    const department = await this.departmentsRepository.findBySlug(slug)

    if (!department) {
      throw new Error('Department not found')
    }

    return {
      department,
    }
  }
}
