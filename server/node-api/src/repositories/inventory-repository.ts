export type InventoryTransaction = {
  itemId: string
  quantity: number
}

export interface InventoryRepository {
  create(data: InventoryItemCreateInput): Promise<InventoryItem>

  findMany(): Promise<InventoryItem[]>
  findById(itemId: string): Promise<InventoryItem | null>
  findManyByDeviceId(deviceId: string): Promise<InventoryItem[]>

  insert({ itemId, quantity }: InventoryTransaction): Promise<InventoryItem | null>
  consume({ itemId, quantity }: InventoryTransaction): Promise<InventoryItem | null>

  save(itemId: string, data: Omit<Partial<InventoryItem>, 'quantity'>): Promise<InventoryItem | null>

  remove(itemId: string): Promise<InventoryItem | null>
}
