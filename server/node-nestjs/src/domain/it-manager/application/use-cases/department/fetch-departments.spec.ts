import { makeDepartment } from 'test/factories/make-department'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'

import { FetchDepartmentsUseCase } from './fetch-departments'

let departmentsRepository: InMemoryDepartmentsRepository
let sut: FetchDepartmentsUseCase

describe('Fetch departments', () => {
  beforeEach(() => {
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new FetchDepartmentsUseCase(departmentsRepository)
  })

  it('should be able to fetch many departments', async () => {
    for (let i = 0; i < 5; i++) {
      departmentsRepository.items.push(makeDepartment())
    }

    const result = await sut.execute()

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.departments).toHaveLength(5)
    }
  })
})
