import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { Department } from '@/domain/it-manager/enterprise/entities/department'

import { PrismaDepartmentsMapper } from '../mappers/prisma-departments-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDepartmentsRepository implements DepartmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
    })

    if (!department) {
      return null
    }

    return PrismaDepartmentsMapper.toDomain(department)
  }

  async findBySlug(slug: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        slug,
      },
    })

    if (!department) {
      return null
    }

    return PrismaDepartmentsMapper.toDomain(department)
  }

  async findMany(): Promise<Department[]> {
    const departments = await this.prisma.department.findMany()

    return departments.map(PrismaDepartmentsMapper.toDomain)
  }

  async create(department: Department): Promise<void> {
    const data = PrismaDepartmentsMapper.toPersistence(department)

    await this.prisma.department.create({
      data,
    })
  }

  async save(department: Department): Promise<void> {
    const data = PrismaDepartmentsMapper.toPersistence(department)

    await this.prisma.department.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(department: Department): Promise<void> {
    const data = PrismaDepartmentsMapper.toPersistence(department)

    await this.prisma.department.delete({
      where: {
        id: data.id,
      },
    })
  }
}
