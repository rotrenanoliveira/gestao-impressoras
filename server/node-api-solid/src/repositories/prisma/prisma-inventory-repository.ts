import { prisma } from '@/lib/prisma'
import { InventoryRepository, InventoryTransaction } from '../inventory-repository'

export class PrismaInventoryRepository implements InventoryRepository {
  async findById(item_id: string): Promise<Item | null> {
    const item = await prisma.inventory.findUnique({
      where: {
        id: item_id,
      },
    })

    return item
  }

  async findManyByDeviceId(device_id: string): Promise<Item[]> {
    const items = await prisma.inventory.findMany({
      where: {
        device_id: device_id,
      },
    })

    return items
  }

  async create(data: ItemCreateInput): Promise<Item> {
    const item = await prisma.inventory.create({
      data: {
        title: data.title,
        quantity: data.quantity,
        location: data.location,
        device_id: data.device_id,
        description: data.description,
      },
    })

    return item
  }

  async insert({ item_id, quantity }: InventoryTransaction): Promise<Item | null> {
    const currentItem = await prisma.inventory.findUnique({
      where: {
        id: item_id,
      },
      select: {
        quantity: true,
      },
    })

    if (!currentItem) {
      return null
    }

    const itemUpdatedQuantity = await prisma.inventory.update({
      where: {
        id: item_id,
      },
      data: {
        quantity: currentItem.quantity + quantity,
      },
    })

    return itemUpdatedQuantity
  }

  async consume({ item_id, quantity }: InventoryTransaction): Promise<Item | null> {
    const currentItem = await prisma.inventory.findUnique({
      where: {
        id: item_id,
      },
      select: {
        quantity: true,
      },
    })

    if (!currentItem) {
      return null
    }

    const itemUpdatedQuantity = await prisma.inventory.update({
      where: {
        id: item_id,
      },
      data: {
        quantity: currentItem.quantity - quantity,
      },
    })

    return itemUpdatedQuantity
  }
}
