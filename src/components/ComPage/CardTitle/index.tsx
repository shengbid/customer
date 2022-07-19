import React from 'react'
import styles from './index.less'

interface titleProps {
  title: string
  style?: React.CSSProperties
  extra?: React.ReactNode
}
const CardTitle: React.FC<titleProps> = (props: any) => {
  return (
    <div className={styles.container} style={props.style}>
      <div className={styles.header}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.extra}>{props.extra}</div>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

export default CardTitle
