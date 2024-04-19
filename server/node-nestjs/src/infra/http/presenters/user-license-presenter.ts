import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'

export class UserLicensePresenter {
  static toHTTP(userLicense: UserLicense) {
    return {
      id: userLicense.id.toString(),
      licenseId: userLicense.licenseId.toString(),
      departmentId: userLicense.departmentId?.toString(),
      userId: userLicense.userId?.toString(),
      type: userLicense.type.toLocaleLowerCase(),
      status: userLicense.status.toLocaleLowerCase(),
    }
  }
}
