import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/it-manager/enterprise/entities/user'
import { Phone } from '@/domain/it-manager/enterprise/entities/value-objects/phone'
import { PrismaUserMapper } from '@/infra/database/prisma/mappers/prisma-user-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeUser(override: Partial<UserProps> = {}, id?: UniqueEntityID) {
  const phoneNumber = String('(11)')
    .concat(' ', faker.number.int().toString().substring(0, 5))
    .concat('-', faker.number.int().toString().substring(0, 4))

  const user = User.create(
    {
      departmentId: new UniqueEntityID(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: Phone.format(phoneNumber),
      badge: faker.number.int().toString().substring(0, 6),
      status: 'ACTIVE',
      workstationId: null,
      ...override,
    },
    id,
  )

  return user
}

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data)

    await this.prisma.user.create({
      data: PrismaUserMapper.toPersistence(user),
    })

    return user
  }
}
