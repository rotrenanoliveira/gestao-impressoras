import { faker } from '@faker-js/faker'
import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { makeUser } from 'test/factories/make-user'
import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { AddUserToWorkstationUseCase } from './add-user-to-workstation'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let workstationsRepository: InMemoryWorkstationsRepository
let sut: AddUserToWorkstationUseCase

describe('Add user to workstation', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    workstationsRepository = new InMemoryWorkstationsRepository(departmentsRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new AddUserToWorkstationUseCase(usersRepository, workstationsRepository)
  })

  it('should be able to add user to workstation', async () => {
    const userName = faker.person.firstName()

    const user = makeUser({ name: userName })
    usersRepository.items.push(user)

    const workstation = makeWorkstation()
    workstationsRepository.items.push(workstation)

    const result = await sut.execute({
      userId: user.id.toString(),
      workstationId: workstation.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.user).toEqual(
        expect.objectContaining({
          id: user.id,
          name: userName,
          workstationId: workstation.id,
        }),
      )
    }
  })
})
