import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { DeleteDepartmentUseCase } from './delete.department'
import { makeDepartment } from 'test/factories/make-department'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: DeleteDepartmentUseCase

describe('Delete department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new DeleteDepartmentUseCase(departmentsRepository)
  })

  it('should be able to delete department', async () => {
    const newDepartment = makeDepartment()
    departmentsRepository.items.push(newDepartment)

    const result = await sut.execute({
      departmentId: newDepartment.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
    expect(departmentsRepository.items.length).toBe(0)
  })

  it('should not be able to delete department with wrong id', async () => {
    const result = await sut.execute({
      departmentId: 'non-existent-id',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
