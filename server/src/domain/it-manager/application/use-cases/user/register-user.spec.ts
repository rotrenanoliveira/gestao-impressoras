import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { makeDepartment } from 'test/factories/make-department'
import { Phone } from '../../../enterprise/entities/value-objects/phone'
import { RegisterUserUseCase } from './register-user'

let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: RegisterUserUseCase

describe('Register user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new RegisterUserUseCase(usersRepository, departmentsRepository)
  })

  it('should be able to register user', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const result = await sut.execute({
      departmentId: department.id.toString(),
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      phone: '(11) 95613-6512',
      badge: '311311',
      workstationId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.user).toEqual(
        expect.objectContaining({
          departmentId: department.id,
          name: 'Joe Doe',
          email: 'joedoe@example.com',
          phone: Phone.format('(11) 95613-6512'),
          badge: '311311',
        }),
      )
    }
  })

  it('should not be able to register a user if wrong department id', async () => {
    const result = await sut.execute({
      departmentId: 'non-existent-department',
      name: 'Joe Doe',
      email: 'joedoe@example.com',
      phone: '(11) 95613-6512',
      badge: '311311',
      workstationId: null,
    })

    expect(result.hasFailed()).toBeTruthy()
  })
})
