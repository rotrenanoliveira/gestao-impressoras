import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { envSchema } from './infra/env/env'
import { PrismaService } from './prisma/prisma.service'
import { CreatedDepartmentController } from './infra/http/controllers/departments/create-departments.controller'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (obj) => envSchema.parse(obj),
      isGlobal: true,
    }),
  ],
  controllers: [CreatedDepartmentController],
  providers: [PrismaService],
})
export class AppModule {}
