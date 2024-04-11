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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  /**
   * Create a new User instance with the given properties.
   *
   *  @example
   * ```typescript
   * const user = User.create({
   *    departmentId: new UniqueEntityID('7ea8f10a-403e-4025-a68d-ae04b85e49c5'),
   *    ame: 'Joe Doe',
   *    email: 'joedoe@example.com',
   *    phone: Phone.format('11956136512'),
   *    badge: '123456',
   * })
   * ```
   *
   * @param {Optional<UserProps, 'createdAt' | 'status'>} props - The properties for the new User instance.
   * @param {UniqueEntityID} id - (Optional) The unique ID for the User instance.
   * @return {User} The newly created User instance.
   */
  static create(props: Optional<UserProps, 'createdAt' | 'status'>, id?: UniqueEntityID): User {
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
