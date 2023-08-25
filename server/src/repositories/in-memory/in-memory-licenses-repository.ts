import { randomUUID } from 'node:crypto'
import { LicensesRepository } from '../licenses-repository'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

function hydrateData(rawData: Partial<License>) {
  const data: Partial<LicenseSchema> = {}

  for (const key in rawData) {
    switch (key) {
      case 'initAt':
        data.init_at = rawData[key]
        break

      case 'expiresAt':
        data.init_at = rawData[key]
        break

      case 'description':
        data.description = rawData[key]
        break

      case 'price':
        data.price = rawData[key]
        break

      case 'obs':
        data.obs = rawData[key]
        break

      default:
        break
    }
  }

  return data
}

export class InMemoryLicensesRepository implements LicensesRepository {
  public items: LicenseSchema[] = []

  async create(data: LicenseCreateInput): Promise<License> {
    const licenseSchema: LicenseSchema = {
      id: randomUUID(),
      created_at: new Date(),
      price: data.price,
      init_at: data.initAt,
      expires_at: data.expiresAt,
      description: data.description,
      obs: data.obs,
    }

    this.items.push(licenseSchema)

    const { id, init_at: initAt, expires_at: expiresAt, created_at: createdAt, description, price, obs } = licenseSchema
    const license = { id, initAt, expiresAt, createdAt, description, price, obs }

    return {
      ...license,
      price: {
        currency: license.price.currency,
        value: license.price.value / 100,
      },
    }
  }

  async findMany(): Promise<License[]> {
    const licenses = this.items.map((license) => {
      const { id, init_at: initAt, expires_at: expiresAt, created_at: createdAt, description, price, obs } = license
      // recalculating price because value is saved in cents
      price.value = price.value / 100

      return { id, initAt, expiresAt, createdAt, description, price, obs }
    })

    return licenses
  }

  async findById(licenseId: string): Promise<License | null> {
    const licenseData = this.items.find((license) => license.id === licenseId)

    if (!licenseData) {
      return null
    }

    const { id, init_at: initAt, expires_at: expiresAt, created_at: createdAt, description, price, obs } = licenseData
    // recalculating price because value is saved in cents
    price.value = price.value / 100

    const license = { id, initAt, expiresAt, createdAt, description, price, obs }

    return license
  }

  async save(licenseId: string, rawData: Partial<LicenseCreateInput>): Promise<License> {
    const licenseIndex = this.items.findIndex((license) => license.id === licenseId)

    if (licenseIndex < 0) {
      throw new ResourceNotFound('license')
    }

    const data = hydrateData(rawData)

    this.items[licenseIndex] = {
      ...this.items[licenseIndex],
      ...data,
    }

    const licenseData = this.items[licenseIndex]

    const { id, init_at: initAt, expires_at: expiresAt, created_at: createdAt, description, price, obs } = licenseData
    // recalculating price because value is saved in cents
    price.value = price.value / 100

    const license = { id, initAt, expiresAt, createdAt, description, price, obs }

    return license
  }

  async remove(licenseId: string): Promise<void | null> {
    const licenseIndex = this.items.findIndex((license) => license.id === licenseId)

    if (licenseIndex < 0) {
      return null
    }

    this.items.splice(licenseIndex, 1)

    return
  }
}
