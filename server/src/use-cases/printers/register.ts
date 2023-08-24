import { DevicesRepository } from '@/repositories/devices-repository'
import { PrintersRepository } from '@/repositories/printers-repository'

interface RegisterPrinterUseCaseRequest {
  name: string
  department: string
  ip: string
  obs: string | null
  rentedIn: Date | null
  expiresAt: Date | null
}

export class RegisterPrinterUseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private printersRepository: PrintersRepository,
  ) {}

  async execute({
    name,
    department,
    ip,
    obs,
    rentedIn,
    expiresAt,
  }: RegisterPrinterUseCaseRequest): Promise<{ printer: Printer }> {
    const device = await this.devicesRepository.create({
      name,
      department,
    })

    const printer = await this.printersRepository.create({
      deviceId: device.id,
      ip,
      rentedIn,
      expiresAt,
      obs,
    })

    return {
      printer,
    }
  }
}
