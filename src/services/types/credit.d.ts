import type { fileListOptionProps, pageLimitProps } from './base'

// 授信筛选列表
export interface creditListParamProps extends pageLimitProps {
  enterpriseCreditName?: string
  auditStatus?: string
  quotaStatus?: string
}

// 授信列表
export interface creditListProps {
  id: number
  enterpriseId: number
  enterpriseCreditName: string
  auditStatus: string
  quotaStatus: string
  creditBecomDate: string
  creditExpireDate: string
}

// 企业经营信息
export interface companyBusProps {
  id: string
  enterpriseName: string
  businessTypeList: string
  sellProduct: string
  enterpriseDebt: string
  applyQuota: string
  updateTime: string
  businessDetailsList: companyBusinessProps[]
}
// 企业清单信息
export interface companyFileProps {
  id: string
  creditId: string
  lszh: fileListOptionProps[]
  hwqd: fileListOptionProps[]
  cgqd: fileListOptionProps[]
  xykhqd: fileListOptionProps[]
  btobSdqd: fileListOptionProps[]
  jyrsm: fileListOptionProps[]
  btocSdqd: fileListOptionProps[]
  skjt: fileListOptionProps[]
}
// 企业人员信息
export interface companyPeopleProps {
  id: string
  identity: string
  identityType: string
  identityNumber: string
  name: string
}

// 企业经营年度营业额情况
export interface companyBusinessProps {
  year?: string | number
  businessVolume?: string
  businessVolume2?: string
}
// 关联股东信息
export interface shareholderProps {
  id: number | string
  shareholderName: string
  identityType: string
  identityNumber: string
  shareProportion: string
}
// 关联企业
export interface relateCompanyProps {
  id: number | string
  enterpriseName: string
  companyRegister: string
  enterpriseCode: string
  frName: string
  identityType: string
  identityNumber: string
  registrationAddress: string
  remark: string
}
// 尽调报告文件
export interface reportFileProps {
  id: number | string
  fileType: string
  typeName?: string
  fileList: fileListOptionProps[]
}
// 合同文件
export interface signContractProps {
  id: number | string
  name: string
  number?: string
  fileType: string
  typeName?: string
  time: string
  fileList: fileListOptionProps[]
}
// 获取尽调报告参数
export interface surveyParamProps {
  infoId: number | string
  enterpriseId: number | string
}
