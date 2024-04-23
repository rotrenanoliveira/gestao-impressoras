import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { Computer } from '@/domain/it-manager/enterprise/entities/computer'

export class InMemoryComputersRepository implements ComputersRepository {
  public items: Computer[] = []

  async findById(computerId: string): Promise<Computer | null> {
    const computer = this.items.find((item) => item.id.toString() === computerId)

    return computer ?? null
  }

  async findMany(): Promise<Computer[]> {
    const computers = this.items

    return computers
  }

  async create(computer: Computer): Promise<void> {
    this.items.push(computer)
  }

  async save(computer: Computer): Promise<void> {
    const computerIndex = this.items.findIndex((item) => item.equals(computer))

    this.items[computerIndex] = computer
  }

  async delete(computer: Computer): Promise<void> {
    const computerIndex = this.items.findIndex((item) => item.equals(computer))

    this.items.splice(computerIndex, 1)
  }
}
