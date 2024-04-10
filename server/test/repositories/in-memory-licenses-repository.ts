import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { License } from '@/domain/it-manager/enterprise/entities/license'
import dayjs from 'dayjs'

export class InMemoryLicensesRepository implements LicensesRepository {
  public items: License[] = []

  async findById(licenseId: string): Promise<License | null> {
    const license = this.items.find((license) => license.id.toString() === licenseId)

    if (!license) {
      return null
    }

    return license
  }

  async findMany(): Promise<License[]> {
    const licenses = this.items

    return licenses
  }

  async findManyCloseToExpire(): Promise<License[]> {
    const licenses = this.items.filter((license) => {
      const diff = dayjs(license.expiresAt).diff(new Date(), 'days')

      return diff >= 0 && diff <= 30
    })

    return licenses
  }

  async create(license: License): Promise<void> {
    this.items.push(license)
  }

  async save(license: License): Promise<void> {
    const licenseIndex = this.items.findIndex((_license) => _license.id === license.id)

    this.items[licenseIndex] = license
  }

  async delete(licenseId: string): Promise<void> {
    const licenseIndex = this.items.findIndex((license) => license.id.toString() === licenseId)

    this.items.splice(licenseIndex, 1)
  }
}
