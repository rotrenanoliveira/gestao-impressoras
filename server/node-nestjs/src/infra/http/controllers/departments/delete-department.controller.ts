import { BadRequestException, Controller, Delete, HttpCode, Param } from '@nestjs/common'

import { DeleteDepartmentUseCaseAdapter } from './adapters/delete-department-adapter'

@Controller('/departments/:id')
export class DeleteDepartmentController {
  constructor(private deleteDepartment: DeleteDepartmentUseCaseAdapter) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') departmentId: string) {
    const result = await this.deleteDepartment.execute({
      departmentId,
    })

    if (result.hasFailed()) {
      throw new BadRequestException(result.reason)
    }
  }
}
