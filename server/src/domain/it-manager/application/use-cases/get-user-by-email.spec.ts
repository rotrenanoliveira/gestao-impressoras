import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { GetUserByEmailUseCase } from './get-user-by-email'

let usersRepository: InMemoryUsersRepository
let sut: GetUserByEmailUseCase

describe('Get user by email', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByEmailUseCase(usersRepository)
  })

  it('should be able to get user by email', async () => {
    const newUser = makeUser({
      name: 'Joe Doe',
      email: 'joedoe@example.com',
    })
    usersRepository.items.push(newUser)

    const { user } = await sut.execute({
      email: 'joedoe@example.com',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Joe Doe',
        email: 'joedoe@example.com',
      }),
    )
  })

  it('should not be able to edit user with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'non-existent-user',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
