import { randomUUID } from 'node:crypto'
import { InventoryRepository, InventoryTransaction } from '../inventory-repository'

export class InMemoryInventoryRepository implements InventoryRepository {
  public items: InventoryItem[] = []

  async findMany(): Promise<InventoryItem[]> {
    return this.items
  }

  async findManyByDeviceId(deviceId: string): Promise<InventoryItem[]> {
    const items = this.items.filter((item) => item.device_id === deviceId)

    return items
  }

  async findById(item_id: string): Promise<InventoryItem | null> {
    const item = this.items.find((item) => item.id === item_id)

    if (!item) {
      return null
    }

    return item
  }

  async create(data: InventoryItemCreateInput & { id?: string }): Promise<InventoryItem> {
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

  async insert({ itemId, quantity }: InventoryTransaction): Promise<InventoryItem | null> {
    const itemIndex = this.items.findIndex((item) => item.id === itemId)

    if (itemIndex < 0) {
      return null
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      quantity: this.items[itemIndex].quantity + quantity,
    }

    return this.items[itemIndex]
  }

  async consume({ itemId, quantity }: InventoryTransaction): Promise<InventoryItem | null> {
    const itemIndex = this.items.findIndex((item) => item.id === itemId)

    if (itemIndex < 0) {
      return null
    }

    this.items[itemIndex] = {
      ...this.items[itemIndex],
      quantity: this.items[itemIndex].quantity - quantity,
    }

    return this.items[itemIndex]
  }

  async save(itemId: string, data: Omit<Partial<InventoryItem>, 'quantity'>): Promise<InventoryItem | null> {
    const itemIndex = this.items.findIndex((item) => item.id === itemId)

    if (itemIndex < 0) {
      return null
    }

    const currentItem = this.items[itemIndex]
    const item = {
      ...currentItem,
      ...data,
    }

    this.items[itemIndex] = { ...item }

    return item
  }

  async remove(itemId: string): Promise<InventoryItem | null> {
    const itemIndex = this.items.findIndex((item) => item.id === itemId)

    if (itemIndex < 0) {
      return null
    }

    const item = this.items[itemIndex]
    this.items.splice(itemIndex, 1)

    return item
  }
}
