import { ComputersRepository } from '@/repositories/computers-repository'
import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

interface SaveComputerRequest {
  name?: string
  department?: string
  status?: DeviceStatus
  specs?: ComputerSpecs
  usedBy?: string
}

export class SaveComputerUseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private computersRepository: ComputersRepository,
  ) {}

  async execute(computerId: string, data: SaveComputerRequest): Promise<{ computer: Computer }> {
    const currentComputer = await this.computersRepository.findById(computerId)

    if (!currentComputer) {
      throw new ResourceNotFound('computer')
    }

    if (data.department || data.status || data.name) {
      const { deviceId } = currentComputer
      await this.devicesRepository.save(deviceId, { ...data })
    }

    if (!data.specs && !data.usedBy) {
      return {
        computer: {
          ...currentComputer,
          name: data.name!,
          status: data.status!,
        },
      }
    }

    const computer = await this.computersRepository.save(computerId, { ...data })

    if (!computer) {
      throw new Error('Failed to save computer')
    }

    return {
      computer,
    }
  }
}
