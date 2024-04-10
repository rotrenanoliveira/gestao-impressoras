import { LicenseCost } from '../../enterprise/entities/license'
import { LicensesRepository } from '../repositories/licenses-repository'

interface EditLicenseCostUseCaseProps {
  licenseId: string
  cost: LicenseCost
}

export class EditLicenseCostUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId, cost }: EditLicenseCostUseCaseProps) {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new Error('License not found.')
    }

    license.cost = cost

    await this.licensesRepository.save(license)

    return {
      license,
    }
  }
}
