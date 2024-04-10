import { LicensesRepository } from '../repositories/licenses-repository'

export class FetchLicensesCloseToExpireUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute() {
    const licenses = await this.licensesRepository.findManyCloseToExpire()

    return {
      licenses,
    }
  }
}
