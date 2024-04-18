import { Either, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UseCase } from '@/core/use-cases/use-case'

import { Department } from '../../../enterprise/entities/department'
import { DepartmentsRepository } from '../../repositories/departments-repository'

interface RegisterDepartmentUseCaseProps {
  description: string
  email: string | null
  chiefId: string | null
}

type RegisterDepartmentUseCaseResponse = Either<void, { department: Department }>

export class RegisterDepartmentUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    description,
    email,
    chiefId,
  }: RegisterDepartmentUseCaseProps): Promise<RegisterDepartmentUseCaseResponse> {
    const department = Department.create({
      chiefId: chiefId ? new UniqueEntityID(chiefId) : null,
      description,
      email,
    })

    await this.departmentsRepository.create(department)

    return success({ department })
  }
}
