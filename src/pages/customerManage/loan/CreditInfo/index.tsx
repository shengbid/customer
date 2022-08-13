import React from 'react'
import ContractDetail from './contractInfo'

const CreditInfo: React.FC<{ enterpriseId: number }> = ({ enterpriseId }) => {
  return (
    <>
      <ContractDetail enterpriseId={enterpriseId} />
    </>
  )
}

export default CreditInfo
