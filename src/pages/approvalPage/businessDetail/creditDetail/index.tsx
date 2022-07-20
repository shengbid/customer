import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import CompanyInfo from './companyInfo'
import { getCreditDetail } from '@/services'
import CompanyPeople from './companyPeople'

interface creditprops {
  id: string
}
const CreditDetail: React.FC<creditprops> = () => {
  const [infoData, setInfoData] = useState({})
  const [spinning, setSpinning] = useState(true)
  // 获取授信详情
  const getCredit = async () => {
    const { data } = await getCreditDetail('62b845a1-07d7-11ed-a2b6-0a002700000a')
    setSpinning(false)
    setInfoData(data)
  }

  useEffect(() => {
    getCredit()
  }, [])

  return (
    <Spin spinning={spinning}>
      <CompanyInfo infoData={infoData} />
      <CompanyPeople infoData={infoData} />
    </Spin>
  )
}

export default CreditDetail
