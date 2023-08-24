import { randomUUID } from 'node:crypto'
import { PrintersRepository } from '../printers-repository'

function hydrateData(rawData: Partial<Printer>) {
  const data: Partial<PrinterSchema> = {}

  for (const key in rawData) {
    switch (key) {
      case 'ip':
        data.ip = rawData[key]
        break

      case 'rentedIn':
        data.rented_in = rawData[key]
        break

      case 'expiresAt':
        data.expires_at = rawData[key]
        break

      case 'obs':
        data.obs = rawData[key]
        break

      default:
        break
    }
  }

  return data
}

export class InMemoryPrintersRepository implements PrintersRepository {
  public items: PrinterSchema[] = []

  async findMany(): Promise<Printer[]> {
    const printers = this.items.map((printer) => {
      const { id, ip, device_id: deviceId, rented_in: rentedIn, expires_at: expiresAt, obs } = printer
      return { id, ip, deviceId, rentedIn, expiresAt, obs, name: '', status: 'ok' as DeviceStatus }
    })

    return printers
  }

  async findById(printerId: string): Promise<Printer | null> {
    const printerData = this.items.find((printer) => printer.id === printerId)

    if (!printerData) {
      return null
    }

    const { id, ip, device_id: deviceId, rented_in: rentedIn, expires_at: expiresAt, obs } = printerData
    const printer = { id, ip, deviceId, rentedIn, expiresAt, obs, name: '', status: '' as DeviceStatus }

    return printer
  }

  async create(data: PrinterCreateInput): Promise<Printer> {
    const savePrinter: PrinterSchema = {
      id: randomUUID(),
      device_id: data.deviceId,
      ip: data.ip,
      obs: data.obs,
      rented_in: data.rentedIn,
      expires_at: data.expiresAt,
    }

    this.items.push(savePrinter)

    const { id, ip, device_id: deviceId, rented_in: rentedIn, expires_at: expiresAt, obs } = savePrinter
    const printer = { id, ip, deviceId, rentedIn, expiresAt, obs, name: '', status: '' as DeviceStatus }

    return printer
  }

  async save(
    printerId: string,
    rawData: Partial<Partial<Omit<PrinterCreateInput, 'deviceId'>>>,
  ): Promise<Printer | null> {
    const printerIndex = this.items.findIndex((printer) => printer.id === printerId)

    if (printerIndex < 0) {
      return null
    }

    const data = hydrateData(rawData)

    this.items[printerIndex] = {
      ...this.items[printerIndex],
      ...data,
    }

    const { id, ip, device_id: deviceId, rented_in: rentedIn, expires_at: expiresAt, obs } = this.items[printerIndex]
    const printer = { id, ip, deviceId, rentedIn, expiresAt, obs, name: '', status: '' as DeviceStatus }

    return printer
  }

  async remove(printerId: string): Promise<Printer | null> {
    const printerIndex = this.items.findIndex((printer) => printer.id === printerId)

    if (printerIndex < 0) {
      return null
    }

    const { id, ip, device_id: deviceId, rented_in: rentedIn, expires_at: expiresAt, obs } = this.items[printerIndex]
    const printer = { id, ip, deviceId, rentedIn, expiresAt, obs, name: '', status: '' as DeviceStatus }

    this.items.splice(printerIndex, 1)

    return printer
  }
}
