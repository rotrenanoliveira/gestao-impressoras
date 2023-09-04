import { prisma } from '@/lib/prisma'
import { PrintersRepository } from '../printers-repository'

const xprisma = prisma.$extends({
  result: {
    printerInfo: {
      deviceId: {
        needs: { device_id: true },
        compute(printer) {
          return `${printer.device_id}`
        },
      },
      rentedIn: {
        needs: { rented_in: true },
        compute(printer) {
          return printer.rented_in ? new Date(printer.rented_in) : null
        },
      },
      expiresAt: {
        needs: { expires_at: true },
        compute(printer) {
          return printer.expires_at ? new Date(printer.expires_at) : null
        },
      },
    },
  },
})

function hydrateData(rawData: Partial<Printer>) {
  const data: Partial<PrinterSchema> = {}

  for (const key in rawData) {
    switch (key) {
      case 'ip':
        data.ip = rawData[key]
        break

      case 'rentedIn':
        data.rented_in = rawData[key]
        break

      case 'expiresAt':
        data.expires_at = rawData[key]
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

export class PrismaPrintersRepository implements PrintersRepository {
  private querySelect = {
    id: true,
    name: true,
    deviceId: true,
    department: true,
    expiresAt: true,
    rentedIn: true,
    status: true,
    obs: true,
    ip: true,
  }

  async create(data: PrinterCreateInput): Promise<Printer> {
    const { id: printerId } = await prisma.printer.create({
      data: {
        ip: data.ip,
        device_id: data.deviceId,
        expires_at: data.expiresAt,
        rented_in: data.rentedIn,
        obs: data.obs,
      },
    })

    const printer = await xprisma.printerInfo.findUniqueOrThrow({
      where: { id: printerId },
      select: { ...this.querySelect },
    })

    return printer
  }

  async findMany(): Promise<Printer[]> {
    const printers = await xprisma.printerInfo.findMany({
      select: { ...this.querySelect },
    })

    return printers
  }

  async findById(printerId: string): Promise<Printer | null> {
    const printer = await xprisma.printerInfo.findUnique({
      where: { id: printerId },
      select: { ...this.querySelect },
    })

    return printer
  }

  async save(printerId: string, rawData: PrinterSaveInput): Promise<Printer> {
    const data = hydrateData(rawData)

    await prisma.printer.update({
      where: { id: printerId },
      data: { ...data },
    })

    const printer = await xprisma.printerInfo.findUniqueOrThrow({
      where: { id: printerId },
    })

    return printer
  }

  async remove(printerId: string): Promise<Printer> {
    const printer = await xprisma.printerInfo.findUniqueOrThrow({
      where: { id: printerId },
      select: { ...this.querySelect },
    })

    await prisma.printer.delete({
      where: { id: printerId },
    })

    return printer
  }
}
