import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import CompanyInfo from './companyInfo'
import { getCreditDetail, getCreditDetailById } from '@/services'
import CompanyPeople from './companyPeople'

interface creditprops {
  id: string
  isDetail?: boolean
  type?: number // 区分审批页面的授信信息与详情页面的授信信息 1详情
}
const CreditDetail: React.FC<creditprops> = ({ id, isDetail = false, type }) => {
  const [infoData, setInfoData] = useState({})
  const [spinning, setSpinning] = useState(true)
  // 获取授信详情
  const getCredit = async () => {
    if (type) {
      const { data } = await getCreditDetailById(id)
      setInfoData(data)
    } else {
      const { data } = await getCreditDetail(id)
      setInfoData(data)
    }
    setSpinning(false)
  }

  useEffect(() => {
    getCredit()
  }, [])

  return (
    <Spin spinning={spinning}>
      <CompanyInfo handleUpdate={getCredit} isDetail={isDetail} infoData={infoData} />
      <CompanyPeople handleUp={getCredit} isDetail={isDetail} infoData={infoData} />
    </Spin>
  )
}

export default CreditDetail
