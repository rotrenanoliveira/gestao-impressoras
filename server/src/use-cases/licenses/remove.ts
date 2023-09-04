import { ResourceNotFound } from '../errors/resource-not-found'
import { LicensesRepository } from '@/repositories/licenses-repository'

export class RemoveLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute(licenseId: string): Promise<void> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new ResourceNotFound('license')
    }

    await this.licensesRepository.remove(licenseId)

    return
  }
}
