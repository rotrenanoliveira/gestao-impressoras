import { InMemoryLicensesRepository } from 'test/repositories/in-memory-licenses-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { RegisterUserLicenseUseCase } from './register-user-license'
import { InMemoryUserLicensesRepository } from 'test/repositories/in-memory-user-licenses-repository'
import { InMemoryDepartmentsRepository } from 'test/repositories/in-memory-departments-repository'
import { makeUser } from 'test/factories/make-user'
import { makeLicense } from 'test/factories/make-license'
import { makeDepartment } from 'test/factories/make-department'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

let usersLicensesRepository: InMemoryUserLicensesRepository
let licensesRepository: InMemoryLicensesRepository
let usersRepository: InMemoryUsersRepository
let departmentsRepository: InMemoryDepartmentsRepository
let sut: RegisterUserLicenseUseCase

describe('Register User License', () => {
  beforeEach(() => {
    usersLicensesRepository = new InMemoryUserLicensesRepository()
    licensesRepository = new InMemoryLicensesRepository()
    usersRepository = new InMemoryUsersRepository()
    departmentsRepository = new InMemoryDepartmentsRepository()
    sut = new RegisterUserLicenseUseCase(
      usersLicensesRepository,
      licensesRepository,
      usersRepository,
      departmentsRepository,
    )
  })

  it('should be able to register user license for user', async () => {
    const user = makeUser()
    usersRepository.items.push(user)

    const license = makeLicense()
    licensesRepository.items.push(license)

    const result = await sut.execute({
      licenseId: license.id.toString(),
      userId: user.id.toString(),
      departmentId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.userLicense).toEqual(
        expect.objectContaining({
          licenseId: license.id,
          userId: user.id,
          departmentId: null,
          type: 'user',
          status: 'active',
        }),
      )
    }
  })

  it('should be able to register user license for department', async () => {
    const department = makeDepartment()
    departmentsRepository.items.push(department)

    const license = makeLicense()
    licensesRepository.items.push(license)

    const result = await sut.execute({
      licenseId: license.id.toString(),
      departmentId: department.id.toString(),
      userId: null,
    })

    expect(result.hasSucceeded()).toBeTruthy()

    if (result.hasSucceeded()) {
      expect(result.result.userLicense).toEqual(
        expect.objectContaining({
          licenseId: license.id,
          departmentId: department.id,
          userId: null,
          type: 'department',
          status: 'active',
        }),
      )
    }
  })

  it('should not be able to register license with invalid license id', async () => {
    const result = await sut.execute({
      licenseId: 'non-existent-license',
      userId: null,
      departmentId: null,
    })

    expect(result.hasFailed()).toBeTruthy()

    if (result.hasFailed()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError)
    }
  })
})
