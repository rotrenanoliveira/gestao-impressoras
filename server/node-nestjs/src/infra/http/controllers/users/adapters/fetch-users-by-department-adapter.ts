import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { FetchUsersByDepartmentUseCase } from '@/domain/it-manager/application/use-cases/user/fetch-users-by-department'

@Injectable()
export class FetchUsersByDepartmentUseCaseAdapter extends FetchUsersByDepartmentUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
