import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipes'

const createDepartmentBodySchema = z.object({
  description: z.string(),
  email: z.string().email().nullable(),
  chiefId: z.string().uuid().nullable(),
})

type CreateDepartmentBodySchema = z.infer<typeof createDepartmentBodySchema>

@Controller('/departments')
export class CreatedDepartmentController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createDepartmentBodySchema))
  async handle(@Body() body: CreateDepartmentBodySchema) {
    const { description, email, chiefId } = body

    await this.prisma.department.create({
      data: {
        description,
        chiefId,
        email,
        slug: description.trim(),
      },
    })
  }
}
