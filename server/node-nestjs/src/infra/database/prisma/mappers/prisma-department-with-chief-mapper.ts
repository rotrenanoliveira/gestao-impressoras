import { Department as PrismaDepartment } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DepartmentWithChiefDetails } from '@/domain/it-manager/enterprise/entities/value-objects/department-with-chief-details'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

interface PrismaDepartmentWithChief extends PrismaDepartment {
  chief: {
    id: string
    name: string
  } | null
}

export class PrismaDepartmentWithChiefMapper {
  static toDomain(raw: PrismaDepartmentWithChief): DepartmentWithChiefDetails {
    const departmentId = new UniqueEntityID(raw.id)
    const slug = Slug.create(raw.slug)
    const chief = !raw.chief
      ? null
      : {
          id: new UniqueEntityID(raw.chief.id),
          name: raw.chief.name,
        }

    return DepartmentWithChiefDetails.create({
      departmentId,
      slug,
      description: raw.description,
      email: raw.email,
      chief,
      updatedAt: raw.updatedAt,
    })
  }
}
