import { Department } from '@/domain/it-manager/enterprise/entities/department'

export class DepartmentPresenter {
  static toHTTP(department: Department) {
    const chiefId = department.chiefId ? department.chiefId.toString() : null

    return {
      id: department.id.toString(),
      description: department.description,
      slug: department.slug.value,
      email: department.email,
      chiefId,
      updatedAt: department.updatedAt,
    }
  }
}
