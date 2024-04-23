import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Department, DepartmentProps } from '@/domain/it-manager/enterprise/entities/department'
import { PrismaDepartmentsMapper } from '@/infra/database/prisma/mappers/prisma-departments-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeDepartment(override: Partial<DepartmentProps> = {}, id?: UniqueEntityID) {
  const department = Department.create(
    {
      description: faker.person.jobArea().concat(faker.lorem.words(3)),
      email: faker.internet.email(),
      chiefId: null,
      ...override,
    },
    id,
  )

  return department
}

@Injectable()
export class DepartmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDepartment(data: Partial<DepartmentProps> = {}): Promise<Department> {
    const department = makeDepartment(data)

    await this.prisma.department.create({
      data: PrismaDepartmentsMapper.toPersistence(department),
    })

    return department
  }
}
