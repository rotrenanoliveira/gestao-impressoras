export interface InventoryTransactionsRepository {
  create(data: InventoryTransactionCreateInput): Promise<void>

  findManyByItemId(item_id: string): Promise<InventoryTransaction[]>
  findManyByDeviceId(device_id: string): Promise<InventoryTransaction[]>
}
