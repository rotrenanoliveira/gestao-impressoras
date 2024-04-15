import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'
import { WorkstationsRepository } from '../../repositories/workstations-repository'

interface FetchWorkstationsByDepartmentUseCaseProps {
  departmentId: string
}

type FetchWorkstationsByDepartmentUseCaseResponse = Either<void, { workstations: Workstation[] }>

export class FetchWorkstationsByDepartmentUseCase implements UseCase {
  constructor(private workstationsRepository: WorkstationsRepository) {}

  async execute({
    departmentId,
  }: FetchWorkstationsByDepartmentUseCaseProps): Promise<FetchWorkstationsByDepartmentUseCaseResponse> {
    const workstations = await this.workstationsRepository.findManyByDepartmentId(departmentId)

    return success({
      workstations,
    })
  }
}
