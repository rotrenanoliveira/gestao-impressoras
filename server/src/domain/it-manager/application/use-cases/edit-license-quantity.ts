import { LicensesRepository } from '../repositories/licenses-repository'

interface EditLicenseQuantityUseCaseProps {
  licenseId: string
  quantity: number
}

export class EditLicenseQuantityUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId, quantity }: EditLicenseQuantityUseCaseProps) {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new Error('License not found.')
    }

    license.quantity = quantity

    await this.licensesRepository.save(license)

    return {
      license,
    }
  }
}
