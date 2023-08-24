import { ComputersRepository } from '@/repositories/computers-repository'

export class FetchManyComputersUseCase {
  constructor(private computersRepository: ComputersRepository) {}

  async execute(): Promise<{ computers: Computer[] }> {
    const computers = await this.computersRepository.findMany()

    return {
      computers,
    }
  }
}
