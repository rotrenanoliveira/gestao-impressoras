import { prisma } from '@/lib/prisma'
import { LicensesRepository } from '../licenses-repository'

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

const xprisma = prisma.$extends({
  result: {
    license: {
      createdAt: {
        needs: { created_at: true },
        compute(license) {
          return new Date(license.created_at)
        },
      },
      initAt: {
        needs: { init_at: true },
        compute(license) {
          return new Date(license.init_at)
        },
      },
      expiresAt: {
        needs: { expires_at: true },
        compute(license) {
          return new Date(license.expires_at)
        },
      },
      price: {
        needs: { price: true },
        compute(license) {
          const price = license.price as LicensePrice

          return {
            currency: price.currency,
            value: price.value / 100,
          } as LicensePrice
        },
      },
    },
  },
})

export class PrismaLicensesRepository implements LicensesRepository {
  private querySelect = {
    id: true,
    price: true,
    initAt: true,
    createdAt: true,
    expiresAt: true,
    description: true,
    obs: true,
  }

  async findMany(): Promise<License[]> {
    const licenses = await xprisma.license.findMany({
      select: { ...this.querySelect },
    })

    return licenses
  }

  async findById(licenseId: string): Promise<License | null> {
    const license = await xprisma.license.findUnique({
      where: { id: licenseId },
    })

    return license
  }

  async create(data: LicenseCreateInput): Promise<License> {
    const { id: licenseId } = await prisma.license.create({
      data: {
        obs: data.obs,
        price: data.price,
        init_at: data.initAt,
        expires_at: data.expiresAt,
        description: data.description,
      },
    })

    const license = await xprisma.license.findUniqueOrThrow({
      where: { id: licenseId },
      select: { ...this.querySelect },
    })

    return license
  }

  async save(licenseId: string, rawData: Partial<LicenseCreateInput>): Promise<License> {
    const data = hydrateData(rawData)

    await prisma.license.update({
      where: { id: licenseId },
      data: { ...data },
    })

    const license = await xprisma.license.findUniqueOrThrow({
      where: { id: licenseId },
      select: { ...this.querySelect },
    })

    return license
  }

  async remove(licenseId: string): Promise<void> {
    await prisma.license.delete({
      where: { id: licenseId },
    })
  }
}
