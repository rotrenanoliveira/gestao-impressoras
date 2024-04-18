import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { GetUserByIdUseCase } from '@/domain/it-manager/application/use-cases/user/get-user-by-id'

@Injectable()
export class GetUserByIdUseCaseAdapter extends GetUserByIdUseCase {
  constructor(usersRepository: UsersRepository) {
    super(usersRepository)
  }
}
