import { LicensesRepository } from '@/repositories/licenses-repository'

export class FetchManyLicensesUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute(): Promise<{ licenses: License[] }> {
    const licenses = await this.licensesRepository.findMany()

    return {
      licenses,
    }
  }
}
