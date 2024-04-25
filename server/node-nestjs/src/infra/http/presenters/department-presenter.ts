import { Department } from '@/domain/it-manager/enterprise/entities/department'

export class DepartmentPresenter {
  static toHTTP(department: Department) {
    const chief = !department.chief
      ? null
      : {
          id: department.chief.id.toString(),
          name: department.chief.name,
        }

    return {
      id: department.id.toString(),
      description: department.description,
      slug: department.slug.value,
      email: department.email,
      chief,
      updatedAt: department.updatedAt,
    }
  }
}
