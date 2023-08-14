import { InventoryTransactionsRepository } from '@/repositories/inventory-transactions-repository'
import { InventoryRepository } from '@/repositories/inventory-repository'
import { InvalidTransactionQuantityError } from '@/use-cases/errors/invalid-transaction-quantity'
import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'

export class RegisterInventoryTransactionUseCase {
  constructor(
    private inventoryRepository: InventoryRepository,
    private inventoryTransactionsRepository: InventoryTransactionsRepository,
  ) {}

  async execute({
    item_id: itemId,
    operator,
    quantity,
    transaction_type,
  }: InventoryTransactionCreateInput): Promise<void> {
    const item = await this.inventoryRepository.findById(itemId)

    if (!item) {
      throw new ResourceNotFound('item')
    }

    if (quantity > item.quantity && transaction_type === 'REMOVE') {
      throw new InvalidTransactionQuantityError()
    }

    await this.inventoryTransactionsRepository.create({
      item_id: itemId,
      operator,
      quantity,
      transaction_type,
    })

    if (transaction_type === 'INSERT') {
      await this.inventoryRepository.insert({
        itemId,
        quantity,
      })
    } else {
      await this.inventoryRepository.consume({
        itemId,
        quantity,
      })
    }

    return
  }
}
