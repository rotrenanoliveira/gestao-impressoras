import { License, LicenseCost } from '../../enterprise/entities/license'
import { LicensesRepository } from '../repositories/licenses-repository'

interface RegisterLicenseUseCaseProps {
  name: string
  quantity: number
  partner: string
  cost: LicenseCost
  expiresAt: Date | null
  obs: string
}

export class RegisterLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ name, quantity, partner, cost, expiresAt, obs }: RegisterLicenseUseCaseProps) {
    const license = License.create({
      name,
      quantity,
      cost,
      partner,
      expiresAt,
      obs,
    })

    await this.licensesRepository.create(license)

    return {
      license,
    }
  }
}
