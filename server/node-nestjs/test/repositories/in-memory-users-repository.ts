import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { UsersFilterParams, UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { User } from '@/domain/it-manager/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  constructor(private departmentsRepository: DepartmentsRepository) {}

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findMany({ email, department }: UsersFilterParams = {}): Promise<User[]> {
    if (email && !department) {
      const users = this.items.filter((user) => user.email === email)

      return users
    }

    if (department && !email) {
      const departmentOnRepository = await this.departmentsRepository.findBySlug(department)

      const users = departmentOnRepository
        ? this.items.filter((user) => user.departmentId === departmentOnRepository.departmentId)
        : []

      return users
    }

    if (department && email) {
      const departmentOnRepository = await this.departmentsRepository.findBySlug(department)

      const users = departmentOnRepository
        ? this.items
            .filter((user) => user.departmentId === departmentOnRepository.departmentId)
            .filter((user) => user.email === email)
        : []

      return users
    }

    const users = this.items

    return users
  }

  async findManyByDepartment(departmentId: string): Promise<User[]> {
    const users = this.items.filter((users) => users.departmentId.toString() === departmentId)

    return users
  }

  async findManyByWorkstation(workstationId: string): Promise<User[]> {
    const users = this.items.filter((users) => users.workstationId?.toString() === workstationId)

    return users
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async save(user: User): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.equals(user))

    this.items[userIndex] = user
  }

  async delete(user: User): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.equals(user))

    this.items.splice(userIndex, 1)
  }
}
