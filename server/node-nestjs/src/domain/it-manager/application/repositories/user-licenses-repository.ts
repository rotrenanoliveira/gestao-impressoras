import { UserLicense } from '../../enterprise/entities/user-license'

export abstract class UserLicensesRepository {
  abstract findMany(): Promise<UserLicense[]>
  abstract findById(userLicenseId: string): Promise<UserLicense | null>

  abstract create(userLicense: UserLicense): Promise<void>
  abstract save(userLicense: UserLicense): Promise<void>
  abstract delete(userLicense: UserLicense): Promise<void>
}
