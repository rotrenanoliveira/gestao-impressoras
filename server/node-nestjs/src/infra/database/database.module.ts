import { Module } from '@nestjs/common'

import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { UserLicensesRepository } from '@/domain/it-manager/application/repositories/user-licenses-repository'
import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaComputersRepository } from './prisma/repositories/prisma-computer-repository'
import { PrismaContractsRepository } from './prisma/repositories/prisma-contracts-repository'
import { PrismaDepartmentsRepository } from './prisma/repositories/prisma-departments-repository'
import { PrismaDevicesRepository } from './prisma/repositories/prisma-devices-repository'
import { PrismaLicensesRepository } from './prisma/repositories/prisma-licenses-repository'
import { PrismaMobileDevicesRepository } from './prisma/repositories/prisma-mobile-devices-repository'
import { PrismaPrintersRepository } from './prisma/repositories/prisma-printers-repository'
import { PrismaUserLicensesRepository } from './prisma/repositories/prisma-user-licenses-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'
import { PrismaWorkstationsRepository } from './prisma/repositories/prisma-workstations-repository'

@Module({
  providers: [
    PrismaService,
    PrismaComputersRepository,
    {
      provide: ContractsRepository,
      useClass: PrismaContractsRepository,
    },
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
    PrismaDevicesRepository,
    {
      provide: LicensesRepository,
      useClass: PrismaLicensesRepository,
    },
    PrismaMobileDevicesRepository,
    PrismaPrintersRepository,
    {
      provide: UserLicensesRepository,
      useClass: PrismaUserLicensesRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    PrismaWorkstationsRepository,
  ],
  exports: [
    PrismaService,
    PrismaComputersRepository,
    ContractsRepository,
    DepartmentsRepository,
    PrismaDevicesRepository,
    LicensesRepository,
    PrismaMobileDevicesRepository,
    PrismaPrintersRepository,
    UserLicensesRepository,
    UsersRepository,
    PrismaWorkstationsRepository,
  ],
})
export class DatabaseModule {}
