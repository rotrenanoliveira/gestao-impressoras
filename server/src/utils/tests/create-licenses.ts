import { prisma } from '@/lib/prisma'

export async function createLicense() {
  const license = await prisma.license.create({
    data: {
      description: 'Microsoft 365',
      init_at: new Date('2023, 01, 01'),
      expires_at: new Date('2024, 01, 01'),
      price: {
        value: 80 * 100,
        currency: 'BRL',
      },
      obs: null,
    },
  })

  return license
}
