import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Device, DeviceProps } from './device'

export interface PrinterProps extends DeviceProps {
  name: string
  colorMode: 'black-and-white' | 'color'
  printingType: 'laser' | 'inkjet' | 'dot-matrix' | 'thermal'
  ipAddress?: string | null
  obs: string | null
}

export class Printer extends Device<PrinterProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get colorMode() {
    return this.props.colorMode
  }

  get printingType() {
    return this.props.printingType
  }

  get ipAddress() {
    return this.props.ipAddress
  }

  set ipAddress(ipAddress: string | null | undefined) {
    this.props.ipAddress = ipAddress
    this.touch()
  }

  get obs() {
    return this.props.obs
  }

  set obs(obs: string | null) {
    this.props.obs = obs
    this.touch()
  }

  static create(props: Optional<PrinterProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Printer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
