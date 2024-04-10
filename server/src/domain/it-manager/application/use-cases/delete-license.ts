import { LicensesRepository } from '../repositories/licenses-repository'

interface DeleteLicenseUseCaseProps {
  licenseId: string
}

export class DeleteLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId }: DeleteLicenseUseCaseProps) {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new Error('License not found.')
    }

    await this.licensesRepository.delete(licenseId)
  }
}
