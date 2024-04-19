import { Either, failure, success } from '@/core/either'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { License, LicenseCost } from '../../../enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'

interface EditLicenseCostUseCaseProps {
  licenseId: string
  cost: LicenseCost
}

type EditLicenseCostUseCaseResponse = Either<ResourceNotFoundError | InvalidParameterError, { license: License }>

export class EditLicenseCostUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId, cost }: EditLicenseCostUseCaseProps): Promise<EditLicenseCostUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError(`License with id ${licenseId} not found`))
    }

    if (cost.value <= 0) {
      return failure(new InvalidParameterError('License cost value cannot be zero or negative.'))
    }

    license.cost = cost

    await this.licensesRepository.save(license)

    return success({
      license,
    })
  }
}
