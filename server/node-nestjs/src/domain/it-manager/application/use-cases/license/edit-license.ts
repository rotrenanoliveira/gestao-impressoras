import dayjs from 'dayjs'

import { Either, failure, success } from '@/core/either'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { License, LicenseCost } from '../../../enterprise/entities/license'
import { LicensesRepository } from '../../repositories/licenses-repository'

interface EditLicenseUseCaseProps {
  licenseId: string
  name: string
  quantity: number
  partner: string
  cost: LicenseCost
  expiresAt: Date | null
  obs: string
}

type EditLicenseUseCaseResponse = Either<ResourceNotFoundError | InvalidParameterError, { license: License }>

export class EditLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({
    licenseId,
    name,
    quantity,
    cost,
    partner,
    expiresAt,
    obs,
  }: EditLicenseUseCaseProps): Promise<EditLicenseUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError(`License with id ${licenseId} not found`))
    }

    if (cost.value <= 0) {
      return failure(new InvalidParameterError('License cost value cannot be zero or negative.'))
    }

    const daysUntilExpire = expiresAt !== null && dayjs(expiresAt).diff(new Date(), 'days')

    if (daysUntilExpire && daysUntilExpire < 0) {
      return failure(new InvalidParameterError('The expiration date must be in the future'))
    }

    license.name = name
    license.quantity = quantity
    license.cost = cost
    license.partner = partner
    license.expiresAt = expiresAt
    license.obs = obs

    await this.licensesRepository.save(license)

    return success({
      license,
    })
  }
}
