import { Module } from '@nestjs/common'

import { ComputersRepository } from '@/domain/it-manager/application/repositories/computers-repository'
import { ContractsRepository } from '@/domain/it-manager/application/repositories/contracts-repository'
import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { DevicesRepository } from '@/domain/it-manager/application/repositories/devices-repository'
import { LicensesRepository } from '@/domain/it-manager/application/repositories/licenses-repository'
import { MobileDevicesRepository } from '@/domain/it-manager/application/repositories/mobile-devices-repository'
import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
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
    {
      provide: ComputersRepository,
      useClass: PrismaComputersRepository,
    },
    {
      provide: ContractsRepository,
      useClass: PrismaContractsRepository,
    },
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
    {
      provide: DevicesRepository,
      useClass: PrismaDevicesRepository,
    },
    {
      provide: LicensesRepository,
      useClass: PrismaLicensesRepository,
    },
    {
      provide: MobileDevicesRepository,
      useClass: PrismaMobileDevicesRepository,
    },
    {
      provide: PrintersRepository,
      useClass: PrismaPrintersRepository,
    },
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
    ComputersRepository,
    ContractsRepository,
    DepartmentsRepository,
    DevicesRepository,
    LicensesRepository,
    MobileDevicesRepository,
    PrintersRepository,
    UserLicensesRepository,
    UsersRepository,
    PrismaWorkstationsRepository,
  ],
})
export class DatabaseModule {}
