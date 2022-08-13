import React, { useState } from 'react'
import Logistics from './logistics'

interface infoProps {
  enterpriseId: string
}

const CooperateClient: React.FC<infoProps> = ({ enterpriseId }) => {
  const [tableData] = useState<any[]>([])

  return (
    <>
      <Logistics infoData={tableData} enterpriseId={enterpriseId} title="物流" />
      <Logistics infoData={tableData} enterpriseId={enterpriseId} title="仓储" />
    </>
  )
}

export default CooperateClient
