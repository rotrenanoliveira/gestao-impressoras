import { makeDepartment } from 'test/factories/make-department'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { EditUserDepartmentUseCase } from './edit-user-department'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: EditUserDepartmentUseCase

describe('Edit user department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new EditUserDepartmentUseCase(usersRepository, departmentsRepository)
  })

  it('should be able to edit user department', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const newUser = makeUser({
      departmentId: new UniqueEntityID('department-id'),
    })

    usersRepository.items.push(newUser)

    const result = await sut.execute({
      userId: newUser.id.toString(),
      departmentId: department.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.user.departmentId).toEqual(department.id)
      expect(usersRepository.items[0]).toEqual(
        expect.objectContaining({
          ...result.result.user,
        }),
      )
    }
  })

  it('should not be able to edit user department with wrong department id', async () => {
    const result = await sut.execute({
      userId: 'non-existent-user',
      departmentId: 'non-existent-department',
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should not be able to edit user department with wrong user id', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const result = await sut.execute({
      userId: 'non-existent-user',
      departmentId: department.id.toString(),
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
