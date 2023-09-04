import { prisma } from '@/lib/prisma'

export async function createPrinter() {
  const { id: deviceId } = await prisma.device.create({
    data: {
      name: 'epson',
      department: 'it',
      status: 'ok',
    },
  })

  const printer = await prisma.printer.create({
    data: {
      ip: '0.0.0.1',
      device_id: deviceId,
      rented_in: new Date('2023, 01,01'),
      expires_at: new Date('2024, 01,01'),
      obs: null,
    },
  })

  return printer
}
