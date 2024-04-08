import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { RegisterDepartmentUseCase } from './register-department'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: RegisterDepartmentUseCase

describe('Register department', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new RegisterDepartmentUseCase(departmentsRepository)
  })

  it('should be able to register department', async () => {
    const { department } = await sut.execute({
      description: 'Department 01',
      email: 'department@example.com',
      chiefId: 'department-01',
    })

    expect(department).toEqual(
      expect.objectContaining({
        description: 'Department 01',
        email: 'department@example.com',
        chiefId: new UniqueEntityID('department-01'),
        slug: Slug.createFromText('Department 01'),
      }),
    )
  })
})
