import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { GetUserByIdUseCase } from './get-user-by-id'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase

describe('Get user by id', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new GetUserByIdUseCase(usersRepository)
  })

  it('should be able to get user by id', async () => {
    const newUser = makeUser({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
    })
    usersRepository.items.push(newUser)

    const result = await sut.execute({
      userId: newUser.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.user).toEqual(
        expect.objectContaining({
          name: 'Joe Doe',
          email: 'joedoe@example.com',
        }),
      )
    }
  })

  it('should not be able to edit user with wrong id', async () => {
    const result = await sut.execute({
      userId: 'non-existent-user',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
