import { ComputersRepository } from '@/repositories/computers-repository'
import { DevicesRepository } from '@/repositories/devices-repository'

interface RegisterComputerUseCaseRequest {
  name: string
  department: string
  specs: ComputerSpecs
  usedBy: string
}

export class RegisterComputerUseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private computersRepository: ComputersRepository,
  ) {}

  async execute({ name, department, specs, usedBy }: RegisterComputerUseCaseRequest): Promise<{ computer: Computer }> {
    const device = await this.devicesRepository.create({
      name,
      department,
    })

    const computer = await this.computersRepository.create({
      deviceId: device.id,
      specs,
      usedBy,
    })

    return {
      computer,
    }
  }
}
