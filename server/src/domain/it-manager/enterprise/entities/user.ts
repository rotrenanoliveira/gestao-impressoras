import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Phone } from './value-objects/phone'

export interface UserProps {
  name: string
  email: string
  phone: Phone | null
  badge: string
  status: 'active' | 'inactive'
  departmentId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: Phone | null) {
    this.props.phone = phone
    this.touch()
  }

  get badge() {
    return this.props.badge
  }

  set badge(badge: string) {
    this.props.badge = badge
    this.touch()
  }

  get status() {
    return this.props.status
  }

  set status(status: 'active' | 'inactive') {
    this.props.status = status
    this.touch()
  }

  get isActive() {
    return this.props.status === 'active'
  }

  get departmentId() {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserProps, 'createdAt' | 'status'>, id?: UniqueEntityID) {
    return new User(
      {
        ...props,
        status: props.status ?? 'active',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
