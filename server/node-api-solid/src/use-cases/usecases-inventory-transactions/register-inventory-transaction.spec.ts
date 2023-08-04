import { InMemoryInventoryRepository } from '@/repositories/in-memory/in-memory-inventory-repository'
import { InMemoryInventoryTransactionsRepository } from '@/repositories/in-memory/in-memory-inventory-transactions-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFound } from '../errors/resource-not-found'
import { RegisterInventoryTransactionUseCase } from './register-inventory-transaction'
import { InvalidTransactionQuantityError } from '../errors/invalid-transaction-quantity'

let inventoryRepository: InMemoryInventoryRepository
let inventoryTransactionsRepository: InMemoryInventoryTransactionsRepository
let sut: RegisterInventoryTransactionUseCase

describe('Consume item in inventory', () => {
  beforeEach(() => {
    inventoryRepository = new InMemoryInventoryRepository()
    inventoryTransactionsRepository = new InMemoryInventoryTransactionsRepository()
    sut = new RegisterInventoryTransactionUseCase(inventoryRepository, inventoryTransactionsRepository)
  })

  it('should be able to insert item in inventory', async () => {
    const item = await inventoryRepository.create({
      deviceId: 'device-id',
      title: 'tinta',
      location: 'almoxarifado',
      quantity: 1,
      description: null,
    })

    const QUANTITY_TO_INSERT = 1

    await sut.execute({
      itemId: item.id,
      quantity: QUANTITY_TO_INSERT,
      operator: 'operator-name',
      transaction_type: 'INSERT',
    })

    expect(inventoryRepository.items[0].quantity).toEqual(item.quantity + QUANTITY_TO_INSERT)
  })

  it('should be able to consume item in inventory', async () => {
    const item = await inventoryRepository.create({
      deviceId: 'device-id',
      title: 'tinta',
      location: 'almoxarifado',
      quantity: 10,
      description: null,
    })

    const QUANTITY_TO_CONSUME = 1

    await sut.execute({
      itemId: item.id,
      operator: 'operator-name',
      quantity: QUANTITY_TO_CONSUME,
      transaction_type: 'REMOVE',
    })

    expect(inventoryRepository.items[0].quantity).toEqual(item.quantity - QUANTITY_TO_CONSUME)

    expect(inventoryTransactionsRepository.items[0]).toEqual(
      expect.objectContaining({
        itemId: item.id,
        operator: 'operator-name',
      }),
    )
  })

  it('should not be able to register a inventory transaction with invalid item ID', async () => {
    await expect(() =>
      sut.execute({
        itemId: 'non-existent-item',
        operator: 'operator-name',
        quantity: 1,
        transaction_type: 'INSERT',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should not be able to register a inventory transaction if the quantity consumed is more than quantity in inventory', async () => {
    const item = await inventoryRepository.create({
      deviceId: 'device-id',
      title: 'tinta',
      location: 'almoxarifado',
      quantity: 10,
      description: null,
    })

    const QUANTITY_TO_CONSUME = 11

    await expect(() =>
      sut.execute({
        itemId: item.id,
        operator: 'operator-name',
        quantity: QUANTITY_TO_CONSUME,
        transaction_type: 'REMOVE',
      }),
    ).rejects.toBeInstanceOf(InvalidTransactionQuantityError)
  })
})
