import { makeDepartment } from 'test/factories/make-department'
import { makeUser } from 'test/factories/make-user'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { EditUserUseCase } from './edit-user'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: EditUserUseCase

describe('Edit user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new EditUserUseCase(usersRepository, departmentsRepository)
  })

  it('should be able to edit user', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const newUser = makeUser({})
    usersRepository.items.push(newUser)

    const result = await sut.execute({
      userId: newUser.id.toString(),
      departmentId: department.id.toString(),
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      phone: '(11) 94561-6549',
      badge: '123456',
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(usersRepository.items[0]).toEqual(
        expect.objectContaining({
          ...result.result.user,
        }),
      )
    }
  })

  it('should not be able to edit user with wrong department id', async () => {
    const result = await sut.execute({
      userId: 'non-existent-user',
      departmentId: 'non-existent-department',
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      phone: '(11) 94561-6549',
      badge: '123456',
    })

    expect(result.hasFailed()).toBeTruthy()
  })

  it('should not be able to edit department with wrong user id', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const result = await sut.execute({
      userId: 'non-existent-user',
      departmentId: department.id.toString(),
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      phone: '(11) 94561-6549',
      badge: '123456',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
