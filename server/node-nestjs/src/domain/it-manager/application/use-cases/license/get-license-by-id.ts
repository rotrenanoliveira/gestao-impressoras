import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { License } from '@/domain/it-manager/enterprise/entities/license'

import { LicensesRepository } from '../../repositories/licenses-repository'

interface GetLicenseByIdUseCaseProps {
  licenseId: string
}

type GetLicenseByIdUseCaseResponse = Either<ResourceNotFoundError, { license: License }>

export class GetLicenseByIdUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId }: GetLicenseByIdUseCaseProps): Promise<GetLicenseByIdUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError('License not found.'))
    }

    return success({
      license,
    })
  }
}
