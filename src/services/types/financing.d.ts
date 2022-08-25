/*
 * @Author: liulinfan
 * @Date: 2022-08-24 18:39:33
 * @Last Modified by: liulinfan
 * @Last Modified time: 2022-08-24 18:59:26
 */
export interface FinancingOrderType {
  orderNo: string
  customerName: string
  productName: string
  moneyUse: string[]
  timeLimit: number
  datePeriod: string
  auditNode: string
  financingStatus: string
  overdueStatus: string
  applyDate: string
  action: string
}
