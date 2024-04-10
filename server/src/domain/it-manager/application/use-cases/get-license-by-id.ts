import { LicensesRepository } from '../repositories/licenses-repository'

interface GetLicenseByIdUseCaseProps {
  licenseId: string
}

export class GetLicenseByIdUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId }: GetLicenseByIdUseCaseProps) {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new Error('License not found.')
    }

    return {
      license,
    }
  }
}
