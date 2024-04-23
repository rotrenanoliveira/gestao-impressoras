import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { FetchUsersUseCase } from '@/domain/it-manager/application/use-cases/user/fetch-users'

@Injectable()
export class FetchUsersUseCaseAdapter extends FetchUsersUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
