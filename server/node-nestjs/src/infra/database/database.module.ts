import { Module } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'

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
    PrismaContractsRepository,
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentsRepository,
    },
    PrismaDevicesRepository,
    PrismaLicensesRepository,
    PrismaMobileDevicesRepository,
    PrismaPrintersRepository,
    PrismaUserLicensesRepository,
    PrismaUsersRepository,
    PrismaWorkstationsRepository,
  ],
  exports: [
    PrismaService,
    PrismaComputersRepository,
    PrismaContractsRepository,
    DepartmentsRepository,
    PrismaDevicesRepository,
    PrismaLicensesRepository,
    PrismaMobileDevicesRepository,
    PrismaPrintersRepository,
    PrismaUserLicensesRepository,
    PrismaUsersRepository,
    PrismaWorkstationsRepository,
  ],
})
export class DatabaseModule {}
