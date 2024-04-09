import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { FetchUsersByDepartmentUseCase } from './fetch-users-by-department'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersByDepartmentUseCase

describe('Fetch users by department', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersByDepartmentUseCase(usersRepository)
  })

  it('should be able to fetch users by department', async () => {
    for (let i = 0; i < 2; i++) {
      usersRepository.items.push(makeUser())
    }

    for (let i = 0; i < 3; i++) {
      usersRepository.items.push(
        makeUser({
          departmentId: new UniqueEntityID('department-id'),
        }),
      )
    }

    const { users } = await sut.execute({
      departmentId: 'department-id',
    })

    expect(users).toHaveLength(3)
  })
})
