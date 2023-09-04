export interface ComputersRepository {
  create(data: ComputerCreateInput): Promise<Computer>

  findMany(): Promise<Computer[]>

  findById(computerId: string): Promise<Computer | null>

  save(computerId: string, rawData: ComputerSaveInput): Promise<Computer>

  remove(computerId: string): Promise<Computer>
}
