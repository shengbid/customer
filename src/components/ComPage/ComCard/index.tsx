import React from 'react'
import { Card } from 'antd'

interface comcardprops {
  title: string
  style?: React.CSSProperties
}

const ComCard: React.FC<comcardprops> = (props: any) => {
  const { title, style } = props

  return (
    <Card title={title} bordered={false} style={{ marginBottom: 12, ...style }}>
      {props.children}
    </Card>
  )
}

export default ComCard
