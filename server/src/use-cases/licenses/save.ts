import { ResourceNotFound } from '../errors/resource-not-found'
import { LicensesRepository } from '@/repositories/licenses-repository'

interface SaveLicenseRequest {
  description?: string
  price?: LicensePrice
  obs?: string
  expiresAt?: Date
  initAt?: Date
}

export class SaveLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute(licenseId: string, data: SaveLicenseRequest): Promise<{ license: License }> {
    const currentLicense = await this.licensesRepository.findById(licenseId)

    if (!currentLicense) {
      throw new ResourceNotFound('license')
    }

    if (data.price) {
      data.price.value = data.price.value * 100
    }

    const license = await this.licensesRepository.save(licenseId, {
      ...data,
    })

    return {
      license,
    }
  }
}
