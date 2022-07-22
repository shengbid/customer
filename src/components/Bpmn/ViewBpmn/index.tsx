import React, { useState, useEffect, useRef } from 'react'
import { Spin, message } from 'antd'
import { processDetail, processApprovalDetail } from '@/services'
import BpmnViewer from 'bpmn-js/lib/Viewer'
import styles from './index.less'

interface viewProps {
  info: any
  highLightData?: any
  height?: string
}
const ViewBpmn: React.FC<viewProps> = ({ info, highLightData, height = '60vh' }) => {
  const [spinLoading, setSpinLoading] = useState<boolean>(true)
  const [bpmnModler, setBpmnModler] = useState<any>(null)
  const bpmnRef = useRef<any>()

  // 设置节点颜色
  const setNodeColor = (ids: any, newBpmn: any, colorClass: string) => {
    const elementRegistry = newBpmn.get('elementRegistry')

    ids.forEach((item: any) => {
      if (elementRegistry._elements[item]) {
        const element = elementRegistry._elements[item].gfx
        element.classList.add(colorClass)
      }
      // console.log(elementRegistry, element)
    })
  }

  const createDiagram = (xmlstr: string) => {
    bpmnModler && bpmnModler.destroy && bpmnModler.destroy()
    const newBpmn = new BpmnViewer({
      container: bpmnRef.current,
      height,
    })
    const canvas = newBpmn.get('canvas')
    newBpmn.importXML(xmlstr, (err: string) => {
      if (err) {
        message.error(err)
      } else {
        canvas.zoom('fit-viewport', 'auto')
        if (highLightData) {
          const successIds = highLightData.highLine.concat(highLightData.highPoint)
          const procesingIds = highLightData.waitingToDo
          // const undoneIds = highLightData.iDo
          // console.log(1, newBpmn, canvas)

          setNodeColor(successIds, newBpmn, 'nodeSuccess')
          setNodeColor(procesingIds, newBpmn, 'nodeProcing')
          // setNodeColor(undoneIds, newBpmn, 'nodeError')
        }
      }
    })
    setBpmnModler(newBpmn)
  }

  const getProcessDetail = async () => {
    let diagramXML
    if (info.instanceId) {
      // 如果是审批详情
      diagramXML = await processApprovalDetail(info.instanceId)
    } else {
      diagramXML = await processDetail(info)
    }
    createDiagram(diagramXML)
    setSpinLoading(false)
  }

  useEffect(() => {
    getProcessDetail()
  }, [])

  return (
    <Spin spinning={spinLoading} tip="正在加载...">
      {info.instanceId ? (
        <div className={styles.tip}>
          <div className={styles.item}>
            <div className={styles.susitem} />
            <span>已审核</span>
          </div>
          <div className={styles.item}>
            <div className={styles.proitem} />
            <span>当前审核</span>
          </div>
          <div className={styles.item}>
            <div className={styles.unitem} />
            <span>待审核</span>
          </div>
        </div>
      ) : null}
      <div id="canvas" ref={bpmnRef} className={styles.canvas} />
    </Spin>
  )
}

export default ViewBpmn
