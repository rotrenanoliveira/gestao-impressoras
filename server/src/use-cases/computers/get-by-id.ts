import { ComputersRepository } from '@/repositories/computers-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

export class GetComputerByIdUseCase {
  constructor(private computersRepository: ComputersRepository) {}

  async execute(computerId: string): Promise<{ computer: Computer }> {
    const computer = await this.computersRepository.findById(computerId)

    if (!computer) {
      throw new ResourceNotFound('computer')
    }

    return {
      computer,
    }
  }
}
