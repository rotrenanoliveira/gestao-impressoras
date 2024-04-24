import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { GetUserByEmailUseCase } from '@/domain/it-manager/application/use-cases/user/get-user-by-email'

@Injectable()
export class GetUserByEmailUseCaseAdapter extends GetUserByEmailUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
