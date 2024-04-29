import { makeDepartment } from '@test/factories/make-department'
import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { FetchWorkstationsUseCase } from './fetch-workstations'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let workstationsRepository: InMemoryWorkstationsRepository
let sut: FetchWorkstationsUseCase

describe('Fetch workstations', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    workstationsRepository = new InMemoryWorkstationsRepository(departmentsRepository)
    sut = new FetchWorkstationsUseCase(workstationsRepository)
  })

  it('should be able to fetch workstations', async () => {
    for (let i = 1; i <= 5; i++) {
      workstationsRepository.items.push(
        makeWorkstation({
          tag: `workstation-${i}`,
        }),
      )
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.workstations).toHaveLength(5)
      expect(workstationsRepository.items).toHaveLength(5)
    }
  })

  it('should be able to fetch workstations query by department', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    for (let i = 0; i < 5; i++) {
      workstationsRepository.items.push(
        makeWorkstation({
          tag: `workstation-${i}`,
          departmentId: department.id,
        }),
      )
    }

    for (let i = 0; i < 5; i++) {
      workstationsRepository.items.push(makeWorkstation())
    }

    const result = await sut.execute({
      department: department.slug.value,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.workstations).toHaveLength(5)
    }
  })
})
