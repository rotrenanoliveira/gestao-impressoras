import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ContractProps {
  description: string
  type: 'rental' | 'loan'
  contactEmail: string
  startAt: Date
  endAt?: Date | null
  attachments?: string[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Contract extends Entity<ContractProps> {
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

  set type(type: 'rental' | 'loan') {
    this.props.type = type
    this.touch()
  }

  get contactEmail() {
    return this.props.contactEmail
  }

  set contactEmail(contactEmail: string) {
    this.props.contactEmail = contactEmail
    this.touch()
  }

  get startAt() {
    return this.props.startAt
  }

  get endAt() {
    return this.props.endAt
  }

  set endAt(endAt: Date | null | undefined) {
    this.props.endAt = endAt
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<ContractProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Contract(
      {
        ...props,
        attachments: props.attachments ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
