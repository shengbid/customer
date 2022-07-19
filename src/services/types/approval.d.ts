export interface fileListProps {
  fileName: string
  fileUrl: string
  pictureDomain: string
}

export interface approvalHistoryProps {
  time: string
  nodename: string
  name: string
  reason: string
  result: string
  fileList?: fileListProps[]
}
