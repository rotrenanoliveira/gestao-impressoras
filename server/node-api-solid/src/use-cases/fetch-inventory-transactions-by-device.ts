import { InventoryTransactionsRepository } from '@/repositories/inventory-transactions-repository'

interface UseCaseResponse {
  transactions: InventoryTransaction[]
}

export class FetchInventoryTransactionsByDeviceUseCase {
  constructor(private inventoryTransactionsRepository: InventoryTransactionsRepository) {}

  async execute({ device_id }: { device_id: string }): Promise<UseCaseResponse> {
    const transactions = await this.inventoryTransactionsRepository.findManyByDeviceId(device_id)

    return {
      transactions,
    }
  }
}
