import { Injectable } from '@nestjs/common'

import { UsersRepository } from '@/domain/it-manager/application/repositories/users-repository'
import { User } from '@/domain/it-manager/enterprise/entities/user'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return users.map(PrismaUserMapper.toDomain)
  }

  async findManyByDepartment(departmentId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        departmentId,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return users.map(PrismaUserMapper.toDomain)
  }

  async findManyByWorkstation(workstationId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        workstationId,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return users.map(PrismaUserMapper.toDomain)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user)

    await this.prisma.user.create({
      data,
    })
  }

  async save(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user)

    await this.prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(user: User): Promise<void> {
    const data = PrismaUserMapper.toPersistence(user)

    await this.prisma.user.delete({
      where: {
        id: data.id,
      },
    })
  }
}
