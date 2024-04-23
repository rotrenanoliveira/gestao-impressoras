import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { ActiveUserUseCase } from '@/domain/it-manager/application/use-cases/user/active-user'

@Injectable()
export class ActiveUserUseCaseAdapter extends ActiveUserUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
