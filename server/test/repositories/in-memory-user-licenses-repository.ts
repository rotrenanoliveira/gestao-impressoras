import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export class InMemoryUserLicensesRepository implements UserLicensesRepository {
  public items: UserLicense[] = []

  async findMany(): Promise<UserLicense[]> {
    return this.items
  }

  async findById(userLicenseId: string): Promise<UserLicense | null> {
    const userLicense = this.items.find((userLicense) => userLicense.id.toString() === userLicenseId)

    if (!userLicense) {
      return null
    }

    return userLicense
  }

  async create(userLicense: UserLicense): Promise<void> {
    this.items.push(userLicense)
  }

  async save(userLicense: UserLicense): Promise<void> {
    const userLicenseIndex = this.items.findIndex((_userLicense) => _userLicense.id === userLicense.id)

    this.items[userLicenseIndex] = userLicense
  }

  async delete(userLicenseId: string): Promise<void> {
    const userLicenseIndex = this.items.findIndex((userLicense) => userLicense.id.toString() === userLicenseId)

    this.items.splice(userLicenseIndex, 1)
  }
}
