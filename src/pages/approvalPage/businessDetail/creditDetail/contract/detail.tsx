import React, { useEffect, useState } from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComUpload from '@/components/ComUpload'
import { creditContractDetail } from '@/services'

interface detailProps {
  creditParams: any
}
const ContractDetail: React.FC<detailProps> = ({ creditParams }) => {
  const [fileList, setFileList] = useState<any[]>([])

  const getDetail = async () => {
    const { data } = await creditContractDetail(creditParams)
    setFileList(data)
  }

  useEffect(() => {
    getDetail()
  }, [])

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
