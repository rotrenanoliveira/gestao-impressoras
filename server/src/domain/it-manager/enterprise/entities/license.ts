import dayjs from 'dayjs'

import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface LicenseCost {
  value: number
  currency: string
}

export interface LicenseProps {
  name: string
  quantity: number
  expiresAt: Date | null
  partner: string
  cost: LicenseCost
  obs: string
  createdAt: Date
  updatedAt?: Date | null
}

export class License extends Entity<LicenseProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get quantity() {
    return this.props.quantity
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity
    this.touch()
  }

  get expiresAt() {
    return this.props.expiresAt
  }

  set expiresAt(expiresAt: Date | null) {
    this.props.expiresAt = expiresAt
    this.touch()
  }

  get partner() {
    return this.props.partner
  }

  set partner(partner: string) {
    this.props.partner = partner
    this.touch()
  }

  get cost() {
    return this.props.cost
  }

  set cost(cost: LicenseCost) {
    this.props.cost = cost
    this.touch()
  }

  get obs() {
    return this.props.obs
  }

  set obs(obs: string) {
    this.props.obs = obs
    this.touch()
  }

  get daysUntilExpires(): number {
    return dayjs(this.expiresAt).diff(new Date(), 'days')
  }

  get totalCost(): number {
    return this.quantity * this.cost.value
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
   * A function that creates a new License instance.
   *
   *  @example
   * ```typescript
   * const license = License.create({
   *   name: 'My License',
   *   quantity: 10,
   *   expiresAt: new Date('2024-01-01'),
   *   partner: 'Partner Company',
   *   cost: { value: 100, currency: 'USD' },
   *   obs: 'Some observations',
   * })
   * ```
   *
   * @param {Optional<LicenseProps, 'createdAt'>} props - the properties for the new License
   * @param {UniqueEntityID} id - optional unique ID for the License
   * @return {License} a new License instance
   */
  static create(props: Optional<LicenseProps, 'createdAt'>, id?: UniqueEntityID): License {
    return new License(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
