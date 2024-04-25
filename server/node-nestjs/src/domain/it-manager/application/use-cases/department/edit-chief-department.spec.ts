import { makeDepartment } from '@test/factories/make-department'
import { makeUser } from '@test/factories/make-user'
import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { EditChiefDepartmentUseCase } from './edit-chief-department'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: EditChiefDepartmentUseCase

describe('Edit chief department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new EditChiefDepartmentUseCase(departmentsRepository, usersRepository)
  })

  it('should be able to edit chief department with a new chief', async () => {
    const pastChief = makeUser({
      name: 'John Doe',
      email: 'joedoe@example.com',
    })

    const newChief = makeUser({
      name: 'Jane Doe',
      email: 'janeDoe@example.com',
    })

    const department = makeDepartment({
      description: 'Product Design',
      chiefId: pastChief.id,
      chief: pastChief,
    })

    departmentsRepository.items.push(department)
    usersRepository.items.push(pastChief, newChief)

    const result = await sut.execute({
      departmentId: department.id.toString(),
      chiefId: newChief.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { chief: chiefOnDepartment, chiefId } = result.result.department

      expect(chiefOnDepartment).toEqual(newChief)
      expect(chiefId).toEqual(newChief.id)
    }
  })

  it('should be able to remove chief department', async () => {
    const chief = makeUser({
      name: 'John Doe',
      email: 'joedoe@example.com',
    })

    const department = makeDepartment({
      description: 'Product Design',
      chiefId: chief.id,
      chief,
    })

    departmentsRepository.items.push(department)
    usersRepository.items.push(chief)

    const result = await sut.execute({
      departmentId: department.id.toString(),
      chiefId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const { chief: chiefOnDepartment, chiefId } = result.result.department

      expect(chiefOnDepartment).toBeNull()
      expect(chiefId).toBeNull()
    }
  })
})
