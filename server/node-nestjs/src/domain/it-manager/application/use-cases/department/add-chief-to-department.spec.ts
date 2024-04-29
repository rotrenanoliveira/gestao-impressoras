import { makeDepartment } from '@test/factories/make-department'
import { makeUser } from '@test/factories/make-user'
import { InMemoryDepartmentsRepository } from '@test/repositories/in-memory-departments-repository'
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'

import { AddChiefToDepartmentUseCase } from './add-chief-to-department'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: AddChiefToDepartmentUseCase

describe('Add chief to department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new AddChiefToDepartmentUseCase(departmentsRepository, usersRepository)
  })

  it('should be able to add chief to department', async () => {
    const department = makeDepartment({
      description: 'Product Design',
    })
    departmentsRepository.items.push(department)

    const chief = makeUser({
      name: 'John Doe',
      email: 'joedoe@example.com',
      departmentId: department.id,
    })
    usersRepository.items.push(chief)

    const result = await sut.execute({
      departmentId: department.id.toString(),
      chiefId: chief.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      const departmentOnRepository = departmentsRepository.items.find((d) => d.id === department.id)
      expect(departmentOnRepository?.chiefId).toEqual(chief.id)

      const { chiefId } = result.result.department
      expect(chiefId).toEqual(chief.id)
    }
  })
})
