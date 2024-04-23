import { Workstation } from '@/domain/it-manager/enterprise/entities/workstation'

export class WorkstationPresenter {
  static toHTTP(workstation: Workstation) {
    return {
      id: workstation.id.toString(),
      tag: workstation.tag,
      departmentId: workstation.departmentId.toString(),
      computerId: workstation.computerId?.toString(),
    }
  }
}
