import React from 'react'
import ComCard from '@/components/ComPage/ComCard'
import ComUpload from '@/components/ComUpload'

const contractDetail: React.FC = () => {
  const infoData = {
    creditReport: [
      {
        fileName: '微信图片_20220616181011.png',
        fileUrl: 'jixiang/dev/2022-07-26/36POBoMfcDrml1AipwE/微信图片_20220616181011.png',
        pictureDomain: 'https://jixiang2022.oss-cn-shenzhen.aliyuncs.com/',
      },
    ],
  }

  return (
    <ComCard title="合同信息">
      <div>授信准备合同</div>
      <ComUpload isDetail value={infoData.creditReport} />
    </ComCard>
  )
}

export default contractDetail
