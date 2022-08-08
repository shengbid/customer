import type { pageLimitProps } from './base'
// 待办
export interface undoneListProps {
  id: string
  businessKey: string
  instanceName: string // name
  name: string
  status: string //
  instanceId: string
  formkey: string
  createdDate?: string
  formKey: string
}
export interface undoneListParamProps extends pageLimitProps {
  instanceName: string // name
}
// 已办
export interface doneListProps {
  taskId: string
  processDefinitionName: string
  taskNodeName: string // name
  createBy: string
  startTime: string //
  endTime: string
  instanceId: string
  formkey: string
  formKey: string
}
export interface doneListParamProps extends pageLimitProps {
  instanceName: string // name
  taskId: string
  processDefinitionName: string
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
