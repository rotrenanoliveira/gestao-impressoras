import { prisma } from '@/lib/prisma'
import { InventoryRepository, InventoryTransaction } from '../inventory-repository'

export class PrismaInventoryRepository implements InventoryRepository {
  async findMany(): Promise<InventoryItem[]> {
    const items = await prisma.inventory.findMany()

    return items
  }

  async findById(itemId: string): Promise<InventoryItem | null> {
    const item = await prisma.inventory.findUnique({
      where: {
        id: itemId,
      },
    })

    return item
  }

  async findManyByDeviceId(deviceId: string): Promise<InventoryItem[]> {
    const items = await prisma.inventory.findMany({
      where: {
        device_id: deviceId,
      },
    })

    return items
  }

  async create(data: InventoryItemCreateInput): Promise<InventoryItem> {
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

  async insert({ itemId, quantity }: InventoryTransaction): Promise<InventoryItem | null> {
    const currentItem = await prisma.inventory.findUnique({
      where: {
        id: itemId,
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
        id: itemId,
      },
      data: {
        quantity: currentItem.quantity + quantity,
      },
    })

    return itemUpdatedQuantity
  }

  async consume({ itemId, quantity }: InventoryTransaction): Promise<InventoryItem | null> {
    const currentItem = await prisma.inventory.findUnique({
      where: {
        id: itemId,
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
        id: itemId,
      },
      data: {
        quantity: currentItem.quantity - quantity,
      },
    })

    return itemUpdatedQuantity
  }

  async save(itemId: string, data: Omit<Partial<InventoryItem>, 'quantity'>): Promise<InventoryItem | null> {
    const item = await prisma.inventory.update({
      where: {
        id: itemId,
      },
      data: {
        ...data,
      },
    })

    return item
  }

  async remove(itemId: string): Promise<InventoryItem | null> {
    const item = await prisma.inventory.delete({
      where: {
        id: itemId,
      },
    })

    return item
  }
}
