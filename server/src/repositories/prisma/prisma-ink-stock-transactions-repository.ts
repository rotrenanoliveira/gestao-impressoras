import { prisma } from '@/lib/prisma'
import { InkStockTransactionsRepository } from '../printer-ink-stock-transactions-repository'

const xprisma = prisma.$extends({
  result: {
    inkStockTransactionInfo: {
      createdAt: {
        needs: { created_at: true },
        compute(transaction) {
          return new Date(transaction.created_at)
        },
      },
      ink: {
        needs: { ink_id: true, name: true },
        compute(transaction) {
          return {
            id: transaction.ink_id,
            name: transaction.name,
          }
        },
      },
    },
  },
})

export class PrismaInkStockTransactionsRepository implements InkStockTransactionsRepository {
  private querySelect = {
    id: true,
    ink: true,
    type: true,
    operator: true,
    createdAt: true,
  }

  async findMany(): Promise<InkStockTransaction[]> {
    const transactions = await xprisma.inkStockTransactionInfo.findMany({
      select: { ...this.querySelect },
    })

    return transactions
  }

  async findManyByInk(inkId: string): Promise<InkStockTransaction[]> {
    const transactions = await xprisma.inkStockTransactionInfo.findMany({
      where: { ink_id: inkId },
      select: { ...this.querySelect },
    })

    return transactions
  }

  async create(data: InkStockTransactionCreateInput): Promise<InkStockTransaction> {
    const stockTransaction = await prisma.inkStockTransaction.create({
      data: {
        type: data.type,
        ink_id: data.inkId,
        operator: data.operator,
      },
    })

    const transaction = await xprisma.inkStockTransactionInfo.findUniqueOrThrow({
      where: { id: stockTransaction.id },
      select: { ...this.querySelect },
    })

    return transaction
  }
}
