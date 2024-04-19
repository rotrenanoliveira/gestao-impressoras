import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

import { UserLicensesRepository } from '../../repositories/user-licenses-repository'

export interface ActiveUserLicenseUseCaseProps {
  userLicenseId: string
}

type ActiveUserLicenseUseCaseResponse = Either<ResourceNotFoundError, { userLicense: UserLicense }>

export class ActiveUserLicenseUseCase implements UseCase {
  constructor(private userLicensesRepository: UserLicensesRepository) {}

  async execute({ userLicenseId }: ActiveUserLicenseUseCaseProps): Promise<ActiveUserLicenseUseCaseResponse> {
    const userLicense = await this.userLicensesRepository.findById(userLicenseId)

    if (!userLicense) {
      return failure(new ResourceNotFoundError(`User license with id ${userLicenseId} not found`))
    }

    userLicense.status = 'active'

    await this.userLicensesRepository.save(userLicense)

    return success({ userLicense })
  }
}
