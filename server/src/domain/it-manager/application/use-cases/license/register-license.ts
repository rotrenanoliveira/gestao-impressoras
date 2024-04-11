import dayjs from 'dayjs'

import { Either, failure, success } from '@/core/either'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'
import { License, LicenseCost } from '../../../enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'

interface RegisterLicenseUseCaseProps {
  name: string
  quantity: number
  partner: string
  cost: LicenseCost
  expiresAt: Date | null
  obs: string
}

type RegisterLicenseUseCaseResponse = Either<InvalidParameterError, { license: License }>

export class RegisterLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({
    name,
    quantity,
    partner,
    cost,
    expiresAt,
    obs,
  }: RegisterLicenseUseCaseProps): Promise<RegisterLicenseUseCaseResponse> {
    if (cost.value <= 0) {
      return failure(new InvalidParameterError('License cost value cannot be zero or negative.'))
    }

    const daysUntilExpire = expiresAt !== null && dayjs(expiresAt).diff(new Date(), 'days')

    if (daysUntilExpire && daysUntilExpire < 0) {
      return failure(new InvalidParameterError('The expiration date must be in the future'))
    }

    const license = License.create({
      name,
      quantity,
      cost,
      partner,
      expiresAt,
      obs,
    })

    await this.licensesRepository.create(license)

    return success({
      license,
    })
  }
}
