import { Injectable } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/it-manager/application/repositories/departments-repository'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentWithChiefDetails } from '@/domain/it-manager/enterprise/entities/value-objects/department-with-chief-details'

import { PrismaDepartmentWithChiefMapper } from '../mappers/prisma-department-with-chief-mapper'
import { PrismaDepartmentsMapper } from '../mappers/prisma-departments-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaDepartmentsRepository implements DepartmentsRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Department[]> {
    const departments = await this.prisma.department.findMany({
      include: {
        chief: true,
      },
    })

    return departments.map(PrismaDepartmentsMapper.toDomain)
  }

  async findManyWithChiefs(): Promise<DepartmentWithChiefDetails[]> {
    const departments = await this.prisma.department.findMany({
      include: {
        chief: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return departments.map(PrismaDepartmentWithChiefMapper.toDomain)
  }

  async findById(id: string): Promise<Department | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        id,
      },
      include: {
        chief: true,
      },
    })

    if (!department) {
      return null
    }

    return PrismaDepartmentsMapper.toDomain(department)
  }

  async findBySlug(slug: string): Promise<DepartmentWithChiefDetails | null> {
    const department = await this.prisma.department.findUnique({
      where: {
        slug,
      },
      include: {
        chief: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!department) {
      return null
    }

    return PrismaDepartmentWithChiefMapper.toDomain(department)
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
