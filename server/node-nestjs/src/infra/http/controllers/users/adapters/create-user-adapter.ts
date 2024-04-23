import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { CreateUserUseCase } from '@/domain/it-manager/application/use-cases/user/create-user'

@Injectable()
export class CreateUserUseCaseAdapter extends CreateUserUseCase {
  constructor(usersRepository: UsersRepository, departmentsRepository: DepartmentsRepository) {
    super(usersRepository, departmentsRepository)
  }
}
