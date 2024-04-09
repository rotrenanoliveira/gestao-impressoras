import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FetchUsersUseCase } from './fetch-users'
import { makeUser } from 'test/factories/make-user'

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

    const { users } = await sut.execute()

    expect(users).toHaveLength(5)
  })
})
