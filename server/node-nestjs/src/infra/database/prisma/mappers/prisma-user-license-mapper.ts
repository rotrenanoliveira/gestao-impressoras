import { Prisma, UserLicense as PrismaUserLicense } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export class PrismaUserLicensesMapper {
  static toDomain(raw: PrismaUserLicense): UserLicense {
    const userId = raw.userId ? new UniqueEntityID(raw.userId) : null
    const departmentId = raw.departmentId ? new UniqueEntityID(raw.departmentId) : null

    const status = raw.status === 'ACTIVE' ? 'active' : 'inactive'
    const type = raw.type === 'USER' ? 'user' : 'department'

    return UserLicense.create(
      {
        licenseId: new UniqueEntityID(raw.licenseId),
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
        departmentId,
        userId,
        status,
        type,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(userLicense: UserLicense): Prisma.UserLicenseUncheckedCreateInput {
    return {
      id: userLicense.id.toString(),
      licenseId: userLicense.licenseId.toString(),
      departmentId: userLicense.departmentId?.toString(),
      userId: userLicense.userId?.toString(),
      status: userLicense.status === 'active' ? 'ACTIVE' : 'INACTIVE',
      type: userLicense.type === 'user' ? 'USER' : 'DEPARTMENT',
      createdAt: userLicense.createdAt,
    }
  }
}
