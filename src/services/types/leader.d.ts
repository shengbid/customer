import type { pageLimitProps } from './base'
// 待办
export interface undoneListProps {
  id: string
  processNo: string
  rwlx: string
  businessKey: string
  name: string // name
  taskTotalName: string
  status: string //
  instanceId: string
  formkey: string
  createdDate?: string
  formKey: string
}
export interface undoneListParamProps extends pageLimitProps {
  rwlx?: any
  processNo?: string
  taskTotalName?: string // name
}
// 已办
export interface doneListProps {
  id: string
  businessKey: string
  taskId: string
  rwlx: string
  processNo: string
  taskTotalName: string
  taskNodeName: string // name
  fqrNickname: string
  startTime: string //
  createTime: string //
  endTime: string
  instanceId: string
  processInstanceId: string
  formkey: string
  status: string
}
export interface doneListParamProps extends pageLimitProps {
  rwlx: any
  processNo: string
  taskTotalName: string // name
}

export interface leaveListProps {
  id: string
  instanceId: string
  type: string
  title: string
  reason: string
  leaveStartTime: string
  leaveEndTime: string
  taskName?: string
  createName?: string
}
export interface leaveListParamProps extends pageLimitProps {
  type: string
  title: string
  taskName?: string
}
