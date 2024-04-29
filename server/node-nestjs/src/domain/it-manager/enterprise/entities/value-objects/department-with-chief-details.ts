import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

import { Slug } from './slug'

export type ChiefDetails = {
  id: UniqueEntityID
  name: string
}

export interface DepartmentWithChiefDetailsProps {
  departmentId: UniqueEntityID
  description: string
  slug: Slug
  email: string | null
  chief: ChiefDetails | null
  updatedAt?: Date | null
}

export class DepartmentWithChiefDetails extends ValueObject<DepartmentWithChiefDetailsProps> {
  get departmentId() {
    return this.props.departmentId
  }

  get description() {
    return this.props.description
  }

  get slug() {
    return this.props.slug
  }

  get email() {
    return this.props.email
  }

  get chief() {
    return this.props.chief
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: DepartmentWithChiefDetailsProps) {
    return new DepartmentWithChiefDetails(props)
  }
}
