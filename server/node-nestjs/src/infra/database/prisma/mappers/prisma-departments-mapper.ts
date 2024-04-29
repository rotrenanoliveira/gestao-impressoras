import { Department as PrismaDepartment, Prisma, User as PrismaUser } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { PrismaUserMapper } from './prisma-user-mapper'

export type PrismaDepartmentWithChief = PrismaDepartment & {
  chief: PrismaUser | null
}

export class PrismaDepartmentsMapper {
  static toDomain(raw: PrismaDepartmentWithChief): Department {
    const slug = Slug.create(raw.slug)

    const chiefId = raw.chiefId ? new UniqueEntityID(raw.chiefId) : null

    return Department.create(
      {
        description: raw.description,
        email: raw.email,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        chiefId,
        slug,
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
