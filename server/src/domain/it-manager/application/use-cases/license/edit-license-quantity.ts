import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'

interface EditLicenseQuantityUseCaseProps {
  licenseId: string
  quantity: number
}

type EditLicenseQuantityUseCaseResponse = Either<ResourceNotFoundError | InvalidParameterError, { license: License }>

export class EditLicenseQuantityUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId, quantity }: EditLicenseQuantityUseCaseProps): Promise<EditLicenseQuantityUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError(`License with id ${licenseId} not found`))
    }

    if (quantity <= 0) {
      return failure(new InvalidParameterError('License quantity value cannot be zero or negative.'))
    }

    license.quantity = quantity

    await this.licensesRepository.save(license)

    return success({
      license,
    })
  }
}
