import { ResourceNotFound } from '../errors/resource-not-found'
import { LicensesRepository } from '@/repositories/licenses-repository'

export class GetLicenseByIdUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute(licenseId: string): Promise<{ license: License }> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new ResourceNotFound('license')
    }

    return {
      license,
    }
  }
}
