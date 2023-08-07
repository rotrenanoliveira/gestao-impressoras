import { prisma } from '@/lib/prisma'
import { InventoryTransactionsRepository } from '../inventory-transactions-repository'

export class PrismaInventoryTransactionsRepository implements InventoryTransactionsRepository {
  async findMany(): Promise<InventoryTransaction[]> {
    const transactions = await prisma.inventoryTransaction.findMany({
      include: {
        item: {
          select: {
            title: true,
          },
        },
      },
    })

    return transactions
  }

  async findManyByItemId(itemId: string): Promise<InventoryTransaction[]> {
    const transactions = await prisma.inventoryTransaction.findMany({
      where: {
        item_id: itemId,
      },
      include: {
        item: {
          select: {
            title: true,
          },
        },
      },
    })

    return transactions
  }

  async create(data: InventoryTransactionCreateInput): Promise<void> {
    await prisma.inventoryTransaction.create({
      data: {
        item_id: data.item_id,
        operator: data.operator,
        quantity: data.quantity,
        transaction_type: data.transaction_type,
      },
    })
  }
}
