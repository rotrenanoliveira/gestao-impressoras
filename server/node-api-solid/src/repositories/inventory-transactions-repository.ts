export interface InventoryTransactionsRepository {
  create(data: InventoryTransactionCreateInput): Promise<void>

  findMany(): Promise<InventoryTransaction[]>
  findManyByItemId(item_id: string): Promise<InventoryTransaction[]>
}
