import { Contract } from '@/domain/it-manager/enterprise/entities/contract'

export class ContractPresenter {
  static toHTTP(contract: Contract) {
    return {
      id: contract.id.toString(),
      description: contract.description,
      contactEmail: contract.contactEmail,
      startAt: contract.startAt,
      endAt: contract.endAt,
      type: contract.type,
    }
  }
}
