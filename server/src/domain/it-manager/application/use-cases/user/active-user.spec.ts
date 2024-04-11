import { makeUser } from 'test/factories/make-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { ActiveUserUseCase } from './active-user'

let usersRepository: InMemoryUsersRepository
let sut: ActiveUserUseCase

describe('Active User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new ActiveUserUseCase(usersRepository)
  })

  it('should be able to active an inactive user', async () => {
    const newUser = makeUser({
      status: 'inactive',
    })

    usersRepository.items.push(newUser)

    const result = await sut.execute({
      userId: newUser.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(usersRepository.items[0]).toEqual(
        expect.objectContaining({
          id: result.result.user.id,
          status: 'active',
        }),
      )
    }
  })

  it('should not be able to active user with wrong id', async () => {
    const result = await sut.execute({
      userId: 'non-existent-user',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
