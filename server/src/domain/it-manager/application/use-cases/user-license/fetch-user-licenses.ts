import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'
import { UserLicensesRepository } from '../../repositories/user-licenses-repository'

type FetchUserLicensesUseCaseResponse = Either<void, { userLicenses: UserLicense[] }>

export class FetchUserLicensesUseCase implements UseCase {
  constructor(private usersLicensesRepository: UserLicensesRepository) {}

  async execute(): Promise<FetchUserLicensesUseCaseResponse> {
    const userLicenses = await this.usersLicensesRepository.findMany()

    return success({ userLicenses })
  }
}
