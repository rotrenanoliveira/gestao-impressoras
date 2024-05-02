import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { makeWorkstation } from 'test/factories/make-workstation'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { DeleteWorkstationUseCase } from './delete-workstation'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let workstationsRepository: InMemoryWorkstationsRepository
let sut: DeleteWorkstationUseCase

describe('Delete workstation', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    workstationsRepository = new InMemoryWorkstationsRepository(departmentsRepository)
    sut = new DeleteWorkstationUseCase(workstationsRepository)
  })

  it('should be able to delete workstation', async () => {
    const workstation = makeWorkstation()
    workstationsRepository.items.push(workstation)

    const result = await sut.execute({
      workstationId: workstation.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(workstationsRepository.items).toHaveLength(0)
    }

    expect(workstationsRepository.items).toHaveLength(0)
  })
})
