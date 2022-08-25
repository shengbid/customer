import React, { useState, useEffect } from 'react'
import styles from '../index.less'
import ComDescriptions from '@/components/ComPage/Descriptions'
import { history } from 'umi'
import { Button } from 'antd'

const { DescriptionsItem } = ComDescriptions

interface headerProps {
  infoData: any
}

const ProcessHeader: React.FC<headerProps> = ({ infoData }) => {
  const [headerInfo, setHeaderInfo] = useState<any>({})

  useEffect(() => {
    if (infoData && infoData.createTime) {
      setHeaderInfo(infoData)
    }
  }, [infoData])

  return (
    <div className={styles.header}>
      <ComDescriptions
        title={headerInfo.taskTotalName}
        extra={
          <Button
            type="primary"
            onClick={() => {
              history.goBack()
            }}
          >
            返回
          </Button>
        }
      >
        <DescriptionsItem label="创建时间">{headerInfo.createTime}</DescriptionsItem>
        <DescriptionsItem label="发起人">{headerInfo.fqrNickname}</DescriptionsItem>
        <DescriptionsItem label="流程编号">{headerInfo.processNo}</DescriptionsItem>
      </ComDescriptions>
    </div>
  )
}

export default ProcessHeader
