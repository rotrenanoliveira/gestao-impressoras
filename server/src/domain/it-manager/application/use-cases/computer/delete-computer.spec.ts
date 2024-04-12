import { InMemoryComputersRepository } from 'test/repositories/in-memory-computers-repository'
import { DeleteComputerUseCase } from './delete-computer'
import { makeComputer } from 'test/factories/make-computer'

let computersRepository: InMemoryComputersRepository
let sut: DeleteComputerUseCase

describe('Delete computer', () => {
  beforeEach(() => {
    computersRepository = new InMemoryComputersRepository()
    sut = new DeleteComputerUseCase(computersRepository)
  })

  it('should be able to delete computer', async () => {
    const computer = makeComputer()
    computersRepository.items.push(computer)

    const result = await sut.execute({
      computerId: computer.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()
    expect(computersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete computer with invalid computer id', async () => {
    const result = await sut.execute({
      computerId: 'non-existing-computer',
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
