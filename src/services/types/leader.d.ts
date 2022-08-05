import type { pageLimitProps } from './base'

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
