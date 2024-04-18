import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { EditUserUseCase } from '@/domain/it-manager/application/use-cases/user/edit-user'

@Injectable()
export class EditUserUseCaseAdapter extends EditUserUseCase {
  constructor(usersRepository: UsersRepository, departmentsRepository: DepartmentsRepository) {
    super(usersRepository, departmentsRepository)
  }
}
