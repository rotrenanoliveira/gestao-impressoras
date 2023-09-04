import { prisma } from '@/lib/prisma'
import { createPrinterInk } from './create-printer-ink'

export async function createInkStockTransaction(transactionType: 'insert' | 'remove'): Promise<InkStockTransaction> {
  const { id: inkId, quantity: inkStockQuantity } = await createPrinterInk()

  const stockTransaction = await prisma.inkStockTransaction.create({
    data: {
      ink_id: inkId,
      type: transactionType,
      operator: 'john doe',
    },
  })

  await prisma.printerInkStock.update({
    where: { id: inkId },
    data: {
      quantity: transactionType === 'insert' ? inkStockQuantity + 1 : inkStockQuantity - 1,
    },
  })

  const transaction = await prisma.inkStockTransactionInfo.findUniqueOrThrow({
    where: { id: stockTransaction.id },
  })

  return {
    id: transaction.id,
    operator: transaction.operator,
    type: transaction.type,
    createdAt: new Date(transaction.created_at),
    ink: {
      id: transaction.ink_id,
      name: transaction.name,
    },
  }
}
