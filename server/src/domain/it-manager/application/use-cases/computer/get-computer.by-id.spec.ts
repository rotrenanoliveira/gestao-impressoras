import { InMemoryComputersRepository } from 'test/repositories/in-memory-computers-repository'
import { GetComputerByIdUseCase } from './get-computer-by-id'
import { makeComputer } from 'test/factories/make-computer'

let computersRepository: InMemoryComputersRepository
let sut: GetComputerByIdUseCase

describe('Get computer by id', () => {
  beforeEach(() => {
    computersRepository = new InMemoryComputersRepository()
    sut = new GetComputerByIdUseCase(computersRepository)
  })

  it('should be able to get computer by id', async () => {
    const computer = makeComputer()
    computersRepository.items.push(computer)

    const result = await sut.execute({
      computerId: computer.id.toString(),
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.computer).toEqual(
        expect.objectContaining({
          id: computer.id,
        }),
      )
    }
  })

  it('should not be able to get computer with wrong id', async () => {
    const result = await sut.execute({
      computerId: 'non-existent-id',
    })

    expect(result.hasSucceeded()).toBeFalsy()
  })
})
