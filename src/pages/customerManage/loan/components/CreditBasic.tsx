import React from 'react'
// import { getCreditDetail } from '@/services'
// import { Button } from 'antd'
import CreditInfo from '@/pages/approvalPage/businessDetail/creditDetail'
import ComCard from '@/components/ComPage/ComCard'
import RealteDetail from '@/pages/approvalPage/businessDetail/creditDetail/relatedForm/detail'

interface basicProps {
  companyId: string
}

const CreditBasic: React.FC<basicProps> = ({ companyId }) => {
  // const [infoData, setInfoData] = useState<any>({})

  // const getDetail = async () => {
  //   const { data } = await getCreditDetail(companyId)
  //   setInfoData(data)
  // }

  // useEffect(() => {
  //   getDetail()
  // }, [])

  return (
    <>
      <CreditInfo id={companyId} />
      <ComCard style={{ marginTop: 12 }} title="关联信息">
        <RealteDetail isEdit={true} creditParams={{ enterpriseId: companyId }} />
      </ComCard>
    </>
  )
}

export default CreditBasic
