import { DepartmentsRepository } from '../repositories/departments-repositories'

export class FetchDepartmentsUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute() {
    const departments = await this.departmentsRepository.findMany()

    return {
      departments,
    }
  }
}
