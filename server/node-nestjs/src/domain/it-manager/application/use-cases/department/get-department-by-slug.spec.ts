import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository'
import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

import { GetDepartmentBySlugUseCase } from './get-department-by-slug'

let departmentsRepository: InMemoryDepartmentsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetDepartmentBySlugUseCase

describe('Get department by slug', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository(departmentsRepository)
    departmentsRepository = new InMemoryDepartmentsRepository(usersRepository)
    sut = new GetDepartmentBySlugUseCase(departmentsRepository)
  })

  it.only('should be able to get department by slug', async () => {
    const newDepartment = makeDepartment()
    departmentsRepository.items.push(newDepartment)

    const result = await sut.execute({
      slug: newDepartment.slug.value,
    })

    expect(result.hasSucceeded()).toBe(true)

    if (result.hasSucceeded()) {
      expect(result.result.department).toEqual(
        expect.objectContaining({
          departmentId: newDepartment.id,
          description: newDepartment.description,
          email: newDepartment.email,
          slug: newDepartment.slug,
          updatedAt: newDepartment.updatedAt,
        }),
      )
    }
  })

  it('should not be able to get department with wrong slug', async () => {
    const result = await sut.execute({
      slug: 'non-existent-slug',
    })

    expect(result.hasFailed()).toBe(true)

    if (result.hasFailed()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError)
    }
  })
})
