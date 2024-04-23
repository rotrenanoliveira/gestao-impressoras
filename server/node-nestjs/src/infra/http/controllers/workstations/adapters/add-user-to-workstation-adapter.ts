import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { WorkstationsRepository } from '@/domain/it-manager/application/repositories/workstations-repository'
import { AddUserToWorkstationUseCase } from '@/domain/it-manager/application/use-cases/user/add-user-to-workstation'

@Injectable()
export class AddUserToWorkstationUseCaseAdapter extends AddUserToWorkstationUseCase {
  constructor(usersRepository: UsersRepository, workstationsRepository: WorkstationsRepository) {
    super(usersRepository, workstationsRepository)
  }
}
