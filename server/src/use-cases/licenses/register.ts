import { LicensesRepository } from '@/repositories/licenses-repository'

interface RegisterLicenseRequest {
  description: string
  price: LicensePrice
  obs: string | null
  expiresAt: Date
  initAt: Date
}

export class RegisterLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ description, price, obs, expiresAt, initAt }: RegisterLicenseRequest): Promise<{ license: License }> {
    // calculating price to saved in cents
    price.value = price.value * 100

    const license = await this.licensesRepository.create({
      obs,
      price,
      initAt,
      expiresAt,
      description,
    })

    return {
      license,
    }
  }
}
