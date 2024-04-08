import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { makeDepartment } from 'test/factories/make-department'
import { GetDepartmentBySlugUseCase } from './get-department-by-slug'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: GetDepartmentBySlugUseCase

describe('Get department by slug', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new GetDepartmentBySlugUseCase(departmentsRepository)
  })

  it('should be able to get department by slug', async () => {
    const newDepartment = makeDepartment()
    departmentsRepository.items.push(newDepartment)

    const { department } = await sut.execute({
      slug: newDepartment.slug.value,
    })

    expect(department).toEqual(
      expect.objectContaining({
        id: department.id,
        description: department.description,
      }),
    )
  })

  it('should not be able to get department with wrong slug', async () => {
    await expect(
      sut.execute({
        slug: 'non-existent-slug',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
