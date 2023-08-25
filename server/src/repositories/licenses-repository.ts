export interface LicensesRepository {
  create(data: LicenseCreateInput): Promise<License>

  findMany(): Promise<License[]>

  findById(licenseId: string): Promise<License | null>

  save(licenseId: string, rawData: LicenseSaveInput): Promise<License>

  remove(licenseId: string): Promise<void | null>
}
