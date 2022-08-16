import React from 'react'
import { PageContainer } from '@ant-design/pro-layout'

interface pageProps {
  title: string | React.ReactNode
  extra?: React.ReactNode
  tabList?: any[]
  onTabClick?: (key: string) => void
}

const ComPageContanier: React.FC<pageProps> = (props: any) => {
  const { tabList = [], title, extra, onTabClick } = props
  return (
    <div
      style={{
        background: '#f0f2f5',
      }}
    >
      <PageContainer
        header={{
          title,
          breadcrumb: {},
          ghost: true,
          extra,
        }}
        tabList={tabList}
        tabProps={{
          onTabClick,
        }}
      >
        {props.children}
      </PageContainer>
    </div>
  )
}

export default ComPageContanier
