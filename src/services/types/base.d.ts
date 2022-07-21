export interface pageLimitProps {
  pageNum: number
  pageSize: number
}

export interface addModalProps {
  modalVisible: boolean
  handleSubmit: () => void
  handleCancel: () => void
  info?: any
}
export interface detailModalProps {
  modalVisible: boolean
  handleCancel: () => void
  info: any
}

// select option
export interface selectOptionProps {
  label: string
  value: string | number
}
// 上传文件类型
export interface fileListOptionProps {
  fileName: string
  fileUrl: string
  pictureDomain: string
  name?: string
  url?: string
}
