import React from 'react'
import { Typography, notification } from 'antd'
import { loginOut } from '@/utils/base'
import { downFile } from '@/services'
import FileSaver from 'file-saver'

const { Link } = Typography

interface downFileProps {
  fileInfo: any
  btnTitle?: string
}
// 单独下载上传的文件
const DownFile: React.FC<downFileProps> = ({ fileInfo, btnTitle = '下载' }) => {
  // 文件下载
  const onPreview = async () => {
    // console.log(file)
    const { name, fileUrl } = fileInfo
    // window.open(`${url}`)
    const res = await downFile({ name, fileUrl })
    const headerName = res.response.headers.get('content-disposition')
    const fileName = decodeURI(headerName?.split('attachment;filename=')[1] || '')
    if (res.data && res.data.size) {
      if (res.data.type === 'application/json') {
        // 如果接口报错,抛出错误
        const reader: any = new FileReader()
        reader.readAsText(res.data, 'utf-8')
        reader.onload = function () {
          const response = JSON.parse(reader.result)
          if (response && response.code === 401) {
            loginOut()
            notification.warning({
              key: 'error',
              message: response.responseMsg,
            })
            return
          }
          if (response && response.code !== 200) {
            notification.warning({
              key: 'error',
              message: response.responseMsg,
            })
            return
          }
        }
      } else {
        FileSaver.saveAs(res.data, fileName)
      }
    }
  }

  return (
    <Link key="detail" onClick={onPreview}>
      {btnTitle}
    </Link>
  )
}

export default DownFile
