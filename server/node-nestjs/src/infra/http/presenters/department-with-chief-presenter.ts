import { DepartmentWithChiefDetails } from '@/domain/it-manager/enterprise/entities/value-objects/department-with-chief-details'

export class DepartmentWithChiefPresenter {
  static toHTTP(department: DepartmentWithChiefDetails) {
    const chief = !department.chief
      ? null
      : {
          id: department.chief.id.toString(),
          name: department.chief.name,
        }

    return {
      id: department.departmentId.toString(),
      description: department.description,
      slug: department.slug.value,
      email: department.email,
      chief,
      updatedAt: department.updatedAt,
    }
  }
}
