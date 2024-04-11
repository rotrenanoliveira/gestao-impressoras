import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

export class InMemoryContractsRepository implements ContractsRepository {
  public items: Contract[] = []

  async findById(contractId: string): Promise<Contract | null> {
    const contract = this.items.find((contract) => contract.id.toString() === contractId)

    if (!contract) {
      return null
    }

    return contract
  }

  async findMany(): Promise<Contract[]> {
    return this.items
  }

  async create(contract: Contract): Promise<void> {
    this.items.push(contract)
  }

  async save(contract: Contract): Promise<void> {
    const contractIndex = this.items.findIndex((_contract) => _contract.id === contract.id)

    this.items[contractIndex] = contract
  }

  async delete(contract: Contract): Promise<void> {
    const contractIndex = this.items.findIndex((_contract) => _contract.id === contract.id)

    this.items.splice(contractIndex, 1)
  }
}
