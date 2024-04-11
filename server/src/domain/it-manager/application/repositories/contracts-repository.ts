import { Contract } from '../../enterprise/entities/contract'

export interface ContractsRepository {
  findById(contractId: string): Promise<Contract | null>
  findMany(): Promise<Contract[]>

  create(contract: Contract): Promise<void>
  save(contract: Contract): Promise<void>
  delete(contract: Contract): Promise<void>
}
