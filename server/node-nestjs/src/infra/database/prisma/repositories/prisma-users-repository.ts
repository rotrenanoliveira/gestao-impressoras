import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { User } from '@/domain/it-manager/enterprise/entities/user'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  findManyByDepartment(departmentId: string): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  findManyByWorkstation(workstationId: string): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  create(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(user: User): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
