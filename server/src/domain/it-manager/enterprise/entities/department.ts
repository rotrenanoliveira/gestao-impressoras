import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DepartmentProps {
  chiefId?: UniqueEntityID | null
  description: string
  slug: Slug
  email: string | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Department extends Entity<DepartmentProps> {
  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.props.slug = Slug.createFromText(description)
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get email() {
    return this.props.email
  }

  set email(email: string | null) {
    this.props.email = email
    this.touch()
  }

  get chiefId() {
    return this.props.chiefId
  }

  set chiefId(chiefId: UniqueEntityID | null | undefined) {
    this.props.chiefId = chiefId
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
   * A function that creates a new Department instance.
   *
   * @example
   * // Creating a new department with all properties
   * const department = Department.create({
   *   chiefId: new UniqueEntityID('chief-123'),
   *   description: 'Marketing Department',
   *   slug: Slug.create('marketing'),
   *   email: 'marketing@company.com',
   *   createdAt: new Date(),
   * })
   *
   * @param {Optional<DepartmentProps, 'createdAt'>} props - The properties for the new Department
   * @param {UniqueEntityID} id - Optional unique ID for the Department
   * @return {Department} A new Department instance
   */
  static create(props: Optional<DepartmentProps, 'createdAt' | 'slug'>, id?: UniqueEntityID): Department {
    const department = new Department(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.description),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return department
  }
}
