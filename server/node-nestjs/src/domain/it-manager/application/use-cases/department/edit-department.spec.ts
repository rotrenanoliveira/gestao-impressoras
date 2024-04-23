import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { EditDepartmentUseCase } from './edit-department'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: EditDepartmentUseCase

describe('Edit department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new EditDepartmentUseCase(departmentsRepository)
  })

  it('should be able to edit department', async () => {
    // Register department on repository
    const newDepartment = makeDepartment()
    departmentsRepository.items.push(newDepartment)
    // execute test
    const result = await sut.execute({
      departmentId: newDepartment.id.toString(),
      description: 'Department 02',
      email: 'department-02@example.com',
      chiefId: 'chief-02',
    })
    // validate return
    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.department).toEqual(
        expect.objectContaining({
          description: 'Department 02',
          email: 'department-02@example.com',
          chiefId: new UniqueEntityID('chief-02'),
        }),
      )
    }
  })

  it('should not be able to edit department with wrong ID', async () => {
    const result = await sut.execute({
      departmentId: 'non-existent-id',
      description: '',
      chiefId: '',
      email: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
