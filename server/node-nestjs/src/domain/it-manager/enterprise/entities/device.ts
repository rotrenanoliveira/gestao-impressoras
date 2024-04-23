import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DeviceProps {
  contractId: UniqueEntityID | null
  serialNumber: string
  model: string
  invoice: string
  assetTag: string | null
  purchaseDate: Date
  warrantyEndDate: Date | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Device<Props extends DeviceProps> extends Entity<Props> {
  get serialNumber() {
    return this.props.serialNumber
  }

  get model() {
    return this.props.model
  }

  set model(model: string) {
    this.props.model = model
    this.touch()
  }

  get invoice() {
    return this.props.invoice
  }

  get assetTag() {
    return this.props.assetTag
  }

  get purchaseDate() {
    return this.props.purchaseDate
  }

  get warrantyEndDate() {
    return this.props.warrantyEndDate
  }

  set warrantyEndDate(warrantyEndDate: Date | null) {
    this.props.warrantyEndDate = warrantyEndDate
    this.touch()
  }

  get contractId() {
    return this.props.contractId
  }

  set contractId(contractId: UniqueEntityID | null) {
    this.props.contractId = contractId
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  protected touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<DeviceProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Device(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
