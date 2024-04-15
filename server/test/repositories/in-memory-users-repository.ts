import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { User } from '@/domain/it-manager/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

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

  async findMany(): Promise<User[]> {
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
    const userIndex = this.items.findIndex((_user) => _user.id === user.id)

    this.items[userIndex] = user
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.items.findIndex((user) => user.id.toString() === id)

    this.items.splice(userIndex, 1)
  }
}
