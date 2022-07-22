export interface fileListProps {
  fileName: string
  fileUrl: string
  pictureDomain: string
}

export interface approvalHistoryProps {
  id: number
  createTime: string
  taskNodeName: string
  createBy: string
  approvalComments: string
  radioValue: string
  fileList?: fileListProps[]
}
