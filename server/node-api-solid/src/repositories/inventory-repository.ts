export type InventoryTransaction = {
  item_id: string
  quantity: number
}

export interface InventoryRepository {
  create(data: ItemCreateInput): Promise<Item>

  findById(item_id: string): Promise<Item | null>

  insert({ item_id, quantity }: InventoryTransaction): Promise<Item | null>
  consume({ item_id, quantity }: InventoryTransaction): Promise<Item | null>
}
