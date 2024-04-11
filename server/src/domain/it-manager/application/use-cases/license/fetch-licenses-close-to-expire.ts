import { Either, success } from '@/core/either'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'

type FetchLicensesCloseToExpireUseCaseResponse = Either<void, { licenses: License[] }>

export class FetchLicensesCloseToExpireUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute(): Promise<FetchLicensesCloseToExpireUseCaseResponse> {
    const licenses = await this.licensesRepository.findManyCloseToExpire()

    return success({
      licenses,
    })
  }
}
