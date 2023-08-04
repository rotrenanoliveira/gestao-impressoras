export interface InventoryTransactionsRepository {
  create(data: InventoryTransactionCreateInput): Promise<void>

  findMany(): Promise<InventoryTransaction[]>
  findManyByItemId(itemId: string): Promise<InventoryTransaction[]>
}
