import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { FetchUsersUseCase } from './fetch-users'

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersUseCase

describe('Fetch users', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
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
})
