import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { GetDepartmentByIdUseCase } from './get-department-by-id'
import { makeDepartment } from 'test/factories/make-department'

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

    const { department } = await sut.execute({
      departmentId: newDepartment.id.toString(),
    })

    expect(department).toEqual(
      expect.objectContaining({
        id: department.id,
        description: department.description,
      }),
    )
  })

  it('should not be able to get department with wrong id', async () => {
    await expect(
      sut.execute({
        departmentId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
