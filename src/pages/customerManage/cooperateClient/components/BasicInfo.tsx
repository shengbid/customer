import React from 'react'
// import { getCreditDetail } from '@/services'
// import { Button } from 'antd'
import ComCard from '@/components/ComPage/ComCard'

interface basicProps {
  companyId: string
}

const CreditBasic: React.FC<basicProps> = ({}) => {
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
      <ComCard style={{ marginTop: 12 }} title="基础信息">
        999
      </ComCard>
    </>
  )
}

export default CreditBasic
