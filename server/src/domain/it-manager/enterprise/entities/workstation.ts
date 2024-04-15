import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface WorkstationProps {
  tag: string
  departmentId: UniqueEntityID
  computerId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class Workstation extends Entity<WorkstationProps> {
  get tag() {
    return this.props.tag
  }

  set tag(tag: string) {
    this.props.tag = tag
    this.touch()
  }

  get departmentId() {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
    this.touch()
  }

  get computerId() {
    return this.props.computerId
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

  static create(props: Optional<WorkstationProps, 'createdAt'>, id?: UniqueEntityID) {
    return new Workstation(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
