import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Computer, ComputerProps } from '@/domain/it-manager/enterprise/entities/computer'
import { PrismaComputerMapper } from '@/infra/database/prisma/mappers/prisma-computer-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeComputer(override: Partial<ComputerProps> = {}, id?: UniqueEntityID) {
  const device = {
    contractId: new UniqueEntityID(),
    serialNumber: faker.number.int().toString(),
    model: faker.commerce.productName(),
    invoice: faker.number.int().toString(),
    assetTag: faker.number.int().toString(),
    purchaseDate: faker.date.recent(),
    warrantyEndDate: faker.date.future(),
  }

  const computer = Computer.create(
    {
      hostname: faker.internet.domainName(),
      ipAddress: faker.internet.ip(),
      description: faker.commerce.productDescription(),
      operatingSystem: 'Windows XP',
      type: 'DESKTOP',
      ...device,
      ...override,
    },
    id,
  )

  return computer
}

@Injectable()
export class ComputerFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaComputer(data: Partial<ComputerProps> = {}) {
    const computer = makeComputer(data)

    await this.prisma.computer.create({
      data: PrismaComputerMapper.toPersistence(computer),
    })

    return computer
  }
}
