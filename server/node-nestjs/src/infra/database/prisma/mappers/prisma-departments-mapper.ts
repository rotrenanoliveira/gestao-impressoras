import { Department as PrismaDepartment, Prisma } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

export class PrismaDepartmentsMapper {
  static toDomain(raw: PrismaDepartment): Department {
    const chiefId = raw.chiefId ? new UniqueEntityID(raw.chiefId) : null
    const slug = Slug.create(raw.slug)

    return Department.create(
      {
        description: raw.description,
        email: raw.email,
        slug,
        chiefId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(department: Department): Prisma.DepartmentUncheckedCreateInput {
    const chiefId = department.chiefId ? department.chiefId.toString() : null

    return {
      id: department.id.toString(),
      description: department.description,
      email: department.email,
      slug: department.slug.value,
      chiefId,
    }
  }
}
