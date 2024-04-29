import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { DepartmentWithChiefDetails } from '@/domain/it-manager/enterprise/entities/value-objects/department-with-chief-details'

import { DepartmentsRepository } from '../../repositories/departments-repository'

interface GetDepartmentBySlugUseCaseProps {
  slug: string
}

type GetDepartmentBySlugUseCaseResponse = Either<ResourceNotFoundError, { department: DepartmentWithChiefDetails }>

export class GetDepartmentBySlugUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({ slug }: GetDepartmentBySlugUseCaseProps): Promise<GetDepartmentBySlugUseCaseResponse> {
    const department = await this.departmentsRepository.findBySlug(slug)

    if (!department) {
      return failure(new ResourceNotFoundError(`Department with slug ${slug} not found`))
    }

    return success({
      department,
    })
  }
}
