import { User } from '../../enterprise/entities/user'

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findMany(): Promise<User[]>
  abstract findManyByDepartment(departmentId: string): Promise<User[]>
  abstract findManyByWorkstation(workstationId: string): Promise<User[]>

  abstract create(user: User): Promise<void>
  abstract save(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
}
