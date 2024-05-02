import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { makeComputer } from 'test/factories/make-computer'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryComputersRepository } from 'test/repositories/in-memory-computers-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryWorkstationsRepository } from 'test/repositories/in-memory-workstations-repository'

import { CreateWorkstationUseCase } from './create-workstation'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let computersRepository: InMemoryComputersRepository
let workstationsRepository: InMemoryWorkstationsRepository
let sut: CreateWorkstationUseCase

describe('Register workstation', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    computersRepository = new InMemoryComputersRepository()
    workstationsRepository = new InMemoryWorkstationsRepository(departmentsRepository)
    sut = new CreateWorkstationUseCase(workstationsRepository, departmentsRepository, computersRepository)
  })

  it('should be able to register workstation', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const computer = makeComputer()
    computersRepository.items.push(computer)

    const result = await sut.execute({
      departmentId: department.id.toString(),
      computerId: computer.id.toString(),
      tag: 'tag-01',
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.workstation).toEqual(
        expect.objectContaining({
          departmentId: department.id,
          computerId: computer.id,
          tag: 'tag-01',
        }),
      )
    }
  })

  it('should not be able to register workstation with invalid department id', async () => {
    const result = await sut.execute({
      departmentId: 'invalid-id',
      computerId: 'computer-id',
      tag: 'tag-01',
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should not be able to register workstation with invalid computer id', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const result = await sut.execute({
      computerId: 'computer-id',
      departmentId: department.id.toString(),
      tag: 'tag-01',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
