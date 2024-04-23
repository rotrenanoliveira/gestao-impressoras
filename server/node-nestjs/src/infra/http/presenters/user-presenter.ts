import { User } from '@/domain/it-manager/enterprise/entities/user'

export class UserPresenter {
  static toHTTP(user: User) {
    // user.
    const phone = user.phone ? user.phone.value : null
    const workstationId = user.workstationId ? user.workstationId.toString() : null
    const status = user.status.toLocaleLowerCase()

    return {
      id: user.id.toString(),
      departmentId: user.departmentId.toString(),
      name: user.name,
      email: user.email,
      badge: user.badge,
      isActive: user.isActive,
      workstationId,
      status,
      phone,
    }
  }
}
