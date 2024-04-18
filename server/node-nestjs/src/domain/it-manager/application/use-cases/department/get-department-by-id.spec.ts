import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { GetDepartmentByIdUseCase } from './get-department-by-id'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: GetDepartmentByIdUseCase

describe('Get department by id', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new GetDepartmentByIdUseCase(departmentsRepository)
  })

  it('should be able to get department by id', async () => {
    const newDepartment = makeDepartment()
    departmentsRepository.items.push(newDepartment)

    const result = await sut.execute({
      departmentId: newDepartment.id.toString(),
    })

    expect(result.hasSucceeded()).toBe(true)

    if (result.hasSucceeded()) {
      expect(result.result.department).toEqual(
        expect.objectContaining({
          id: newDepartment.id,
          description: newDepartment.description,
        }),
      )
    }
  })

  it('should not be able to get department with wrong id', async () => {
    const result = await sut.execute({
      departmentId: 'non-existent-id',
    })

    expect(result.hasFailed()).toBe(true)

    if (result.hasFailed()) {
      expect(result.reason).toEqual(
        expect.objectContaining({
          name: 'ResourceNotFound',
        }),
      )
    }
  })
})
