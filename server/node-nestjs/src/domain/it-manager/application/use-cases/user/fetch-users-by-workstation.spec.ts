import { makeUser } from 'test/factories/make-user'
import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { FetchUsersByWorkstationUseCase } from './fetch-users-by-workstation'

let workstationsRepository: InMemoryWorkstationsRepository
let usersRepository: InMemoryUsersRepository
let sut: FetchUsersByWorkstationUseCase

describe('Fetch users by workstation', () => {
  beforeEach(() => {
    workstationsRepository = new InMemoryWorkstationsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersByWorkstationUseCase(usersRepository)
  })

  it('should be able to fetch users by workstation', async () => {
    const workstation = makeWorkstation({
      tag: 'workstation-01',
    })
    workstationsRepository.items.push(workstation)

    for (let i = 0; i < 5; i++) {
      usersRepository.items.push(
        makeUser({
          workstationId: workstation.id,
        }),
      )
    }

    const result = await sut.execute({
      workstationId: workstation.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.users).toHaveLength(5)
    }
  })
})
