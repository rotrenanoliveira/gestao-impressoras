import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Department } from '@/domain/it-manager/enterprise/entities/department'
import { DepartmentWithChiefDetails } from '@/domain/it-manager/enterprise/entities/value-objects/department-with-chief-details'

import { DepartmentsRepository } from '../../repositories/departments-repository'

type RetrievalParameter = 'departments' | 'departments-with-chief'

type DepartmentResponse<T extends RetrievalParameter> = T extends 'departments'
  ? Array<Department>
  : Array<DepartmentWithChiefDetails>

type FetchDepartmentsUseCaseResponse<T extends RetrievalParameter> = Either<
  unknown,
  {
    departments: DepartmentResponse<T>
  }
>

export class FetchDepartmentsUseCase implements UseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  /**
   * Retrieves all departments from the database.
   * @param retrieval Determines what kind of retrieval to perform.
   * Available values: 'departments' (default) or 'departments-with-chief'.
   * @returns An Either with a list of Department.
   */
  // execute(retrieval?: 'departments'): Promise<FetchDepartmentsUseCaseResponse<'departments'>>
  execute(retrieval?: 'departments'): Promise<
    Either<
      unknown,
      {
        departments: Array<Department>
      }
    >
  >

  /**
   * Retrieves all departments from the database.
   * @param retrieval Determines what kind of retrieval to perform.
   * Available values: 'departments' (default) or 'departments-with-chief'.
   * @returns An Either with a list of DepartmentWithChiefDetails.
   */
  execute(retrieval?: 'departments-with-chief'): Promise<
    Either<
      unknown,
      {
        departments: Array<DepartmentWithChiefDetails>
      }
    >
  >

  // Implements use case.
  async execute(
    retrieval: RetrievalParameter = 'departments',
  ): Promise<FetchDepartmentsUseCaseResponse<RetrievalParameter>> {
    let departments: Department[] | DepartmentWithChiefDetails[] = []

    if (retrieval === 'departments-with-chief') {
      // Fetches all departments with their chiefs from the database.
      departments = await this.departmentsRepository.findManyWithChiefs()

      return success({
        // Returns all departments with their chiefs.
        departments,
      })
    }

    // Fetches all departments from the database.
    departments = await this.departmentsRepository.findMany()

    return success({
      // Returns all departments.
      departments,
    })
  }
}
