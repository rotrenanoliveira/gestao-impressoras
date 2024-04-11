import { UserLicense } from '../../enterprise/entities/user-license'

export interface UserLicensesRepository {
  findMany(): Promise<UserLicense[]>
  findById(userLicenseId: string): Promise<UserLicense | null>

  create(userLicense: UserLicense): Promise<void>
  save(userLicense: UserLicense): Promise<void>
  delete(userLicenseId: string): Promise<void>
}
