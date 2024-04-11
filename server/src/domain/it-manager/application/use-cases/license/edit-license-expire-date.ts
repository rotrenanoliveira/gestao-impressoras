import dayjs from 'dayjs'

import { Either, failure, success } from '@/core/either'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'

interface EditLicenseExpireDateUseCaseProps {
  licenseId: string
  expiresAt: Date | null
}

type EditLicenseExpireDateUseCaseResponse = Either<ResourceNotFoundError | InvalidParameterError, { license: License }>

export class EditLicenseExpireDateUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({
    licenseId,
    expiresAt,
  }: EditLicenseExpireDateUseCaseProps): Promise<EditLicenseExpireDateUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError(`License with id ${licenseId} not found`))
    }

    const daysUntilExpire = expiresAt !== null && dayjs(expiresAt).diff(new Date(), 'days')

    if (daysUntilExpire && daysUntilExpire < 0) {
      return failure(new InvalidParameterError('The expiration date must be in the future'))
    }

    license.expiresAt = expiresAt

    await this.licensesRepository.save(license)

    return success({
      license,
    })
  }
}
