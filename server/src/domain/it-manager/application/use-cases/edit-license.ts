import { LicenseCost } from '../../enterprise/entities/license'
import { LicensesRepository } from '../repositories/licenses-repository'

interface EditLicenseUseCaseProps {
  licenseId: string
  name: string
  quantity: number
  partner: string
  cost: LicenseCost
  expiresAt: Date | null
  obs: string
}

export class EditLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId, name, quantity, cost, partner, expiresAt, obs }: EditLicenseUseCaseProps) {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      throw new Error('License not found.')
    }

    license.name = name
    license.quantity = quantity
    license.cost = cost
    license.partner = partner
    license.expiresAt = expiresAt
    license.obs = obs

    await this.licensesRepository.save(license)

    return {
      license,
    }
  }
}
