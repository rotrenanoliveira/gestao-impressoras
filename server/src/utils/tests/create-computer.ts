import { prisma } from '@/lib/prisma'

export async function createComputer() {
  const { id: deviceId } = await prisma.device.create({
    data: {
      name: 'notebook',
      department: 'it',
      status: 'ok',
    },
  })

  const computer = await prisma.computer.create({
    data: {
      device_id: deviceId,
      used_by: 'john doe',
      specs: {} as ComputerSpecs,
    },
  })

  return computer
}
