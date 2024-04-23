import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Device, DeviceProps } from './device'

export interface ComputerProps extends DeviceProps {
  hostname: string
  ipAddress: string | 'dynamic'
  operatingSystem: string
  description: string
  type: 'NOTEBOOK' | 'DESKTOP' | 'SERVER'
}

export class Computer extends Device<ComputerProps> {
  get hostname() {
    return this.props.hostname
  }

  set hostname(hostname: string) {
    this.props.hostname = hostname
    this.touch()
  }

  get ipAddress() {
    return this.props.ipAddress
  }

  set ipAddress(ipAddress: string | 'dynamic') {
    this.props.ipAddress = ipAddress
    this.touch()
  }

  get operatingSystem() {
    return this.props.operatingSystem
  }

  set operatingSystem(operatingSystem: string) {
    this.props.operatingSystem = operatingSystem
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get type() {
    return this.props.type
  }

  static create(props: Optional<ComputerProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Computer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
