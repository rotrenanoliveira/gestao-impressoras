import { LicensesRepository } from '../repositories/licenses-repository'

interface EditLicenseExpireDateUseCaseProps {
  licenseId: string
  expiresAt: Date | null
}

export class EditLicenseExpireDateUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId, expiresAt }: EditLicenseExpireDateUseCaseProps) {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new Error('License not found.')
    }

    license.expiresAt = expiresAt

    await this.licensesRepository.save(license)

    return {
      license,
    }
  }
}
