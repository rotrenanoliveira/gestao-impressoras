import { LicensesRepository } from '../repositories/licenses-repository'

export class FetchLicensesUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute() {
    const licenses = await this.licensesRepository.findMany()

    return {
      licenses,
    }
  }
}
