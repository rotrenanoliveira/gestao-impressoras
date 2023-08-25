import { prisma } from '@/lib/prisma'
import { ComputersRepository } from '../computers-repository'

const xprisma = prisma.$extends({
  result: {
    computerInfo: {
      deviceId: {
        needs: { device_id: true },
        compute(computer) {
          return `${computer.device_id}`
        },
      },
      usedBy: {
        needs: { used_by: true },
        compute(computer) {
          return `${computer.used_by}`
        },
      },
      specs: {
        needs: { specs: true },
        compute(computer) {
          return computer.specs as ComputerSpecs
        },
      },
    },
  },
})

function hydrateData(rawData: Partial<Computer>) {
  const data: Partial<ComputerSchema> = {}

  for (const key in rawData) {
    switch (key) {
      case 'specs':
        data.specs = rawData[key]
        break

      case 'usedBy':
        data.used_by = rawData[key]
        break

      default:
        break
    }
  }

  return data
}

export class PrismaComputersRepository implements ComputersRepository {
  private querySelect = {
    id: true,
    name: true,
    specs: true,
    status: true,
    usedBy: true,
    deviceId: true,
  }

  async create(data: ComputerCreateInput): Promise<Computer> {
    const { id: computerId } = await prisma.computer.create({
      data: {
        specs: data.specs,
        used_by: data.usedBy,
        device_id: data.deviceId,
      },
    })

    const computer = await xprisma.computerInfo.findUniqueOrThrow({
      where: { id: computerId },
      select: { ...this.querySelect },
    })

    return computer
  }

  async findMany(): Promise<Computer[]> {
    const computers = await xprisma.computerInfo.findMany({
      select: { ...this.querySelect },
    })

    return computers
  }

  async findById(computerId: string): Promise<Computer | null> {
    const computer = await xprisma.computerInfo.findUnique({
      where: { id: computerId },
      select: { ...this.querySelect },
    })

    return computer
  }

  async save(computerId: string, rawData: ComputerSaveInput): Promise<Computer> {
    const data = hydrateData(rawData)

    await prisma.computer.update({
      where: { id: computerId },
      data: { ...data },
    })

    const computer = await xprisma.computerInfo.findUniqueOrThrow({
      where: { id: computerId },
      select: { ...this.querySelect },
    })

    return computer
  }

  async remove(computerId: string): Promise<Computer> {
    const computer = await xprisma.computerInfo.findUniqueOrThrow({
      where: { id: computerId },
      select: { ...this.querySelect },
    })

    await prisma.computer.delete({
      where: { id: computerId },
    })

    return computer
  }
}
