import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { Slug } from '../../../enterprise/entities/value-objects/slug'
import { CreateDepartmentUseCase } from './create-department'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateDepartmentUseCase

describe('Create department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    sut = new CreateDepartmentUseCase(departmentsRepository)
  })

  it('should be able to create department', async () => {
    const result = await sut.execute({
      description: 'Department 01',
      email: 'department@example.com',
    })

    expect(result.hasSucceeded()).toBe(true)

    if (result.hasSucceeded()) {
      expect(result.result.department).toEqual(
        expect.objectContaining({
          description: 'Department 01',
          email: 'department@example.com',
          slug: Slug.createFromText('Department 01'),
          createdAt: expect.any(Date),
        }),
      )
    }
  })
})
