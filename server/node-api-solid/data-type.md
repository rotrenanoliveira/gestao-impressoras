# Data Types

```ts
// Device
type DeviceCreateInput = {
  name: string
  type: string
  supplier: string
  status: 'OK' | 'WARNING' | 'DANGER'

  acquisition_type: 'BOUGHT' | 'RENTED'
  rented_in: Date | null
  contract_expiration: Date | null

  obs: string | null
  description: string | null
}

type Device = {
  id: string
  created_at: Date
} & DeviceCreateInput
```

```ts
// Inventory Item
type InventoryItemCreateInput = {
  title: string
  quantity: number
  location: string
  device_id: string | null
  description: string | null
}

type InventoryItem = {
  id: string
  created_at: Date
  updated_at: Date
} & InventoryItemCreateInput
```

```ts
// Inventory Transaction
type InventoryTransactionCreateInput = {
  item_id: string
  operator: string
  quantity: number
  transaction_type: 'INSERT' | 'REMOVE'
}

type InventoryTransactionData = {
  id: string
  created_at: Date
} & InventoryTransactionCreateInput

type InventoryTransaction = {
  item: {
    title: string
  }
} & InventoryTransactionData
```
