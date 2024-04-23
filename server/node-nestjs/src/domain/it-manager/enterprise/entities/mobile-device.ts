import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { Device, DeviceProps } from './device'

export interface MobileDeviceProps extends DeviceProps {
  departmentId: UniqueEntityID | null
  name: string
  type: string
  operatingSystem: string
  serviceCompany: string | null
  serviceNumber: string | null
}

export class MobileDevice extends Device<MobileDeviceProps> {
  get departmentId() {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID | null) {
    this.props.departmentId = departmentId
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get type() {
    return this.props.type
  }

  get operatingSystem() {
    return this.props.operatingSystem
  }

  set operatingSystem(operatingSystem: string) {
    this.props.operatingSystem = operatingSystem
    this.touch()
  }

  get serviceCompany() {
    return this.props.serviceCompany
  }

  set serviceCompany(serviceCompany: string | null) {
    this.props.serviceCompany = serviceCompany
    this.touch()
  }

  get serviceNumber() {
    return this.props.serviceNumber
  }

  set serviceNumber(serviceNumber: string | null) {
    this.props.serviceNumber = serviceNumber
    this.touch()
  }

  static create(props: Optional<MobileDeviceProps, 'createdAt'>, id?: UniqueEntityID) {
    return new MobileDevice(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
