import { Computer } from '../../enterprise/entities/computer'

export interface ComputersRepository {
  findById(computerId: string): Promise<Computer | null>
  findMany(): Promise<Computer[]>

  create(computer: Computer): Promise<void>
  save(computer: Computer): Promise<void>
  delete(computerId: string): Promise<void>
}
