import { Contract } from '../../enterprise/entities/contract'

export abstract class ContractsRepository {
  abstract findById(contractId: string): Promise<Contract | null>
  abstract findMany(): Promise<Contract[]>

  abstract create(contract: Contract): Promise<void>
  abstract save(contract: Contract): Promise<void>
  abstract delete(contract: Contract): Promise<void>
}
