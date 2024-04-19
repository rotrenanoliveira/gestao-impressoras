import { License } from '../../enterprise/entities/license'

export abstract class LicensesRepository {
  abstract findById(licenseId: string): Promise<License | null>
  abstract findMany(): Promise<License[]>
  abstract findManyCloseToExpire(): Promise<License[]>

  abstract create(license: License): Promise<void>
  abstract save(license: License): Promise<void>
  abstract delete(license: License): Promise<void>
}
