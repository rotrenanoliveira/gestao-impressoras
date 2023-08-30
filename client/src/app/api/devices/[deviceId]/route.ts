import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// e.g a webhook to `your-website.com/api/revalidate?tag=device`
export const revalidate = 0

export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string } },
) {
  const getDeviceResponse = await fetch(
    `http://127.0.0.1:3333/devices/${params.deviceId}`,
    {
      cache: 'no-store',
    },
  )

  if (getDeviceResponse.status === 404) {
    return NextResponse.json(
      { message: getDeviceResponse.statusText },
      { status: 404 },
    )
  }

  if (!getDeviceResponse.ok) {
    throw new Error('Failed to fetch device')
  }

  const { device }: { device: Device } = await getDeviceResponse.json()

  const getDeviceIventoryItemsResponse = await fetch(
    `http://127.0.0.1:3333/inventory?deviceId=${params.deviceId}`,
    {
      cache: 'no-store',
    },
  )

  if (!getDeviceIventoryItemsResponse.ok) {
    throw new Error('Failed to fetch data')
  }

  const { items: inventory }: { items: Inventory[] } =
    await getDeviceIventoryItemsResponse.json()

  const itemsInInventory = inventory.map((item) => item.id)

  let transactions: InventoryTransaction[] = []

  if (itemsInInventory.length > 0) {
    for (const id of itemsInInventory) {
      const res = await fetch(
        `http://127.0.0.1:3333/inventory/transactions?itemId=${id}`,
        {
          cache: 'no-store',
        },
      )

      if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

      const responseData: { transactions: InventoryTransaction[] } =
        await res.json()
      transactions = [...transactions, ...responseData.transactions]
    }
  }

  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath(path)

  console.log(path)

  return NextResponse.json({ device, inventory, transactions })
}
