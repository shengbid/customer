import React from 'react'
// import { getCreditDetailById } from '@/services'
// import { Button } from 'antd'
import CreditInfo from '@/pages/approvalPage/businessDetail/creditDetail'
import ComCard from '@/components/ComPage/ComCard'
import RealteDetail from '@/pages/approvalPage/businessDetail/creditDetail/relatedForm/detail'
import SignPerson from '../../cooperateClient/components/SignPerson'
interface basicProps {
  companyId: string
}

const CreditBasic: React.FC<basicProps> = ({ companyId }) => {
  // const [infoData, setInfoData] = useState<any>({})

  // const getDetail = async () => {
  //   const { data } = await getCreditDetailById(companyId)
  //   setInfoData(data)
  // }

  // useEffect(() => {
  //   getDetail()
  // }, [])

  return (
    <>
      <ComCard style={{ marginTop: 12 }} title="基础信息">
        <CreditInfo id={companyId} type={1} />
      </ComCard>
      <ComCard title="关联信息">
        <RealteDetail isEdit={true} creditParams={{ enterpriseId: companyId }} />
      </ComCard>
      {/* 签约经办人 */}
      <SignPerson />
    </>
  )
}

export default CreditBasic
