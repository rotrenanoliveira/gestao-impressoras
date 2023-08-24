import { ComputersRepository } from '@/repositories/computers-repository'
import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class RemoveComputerUseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private computersRepository: ComputersRepository,
  ) {}

  async execute(computerId: string): Promise<void> {
    const computer = await this.computersRepository.findById(computerId)

    if (!computer) {
      throw new ResourceNotFound('computer')
    }

    await this.devicesRepository.remove(computer.deviceId)
    await this.computersRepository.remove(computerId)

    return
  }
}
