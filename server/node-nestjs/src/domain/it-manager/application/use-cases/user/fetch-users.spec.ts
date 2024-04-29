import { makeDepartment } from '@test/factories/make-department'
import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { FetchUsersUseCase } from './fetch-users'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchUsersUseCase

describe('Fetch users', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new FetchUsersUseCase(usersRepository)
  })

  it('should be able to fetch users', async () => {
    for (let i = 0; i < 5; i++) {
      usersRepository.items.push(makeUser())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.users).toHaveLength(5)
    }
  })

  it('should be able to fetch users query by department', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    for (let i = 0; i < 5; i++) {
      usersRepository.items.push(
        makeUser({
          departmentId: department.id,
        }),
      )
    }

    for (let i = 0; i < 5; i++) {
      usersRepository.items.push(makeUser())
    }

    const result = await sut.execute({
      department: department.slug.value,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.users).toHaveLength(5)
    }
  })

  it('should be able to fetch users query by user email', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    for (let i = 0; i < 5; i++) {
      usersRepository.items.push(
        makeUser({
          departmentId: department.id,
        }),
      )
    }

    usersRepository.items.push(
      makeUser({
        email: 'joedoe@example.com',
      }),
    )

    const result = await sut.execute({
      email: 'joedoe@example.com',
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.users).toHaveLength(1)
    }
  })
})
