import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { FetchDepartmentsUseCase } from './fetch-departments'
import { makeDepartment } from 'test/factories/make-department'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: FetchDepartmentsUseCase

describe('Fetch departments', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new FetchDepartmentsUseCase(departmentsRepository)
  })

  it('should be able to fetch many departments', async () => {
    for (let i = 0; i < 3; i++) {
      departmentsRepository.items.push(makeDepartment())
    }

    const { departments } = await sut.execute()

    expect(departments).toHaveLength(3)
  })
})
