import { Computer } from '../../enterprise/entities/computer'

export abstract class ComputersRepository {
  abstract findById(computerId: string): Promise<Computer | null>
  abstract findMany(): Promise<Computer[]>

  abstract create(computer: Computer): Promise<void>
  abstract save(computer: Computer): Promise<void>
  abstract delete(computer: Computer): Promise<void>
}
