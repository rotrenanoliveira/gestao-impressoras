import { Module } from '@nestjs/common'
import { CreatedDepartmentController } from './controllers/departments/create-departments.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [CreatedDepartmentController],
  providers: [PrismaService],
})
export class HttpModule {}
