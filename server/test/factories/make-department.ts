import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department, DepartmentProps } from '@/domain/it-manager/enterprise/entities/department'

export function makeDepartment(override: Partial<DepartmentProps> = {}, id?: UniqueEntityID) {
  const department = Department.create(
    {
      chiefId: new UniqueEntityID(),
      description: faker.person.jobArea(),
      email: faker.internet.email(),
      ...override,
    },
    id,
  )

  return department
}
