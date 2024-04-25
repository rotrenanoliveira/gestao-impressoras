import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'

import { Department } from '../../../enterprise/entities/department'
import { DepartmentsRepository } from '../../repositories/departments-repository'

interface CreateDepartmentUseCaseProps {
  description: string
  email: string | null
}

type CreateDepartmentUseCaseResponse = Either<void, { department: Department }>

export class CreateDepartmentUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ description, email }: CreateDepartmentUseCaseProps): Promise<CreateDepartmentUseCaseResponse> {
    const department = Department.create({
      description,
      email,
    })

    await this.departmentsRepository.create(department)

    return success({ department })
  }
}
