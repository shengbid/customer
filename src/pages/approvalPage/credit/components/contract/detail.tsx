import React, { useEffect, useState } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComUpload from '@/components/ComUpload'
import { creditContractDetail } from '@/services'

interface detailProps {
  taskID: string
  businessKey: string
}
const ContractDetail: React.FC<detailProps> = ({ taskID, businessKey }) => {
  const [fileList, setFileList] = useState<any[]>([])

  const getDetail = async () => {
    const { data } = await creditContractDetail({ taskID, businessKey })
    setFileList(data)
  }

  useEffect(() => {
    if (taskID) {
      getDetail()
    }
  }, [taskID])

  // const infoData = {
  //   creditReport: [
  //     {
  //       fileName: '微信图片_20220616181011.png',
  //       fileUrl: 'jixiang/dev/2022-07-26/36POBoMfcDrml1AipwE/微信图片_20220616181011.png',
  //       pictureDomain: 'https://jixiang2022.oss-cn-shenzhen.aliyuncs.com/',
  //     },
  //   ],
  // }

  return (
    <ComCard title="合同信息">
      <div>授信准备合同</div>
      <ComUpload isDetail value={fileList} />
    </ComCard>
  )
}

export default ContractDetail
