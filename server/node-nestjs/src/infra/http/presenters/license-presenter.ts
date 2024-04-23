import { License } from '@/domain/it-manager/enterprise/entities/license'

export class LicensePresenter {
  static toHTTP(license: License) {
    return {
      id: license.id.toString(),
      name: license.name,
      partner: license.partner,
      quantity: license.quantity,
      expiresAt: license.expiresAt,
      daysToExpire: license.daysUntilExpires,
      totalCost: license.totalCost,
      cost: license.cost,
      obs: license.obs,
      createdAt: license.createdAt,
    }
  }
}
