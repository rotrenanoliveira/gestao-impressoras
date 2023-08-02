import { randomUUID } from 'node:crypto'
import { InventoryRepository, InventoryTransaction } from '../inventory-repository'

export class InMemoryInventoryRepository implements InventoryRepository {
  public items: Item[] = []

  async findById(item_id: string): Promise<Item | null> {
    const item = this.items.find((item) => item.id === item_id)

    if (!item) {
      return null
    }

    return item
  }

  async findManyByDeviceId(device_id: string): Promise<Item[]> {
    const items = this.items.filter((item) => item.device_id === device_id)

    return items
  }

  async create(data: ItemCreateInput & { id?: string }): Promise<Item> {
    const item = {
      id: data.id ?? randomUUID(),
      device_id: data.device_id,
      title: data.title,
      quantity: data.quantity,
      location: data.location,
      description: data.description,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(item)

    return item
  }

  async insert({ item_id, quantity }: InventoryTransaction): Promise<Item | null> {
    const itemIndex = this.items.findIndex((item) => item.id === item_id)

    if (itemIndex < 0) {
      return null
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      quantity: this.items[itemIndex].quantity + quantity,
    }

    return this.items[itemIndex]
  }

  async consume({ item_id, quantity }: InventoryTransaction): Promise<Item | null> {
    const itemIndex = this.items.findIndex((item) => item.id === item_id)

    if (itemIndex < 0) {
      return null
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      quantity: this.items[itemIndex].quantity - quantity,
    }

    return this.items[itemIndex]
  }
}
