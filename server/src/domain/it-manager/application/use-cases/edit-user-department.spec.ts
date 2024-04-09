import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { EditUserDepartmentUseCase } from './edit-user-department'
import { makeUser } from 'test/factories/make-user'
import { makeDepartment } from 'test/factories/make-department'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: EditUserDepartmentUseCase

describe('Edit user department', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new EditUserDepartmentUseCase(usersRepository, departmentsRepository)
  })

  it('should be able to edit user department', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const newUser = makeUser({
      departmentId: new UniqueEntityID('department-id'),
    })

    usersRepository.items.push(newUser)

    const { user } = await sut.execute({
      userId: newUser.id.toString(),
      departmentId: department.id.toString(),
    })

    expect(user.departmentId).toEqual(department.id)
    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        ...user,
      }),
    )
  })

  it('should not be able to edit user department with wrong department id', async () => {
    await expect(
      sut.execute({
        userId: 'non-existent-user',
        departmentId: 'non-existent-department',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to edit user department with wrong user id', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    await expect(
      sut.execute({
        userId: 'non-existent-user',
        departmentId: department.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
