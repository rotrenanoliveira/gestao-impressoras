import { Department } from '@/domain/it-manager/enterprise/entities/department'

export class DepartmentPresenter {
  static toHttpResponse(department: Department) {
    const chiefId = department.chiefId ? department.chiefId.toString() : null

    return {
      id: department.id.toString(),
      description: department.description,
      email: department.email,
      slug: department.slug.value,
      updatedAt: department.updatedAt,
      chiefId,
    }
  }
}
