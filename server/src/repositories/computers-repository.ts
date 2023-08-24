export interface ComputersRepository {
  create(data: ComputerCreateInput): Promise<Computer>

  findMany(): Promise<Computer[]>

  findById(computerId: string): Promise<Computer | null>

  save(computerId: string, rawData: Partial<ComputerSaveInput>): Promise<Computer | null>

  remove(computerId: string): Promise<Computer | null>
}
