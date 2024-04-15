import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Workstation, WorkstationProps } from '@/domain/it-manager/enterprise/entities/workstation'
import { faker } from '@faker-js/faker'

export function makeWorkstation(override: Partial<WorkstationProps> = {}, id?: UniqueEntityID) {
  const workstation = Workstation.create(
    {
      departmentId: new UniqueEntityID(),
      computerId: new UniqueEntityID(),
      tag: faker.lorem.word(),
      ...override,
    },
    id,
  )

  return workstation
}
