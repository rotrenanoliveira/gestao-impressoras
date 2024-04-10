import { License } from '../../enterprise/entities/license'

export interface LicensesRepository {
  findById(licenseId: string): Promise<License | null>
  findMany(): Promise<License[]>
  findManyCloseToExpire(): Promise<License[]>

  create(license: License): Promise<void>
  save(license: License): Promise<void>
  delete(licenseId: string): Promise<void>
}
