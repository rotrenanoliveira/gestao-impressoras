import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { InactiveUserUseCase } from './inactive-user'

let usersRepository: InMemoryUsersRepository
let sut: InactiveUserUseCase

describe('Inactive User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new InactiveUserUseCase(usersRepository)
  })

  it('should be able to active an inactive user', async () => {
    const newUser = makeUser({})
    usersRepository.items.push(newUser)

    const result = await sut.execute({
      userId: newUser.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.user).toEqual(
        expect.objectContaining({
          id: newUser.id,
          status: 'INACTIVE',
        }),
      )
    }
  })

  it('should not be able to inactive user with wrong id', async () => {
    const result = await sut.execute({
      userId: 'non-existent-user',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
