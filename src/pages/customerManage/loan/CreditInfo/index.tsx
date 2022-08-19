import React from 'react'
import ContractDetail from './contractInfo'
interface infoProps {
  enterpriseId: number
}

const CreditInfo: React.FC<infoProps> = ({ enterpriseId }) => {
  return (
    <>
      <ContractDetail enterpriseId={enterpriseId} />
    </>
  )
}

export default CreditInfo
