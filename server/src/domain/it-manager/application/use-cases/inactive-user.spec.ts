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

    const { user } = await sut.execute({
      userId: newUser.id.toString(),
    })

    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        id: user.id,
        status: 'inactive',
      }),
    )
  })

  it('should not be able to inactive user with wrong id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
