import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'

import { EditDepartmentUseCase } from './edit-department'

let departmentsRepository: InMemoryDepartmentsRepository

let sut: EditDepartmentUseCase

describe('Edit department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new EditDepartmentUseCase(departmentsRepository)
  })

  it('should be able to edit department', async () => {
    const newDepartment = makeDepartment()
    departmentsRepository.items.push(newDepartment)

    const result = await sut.execute({
      departmentId: newDepartment.id.toString(),
      description: 'Department 02',
      email: 'department-02@example.com',
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.department).toEqual(
        expect.objectContaining({
          description: 'Department 02',
          email: 'department-02@example.com',
          slug: Slug.createFromText('Department 02'),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      )
    }
  })

  it('should not be able to edit department with wrong ID', async () => {
    const result = await sut.execute({
      departmentId: 'non-existent-id',
      description: 'department 01',
      email: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
