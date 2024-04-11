import { Either, success } from '@/core/either'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'

type FetchLicensesUseCaseResponse = Either<void, { licenses: License[] }>

export class FetchLicensesUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute(): Promise<FetchLicensesUseCaseResponse> {
    const licenses = await this.licensesRepository.findMany()

    return success({
      licenses,
    })
  }
}
