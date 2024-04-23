import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface UserLicenseProps {
  licenseId: UniqueEntityID
  userId: UniqueEntityID | null
  departmentId: UniqueEntityID | null
  type: 'user' | 'department'
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt?: Date | null
}

export type LicenseUserData = {
  id: UniqueEntityID
  type: 'user' | 'department'
}

export class UserLicense extends Entity<UserLicenseProps> {
  get licenseId() {
    return this.props.licenseId
  }

  get userId() {
    return this.props.userId
  }

  get departmentId() {
    return this.props.departmentId
  }

  get type() {
    return this.props.type
  }

  get status() {
    return this.props.status
  }

  set status(status: 'active' | 'inactive') {
    this.props.status = status
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get licenseUser() {
    if (this.props.type === 'user' && this.props.userId) {
      return {
        id: this.props.userId,
        type: 'user',
      }
    }

    if (this.props.type === 'department' && this.props.departmentId) {
      return {
        id: this.props.departmentId,
        type: 'department',
      }
    }

    throw new Error('Invalid license user')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<UserLicenseProps, 'createdAt' | 'status' | 'type'>, id?: UniqueEntityID) {
    let type: 'user' | 'department' = 'user'

    if (props.userId && props.departmentId === null) {
      type = 'user'
    }

    if (props.departmentId && props.userId === null) {
      type = 'department'
    }

    return new UserLicense(
      {
        ...props,
        type: props.type ?? type,
        status: props.status ?? 'active',
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
  }
}
