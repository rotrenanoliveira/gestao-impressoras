import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { InactiveUserUseCase } from '@/domain/it-manager/application/use-cases/user/inactive-user'

@Injectable()
export class InactiveUserUseCaseAdapter extends InactiveUserUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
