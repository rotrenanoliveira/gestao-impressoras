import { prisma } from '@/lib/prisma'
import { InventoryTransactionsRepository } from '../inventory-transactions-repository'

export class PrismaInventoryTransactionsRepository implements InventoryTransactionsRepository {
  async findManyByItemId(item_id: string): Promise<InventoryTransaction[]> {
    const transactionsRaw = await prisma.inventoryTransaction.findMany({
      where: {
        item_id,
      },
      include: {
        item: {
          select: {
            title: true,
          },
        },
      },
    })

    const transactions = transactionsRaw.map((transaction) => {
      return {
        id: transaction.id,
        item_id: transaction.item_id,
        operator: transaction.operator,
        quantity: transaction.quantity,
        transaction_type: transaction.transaction_type,
        created_at: transaction.created_at,
        title: transaction.item.title,
      }
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
