import React, { useState, useEffect } from 'react'
import { Collapse, Button, Table, Space, Form, Input, Select, message } from 'antd'
import HandleUser from './components/handleUser'
import HandleRecepient from './components/handleRecepients'
import AddUserModal from '@/components/AddUserModal'
import type { userProps } from '@/services/types'
import AddBtnForm from './components/addBtnForm'
import DictSelect from '@/components/ComSelect'
import FlowListener from './components/flowListener'
import { isEmpty, isArray } from 'lodash'
import { getUserList } from '@/services'
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper'
import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper'
import ExtensionElementsHelper from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper'

const { Panel } = Collapse
const PropertyPanel: React.FC<{ bpmnModeler: any }> = ({ bpmnModeler }) => {
  const [isRootElement, setIsRootElement] = useState<boolean>(true) // 是否是全局节点
  const [isServiceTask, setIsServiceTask] = useState<boolean>(false) // 是否是线段节点
  const [isTask, setIsTask] = useState<boolean>(false) // 是否是任务节点
  const [isUserTask, setIsUserTask] = useState<boolean>(false) // 是否展示节点处理人
  // const [isStart, setIsStart] = useState<boolean>(false) // 表单设置
  const [isSequenceFlow, setSequenceFlow] = useState<boolean>(true) // 条件流转
  const [isGateway, setIsGateway] = useState<boolean>(false) // 执行监听
  // const [formList, setFormList] = useState<any>([]) // 流程表单
  const [element, setElement] = useState<any>() // 当前选中的元素
  const [rootElement, setRootElement] = useState<any>(null) // 根节点元素
  const [saveProperties, setSaveProperties] = useState<any>({})
  const [initUserModal, setInitUserModal] = useState({
    visible: false,
  } as any) // 处理人modal
  const [initBtModal, setInitBtModal] = useState({
    visible: false,
  } as any) // 按钮数据
  const [initListenerModal, setInitListenerModal] = useState({
    visible: false,
  } as any) // 监听数据

  const [form] = Form.useForm()

  const [userKey] = useState<string>('userId')
  const [userTask, setUserTaskArr] = useState({
    assigneeType: '1', // 处理人类型
    assigneeName: '', // 处理人
    assignee: '', // 处理人ID
    assigneeSelectedArr: [], // 处理人对象数组

    candidateUsersName: '', //  处理人组名称
    candidateUsers: '', // 处理人组Id
    candidateUsersSelectedArr: [], // 处理人组对象数组
    candidateGroups: [], // 处理角色
    formKey: '',
  } as any)
  const [recipientTask, setRecipientTaskArr] = useState({
    recipientType: '1', // 抄送人类型
    recipientSelectedArr: [], // 抄送人对象数组

    recipientUsersName: '', //  抄送人组名称
    recipientUsers: '', // 抄送人组Id
    recipientUsersSelectedArr: [], // 抄送人组对象数组
    recipientGroups: [], // 抄送角色
  } as any)
  const [panelValue, setForm] = useState({
    id: '1231321321', // 定义key
    name: '', // 名称
    // targetNamespace: '', // 命名空间,修改方法有问题,暂时写死
    taskPriority: '', // 任务级别
    jobPriority: '', // 工作级别
    historyTimeToLive: '', // 保留时间
    description: '', // 流程描述
    executionListener: [], // 执行监听
    button: [], // 按钮
    taskListener: [], // 任务监听
    isSequential: '', // 多实例类型
    loopCardinality: '', // 循环基数
    collection: '', // 集合
    elementVariable: '', // 元素变量
    completionCondition: '', // 完成条件
    height: 0, // 组件高度
    width: 0, // 组件宽度
    busNodeType: {
      label: '',
      value: '',
    }, // 业务节点
    optionalExecutor: '',
  } as any)

  // 获取流程表单
  // const getFormType = () => {
  //   setFormList([
  //     {
  //       value: 'projectInitiatedForm',
  //       label: '立项表单',
  //     },
  //   ])
  // }

  // useEffect(() => {
  //   getFormType()
  // }, [])

  const elementChangeEvent = (e: any) => {
    console.log('element', e)
    if (!element) {
      return
    }
    if (e.element.id === element.id) {
      setElement(e.element)
    }
  }
  const elementClickEvent = (e: any) => {
    console.log('element.click', e)
    const type = e.element?.type
    if (type === 'bpmn:Process') setRootElement(e.element)
  }

  // 流程事件监听
  const initFn = () => {
    bpmnModeler.on('selection.changed', (e: any) => {
      const { newSelection } = e
      // setSelectedElements(newSelection)
      setElement(newSelection[0])
      // setRootElement(null)
    })
    bpmnModeler.on('element.changed', (e: any) => {
      elementChangeEvent(e)
    })
    bpmnModeler.on('element.click', (e: any) => {
      elementClickEvent(e)
    })
    bpmnModeler.on('root.added', (e: any) => {
      elementClickEvent(e)
    })
  }

  useEffect(() => {
    if (bpmnModeler) initFn()
  }, [bpmnModeler])

  // 流程处理人/抄送人数据处理
  const setUserTask = async (businessObject: any) => {
    // console.log(businessObject)
    const attrs = businessObject.$attrs ? businessObject.$attrs : {}
    let recipientGroups = attrs['activiti:recipientGroups'] ? attrs['activiti:recipientGroups'] : []
    let candidateGroups = businessObject?.candidateGroups ? businessObject?.candidateGroups : []

    const oldSaveProperties = { ...saveProperties }
    const newUserTask: any = {}
    const newRecipientTask: any = {}
    oldSaveProperties[businessObject.id] = saveProperties[businessObject.id] || {}
    const objValues = oldSaveProperties[businessObject.id]

    newUserTask.candidateUsersName = objValues.candidateUsersName
      ? objValues.candidateUsersName
      : undefined

    const { rows } = await getUserList({ pageNum: 1, pageSize: 200 })

    if (newUserTask.candidateUsersName === undefined && businessObject.candidateUsers) {
      newUserTask.candidateUsersName = ''
      newUserTask.candidateUsers = businessObject.candidateUsers
      const newArr = businessObject.candidateUsers.split(',')
      newUserTask.candidateUsersSelectedArr = []

      rows.forEach((item: userProps) => {
        if (newArr.includes(String(item.userId))) {
          newUserTask.candidateUsersName += item.userName
          newUserTask.candidateUsersSelectedArr.push({
            userId: item.userId,
            userName: item.userName,
          })
          if (newUserTask.candidateUsersSelectedArr.length < newArr.length) {
            newUserTask.candidateUsersName += ','
          }
        }
      })
    }

    newRecipientTask.recipientUsersName = ''
    if (attrs['activiti:recipientUsers']) {
      newRecipientTask.recipientUsers = attrs['activiti:recipientUsers']
      const newArr = attrs['activiti:recipientUsers'].split(',')
      newRecipientTask.recipientUsersSelectedArr = []

      rows.forEach((item: userProps) => {
        if (newArr.includes(String(item.userId))) {
          newRecipientTask.recipientUsersName += item.userName
          newRecipientTask.recipientUsersSelectedArr.push({
            userId: item.userId,
            userName: item.userName,
          })
          if (newRecipientTask.recipientUsersSelectedArr.length < newArr.length) {
            newRecipientTask.recipientUsersName += ','
          }
        }
      })
    }
    if (businessObject?.candidateGroups && !isArray(businessObject?.candidateGroups)) {
      // 用户角色
      candidateGroups = businessObject?.candidateGroups.split(',')
    }
    if (attrs['activiti:recipientGroups'] && !isArray(attrs['activiti:recipientGroups'])) {
      // 抄送人角色
      recipientGroups = attrs['activiti:recipientGroups'].split(',')
    }

    setUserTaskArr({
      formKey: businessObject?.formKey,
      candidateGroups,
      ...newUserTask,
    })

    setRecipientTaskArr({
      recipientGroups,
      ...newRecipientTask,
    })
  }
  // 按钮数据处理
  const handleBtns = (extensionElements: any) => {
    const obj: any = {
      extensionElements: [],
      taskListener: [],
      executionListener: [],
      busNodeType: { label: '', value: '' },
    }
    const listenerTypeName: any = {
      class: '类',
      expression: '表达式',
      delegateExpression: '代理表达式',
    }
    if (extensionElements && !isEmpty(extensionElements.values)) {
      extensionElements.values.map((item: any) => {
        if (item.$type === 'activiti:Button') {
          obj.extensionElements.push({
            name: item.name,
            code: item.code,
          })
        } else if (item.$type === 'activiti:TaskListener') {
          // 任务监听
          const info = {
            listenerTypeName: '',
            value: '',
          }
          for (const key in listenerTypeName) {
            if (item[key]) {
              info.listenerTypeName = listenerTypeName[key]
              info.value = item[key]
            }
          }
          obj.taskListener.push({
            event: item.event,
            ...info,
          })
        } else if (item.$type === 'activiti:ExecutionListener') {
          // 执行监听
          const info = {
            listenerTypeName: '',
            value: '',
          }
          for (const key in listenerTypeName) {
            if (item[key]) {
              info.listenerTypeName = listenerTypeName[key]
              info.value = item[key]
            }
          }
          obj.executionListener.push({
            event: item.event,
            ...info,
          })
        } else if (item.$type === 'activiti:BusNodeType') {
          // 业务类型
          obj.busNodeType.value = item.code
          obj.busNodeType.label = item.name
        }
      })
    }
    return obj
  }

  // 多实例配置处理
  const setMultiInstance = (businessObject: any) => {
    const loopCharacteristics: any = businessObject?.loopCharacteristics || {}

    const selectedMultiInstance: any = {
      isSequential: '', // 多实例类型
      loopCardinality: '', // 循环基数
      collection: '', // 集合
      elementVariable: '', // 元素变量
      completionCondition: '', // 完成条件
    }
    if (loopCharacteristics?.$type === 'bpmn:MultiInstanceLoopCharacteristics') {
      selectedMultiInstance.isSequential = loopCharacteristics.isSequential
        ? 'Sequential'
        : 'Parallel' // 类型
      selectedMultiInstance.loopCardinality = loopCharacteristics.loopCardinality?.body // 循环基数
      selectedMultiInstance.collection = loopCharacteristics?.collection // 集合
      selectedMultiInstance.elementVariable = loopCharacteristics?.elementVariable // 元素变量
    }
    if (loopCharacteristics.completionCondition) {
      selectedMultiInstance.completionCondition = loopCharacteristics.completionCondition.body // 完成条件
    }
    return selectedMultiInstance
  }

  // 设置节点值
  const setDefaultProperties = (currentElement: any) => {
    console.log(1, currentElement)
    if (currentElement) {
      const { businessObject } = currentElement
      if (currentElement?.type === 'bpmn:UserTask') {
        // 设置流程人
        setUserTask(businessObject)
      }
      // 按钮组和任务监听, 业务节点
      const { extensionElements, executionListener, taskListener, busNodeType } = handleBtns(
        businessObject.extensionElements,
      )
      const multiInstance = setMultiInstance(businessObject)

      setForm({
        ...businessObject,
        ...businessObject?.$attrs,
        ...multiInstance,
        // targetNamespace: businessObject?.$parent?.targetNamespace, // 命名空间
        conditionExpression: businessObject?.conditionExpression?.body, // 流转条件的表达式
        name: businessObject?.name,
        button: extensionElements,
        busNodeType,
        executionListener,
        taskListener,
        height: currentElement?.height || 0,
        width: currentElement?.width || 0,
      })
    }
  }

  useEffect(() => {
    if (element || rootElement) {
      const currentElement = element || rootElement
      const type = currentElement?.type
      setIsUserTask(type && type === 'bpmn:UserTask')
      setIsServiceTask(type && type === 'bpmn:ServiceTask')
      setSequenceFlow(type && type === 'bpmn:SequenceFlow')
      // setIsStart(type && type === 'bpmn:StartEvent')
      setIsGateway(type && type.includes('Gateway'))
      setIsTask(type && type.includes('Task'))
      setIsRootElement(type && type.includes('bpmn:Process'))
      setDefaultProperties(currentElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, rootElement])

  useEffect(() => {
    // console.log(666, recipientTask)
    form?.setFieldsValue({ ...panelValue, ...userTask, ...recipientTask })
  }, [panelValue, userTask, recipientTask, form])

  // 选择处理人
  const selectAgent = (maxSelectedNum: number, name: string) => {
    setInitUserModal({
      visible: true,
      maxSelectedNum,
      typeName: name,
      initSelectUser:
        name === 'candidateUsers'
          ? userTask.candidateUsersSelectedArr
          : recipientTask.recipientUsersSelectedArr,
    })
  }

  // 选择用户
  const setAssignee = (select: userProps[]) => {
    console.log(1, select)
  }
  const updateProperties = (properties: any) => {
    // console.log(21, properties)
    try {
      const modeling = bpmnModeler.get('modeling')
      modeling.updateProperties(element || rootElement, { ...properties })
    } catch (error: any) {
      message.error(error.message)
    }
  }
  // 选择用户组
  const setCandidateUsers = (select: userProps[]) => {
    // console.log(2, select)
    const newUserTask = { ...userTask }
    const oldsaveProperties = { ...saveProperties }
    const users = []
    const usersName = []
    const candidateUsersSelectedArr = []
    for (let i = 0; i < select.length; i += 1) {
      candidateUsersSelectedArr.push({
        [userKey]: select[i][userKey],
        userName: select[i].userName,
      })
      users.push(select[i][userKey])
      usersName.push(select[i].userName)
    }
    newUserTask.candidateUsersSelectedArr = candidateUsersSelectedArr
    newUserTask.candidateUsers = users.join(',')
    newUserTask.candidateUsersName = usersName.join(',')
    updateProperties({
      candidateUsers: newUserTask.candidateUsers,
    })
    setUserTaskArr(newUserTask)
    oldsaveProperties[element.id || rootElement.id] = newUserTask
    setSaveProperties(oldsaveProperties)
  }
  // 选择抄送组
  const setRecipientUsers = (select: userProps[]) => {
    const newUserTask = { ...recipientTask }
    const users = []
    const usersName = []
    const recipientUsersSelectedArr = []
    for (let i = 0; i < select.length; i += 1) {
      recipientUsersSelectedArr.push({
        [userKey]: select[i][userKey],
        userName: select[i].userName,
      })
      users.push(select[i][userKey])
      usersName.push(select[i].userName)
    }
    newUserTask.recipientUsersSelectedArr = recipientUsersSelectedArr
    newUserTask.recipientUsers = users.join(',')
    newUserTask.recipientUsersName = usersName.join(',')
    updateProperties({
      'activiti:recipientUsers': newUserTask.recipientUsers,
    })
    setRecipientTaskArr(newUserTask)
  }
  // 选择用户
  const onUserFinish = (select: userProps[], name: string) => {
    if (name === 'assignee') {
      setAssignee(select)
    } else if (name === 'recipientUsers') {
      setRecipientUsers(select)
    } else {
      setCandidateUsers(select)
    }
    setInitUserModal({ visible: false })
  }
  // 点击添加按钮
  const addButton = () => {
    setInitBtModal({
      visible: true,
      initSelectBt: [...panelValue.button],
    })
  }
  // 删除按钮
  const deleteBT = (delBt: any) => {
    const newpanelValue = { ...panelValue }
    newpanelValue.button = newpanelValue.button.filter((elem: any) => elem.code !== delBt.code)
    const currentElement = element || rootElement
    const bo = currentElement.businessObject
    const { extensionElements } = bo
    if (extensionElements) {
      extensionElements.values = extensionElements.values.filter(
        (elem: any) => elem.code !== delBt.code,
      )
    }

    setForm(newpanelValue)
  }
  const executeCommand = (command: any) => {
    const commandStack = bpmnModeler.get('commandStack')
    commandStack.execute(command.cmd, command.context)
  }
  // 设置按钮,任务监听属性
  const setExtensionElements = (values: any[], key: string) => {
    const bpmnFactory = bpmnModeler.get('bpmnFactory')
    const currentElement = element || rootElement
    const bo = currentElement.businessObject
    let { extensionElements } = bo
    if (extensionElements) {
      extensionElements.values = extensionElements.values.filter((elem: any) => elem.$type !== key)
    } else {
      extensionElements = elementHelper.createElement(
        'bpmn:ExtensionElements',
        { values: [] },
        bo,
        bpmnFactory,
      )
      executeCommand(
        cmdHelper.updateBusinessObject(currentElement, bo, {
          extensionElements,
        }),
      )
    }
    for (let i = 0; i < values.length; i += 1) {
      const value = values[i]
      const props = {
        ...value,
      }
      const newElem = elementHelper.createElement(key, props, extensionElements, bpmnFactory)
      executeCommand(ExtensionElementsHelper.addEntry(bo, currentElement, newElem, bpmnFactory))
    }
  }
  // 增加按钮
  const onBtFinish = (select: any[]) => {
    console.log('addBt', select)
    const newpanelValue = { ...panelValue }
    newpanelValue.button = select
    setExtensionElements(select, 'activiti:Button')
    setForm(newpanelValue)
    setInitBtModal({ visible: false })
  }
  // 点击添加监听
  const addListeners = (isTaskEvent: boolean) => {
    setInitListenerModal({
      visible: true,
      isTaskEvent,
    })
  }
  // 编辑监听事件
  const editListeners = (isTaskEvent: boolean, listenerObj: any, index: number) => {
    setInitListenerModal({
      visible: true,
      isTaskEvent,
      initData: listenerObj,
      initIndex: index,
    })
  }
  // 删除监听事件
  const deleteListener = (index: number, isTaskEvent: boolean) => {
    let key: string
    let keyName: string
    if (isTaskEvent) {
      keyName = 'taskListener'
      key = 'activiti:TaskListener'
    } else {
      keyName = 'executionListener'
      key = 'activiti:ExecutionListener'
    }
    const newpanelValue = { ...panelValue }
    newpanelValue[keyName].splice(index, 1)
    const newElem: any[] = []
    newpanelValue[keyName].forEach((value: any) => {
      const props = {
        event: value.event,
      }
      props[value.listenerType] = value.value
      newElem.push(props)
    })
    newpanelValue[keyName] = [...newpanelValue[keyName]]
    setExtensionElements(newElem, key)
    setForm(newpanelValue)
  }

  // 增加任务监听
  const onListenerFinish = (listenerObj: any, index: number | null, isTaskEvent: boolean) => {
    const newpanelValue = { ...panelValue }
    let key: string
    let keyName: string
    if (isTaskEvent) {
      keyName = 'taskListener'
      key = 'activiti:TaskListener'
    } else {
      keyName = 'executionListener'
      key = 'activiti:ExecutionListener'
    }
    if (index !== null && index !== undefined) {
      newpanelValue[keyName][index] = listenerObj
    } else {
      newpanelValue[keyName].push(listenerObj)
    }
    const newElem: any[] = []
    newpanelValue[keyName].forEach((value: any) => {
      const props = {
        event: value.event,
      }
      props[value.listenerType] = value.value
      newElem.push(props)
    })
    newpanelValue[keyName] = [...newpanelValue[keyName]]
    setExtensionElements(newElem, key)
    setForm(newpanelValue)
    setInitListenerModal({ visible: false })
  }

  // 节点位置
  const resizeShape = (properties: any) => {
    const modeling = bpmnModeler.get('modeling')
    const shape = element || rootElement
    const bounds = {
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
      ...properties,
    }
    modeling.resizeShape(element || rootElement, bounds)
  }

  // 条件分支设置
  const updateConditionExpression = (value: string) => {
    if (!element) return
    const { businessObject } = element
    const bpmnFactory = bpmnModeler.get('bpmnFactory')
    const conditionOrConditionExpression = elementHelper.createElement(
      'bpmn:FormalExpression',
      {
        body: value,
      },
      businessObject,
      bpmnFactory,
    )

    const command = cmdHelper.updateBusinessObject(element, businessObject, {
      conditionExpression: conditionOrConditionExpression,
    })
    executeCommand(command)
  }
  // 多实例类型变化
  const handleMultiInstance = (val: string) => {
    if (!element) return
    const { businessObject } = element
    let loopCharacteristics = businessObject.get('loopCharacteristics')
    if (val === '') {
      loopCharacteristics = undefined
    } else {
      if (!loopCharacteristics) {
        const moddle = bpmnModeler.get('moddle')
        loopCharacteristics = moddle.create('bpmn:MultiInstanceLoopCharacteristics')
      }
      if (val === 'Sequential') {
        loopCharacteristics.isSequential = true
      } else {
        delete loopCharacteristics.isSequential
      }
    }
    updateProperties({
      loopCharacteristics,
    })
    if (userTask.assigneeType === '3') {
      let candidateUsers
      if (!loopCharacteristics) {
        candidateUsers = `\${_OPTIONAL_EXECUTOR_${businessObject.get('id')}}`
      } else {
        candidateUsers = `\${_OPTIONAL_EXECUTOR_SIGNER}`
      }
      setUserTaskArr({ ...userTask, candidateUsers })
      updateProperties({ candidateUsers })
    }
  }
  // 多实例属性修改
  const updateFormalExpression = (propertyName: string, newValue: string) => {
    const bpmnFactory = bpmnModeler.get('bpmnFactory')
    const currentElement = element || rootElement
    const bo = currentElement.businessObject
    const { loopCharacteristics } = bo

    const expressionProps = {}
    const props = {}
    props[propertyName] = newValue
    if (!newValue) {
      // remove formal expression
      expressionProps[propertyName] = undefined
      executeCommand(
        cmdHelper.updateBusinessObject(currentElement, loopCharacteristics, expressionProps),
      )
      return
    }
    const existingExpression = loopCharacteristics.get(propertyName)
    if (!existingExpression) {
      // add formal expression
      expressionProps[propertyName] = elementHelper.createElement(
        'bpmn:FormalExpression',
        { body: newValue },
        bo,
        bpmnFactory,
      )
      executeCommand(
        cmdHelper.updateBusinessObject(currentElement, loopCharacteristics, expressionProps),
      )
      return
    }

    // edit existing formal expression
    executeCommand(
      cmdHelper.updateBusinessObject(currentElement, existingExpression, {
        body: newValue,
      }),
    )
  }
  // 多实例属性修改
  const updateMultiInstanceProperty = (propertyName: string, value: string) => {
    const type = `activiti:${propertyName}`
    const bo = element.businessObject
    const { loopCharacteristics } = bo
    const pros = {}
    pros[type] = value || undefined
    executeCommand(cmdHelper.updateBusinessObject(element, loopCharacteristics, pros))
    const props = {}
    props[propertyName] = value
  }

  // form表单值变化
  const changeFormValue = (changedValues: any) => {
    console.log('formchange', changedValues)
    const keyArr = Object.keys(changedValues)
    keyArr.forEach((item) => {
      // 直接属性修改
      if (
        item === 'id' ||
        item === 'name' ||
        item === 'taskPriority' ||
        item === 'jobPriority' ||
        item === 'historyTimeToLive' ||
        item === 'candidateGroups' ||
        item === 'formKey'
      ) {
        if (item === 'id' && !changedValues[item]) {
          return false
        }
        updateProperties({ [item]: changedValues[item] })
        //  id的话修改去动态修改id的值
        if (item === 'id' && userTask.assigneeType === '3') {
          // 设置成了上级节点指定
          // 多实例和单实例不同值
          const { businessObject } = element
          const loopCharacteristics = businessObject.get('loopCharacteristics')
          let candidateUsers
          if (!loopCharacteristics) {
            candidateUsers = `\${_OPTIONAL_EXECUTOR_${businessObject.get('id')}}`
            setUserTaskArr({ ...userTask, candidateUsers })
            updateProperties({ candidateUsers })
          }
        }
      } else if (item === 'width' || item === 'height') {
        resizeShape({ [item]: changedValues[item] > 10 ? Number(changedValues[item]) : 10 })
      } else if (item === 'assigneeType') {
        // 处理人类型
        // handleChangeAssignee(changedValues[item])
      } else if (item === 'isSequential') {
        // 多实例类型
        handleMultiInstance(changedValues[item])
      } else if (item === 'optionalExecutor') {
        // 是否指定下节点处理人
        // setOptionalExecutor(changedValues[item])
      } else if (item === 'loopCardinality' || item === 'completionCondition') {
        updateFormalExpression(item, changedValues[item])
      } else if (item === 'collection' || item === 'elementVariable') {
        updateMultiInstanceProperty(item, changedValues[item])
      } else if (item === 'conditionExpression') {
        //  条件分支设置
        updateConditionExpression(changedValues[item])
      } else if (item === 'targetNamespace') {
        // 命名空间
        // updateDefinitions(changedValues[item])
      } else if (item === 'busNodeType') {
        const select: any[] = [
          {
            name: changedValues[item] ? changedValues[item].label : '',
            code: changedValues[item] ? changedValues[item].value : '',
          },
        ]
        setExtensionElements(select, 'activiti:BusNodeType')
      } else if (item === 'delegateExpressionType' || item === 'delegateExpressionValue') {
        let name = ''
        let value = ''
        Reflect.deleteProperty(element.businessObject, 'expression')
        Reflect.deleteProperty(element.businessObject, 'class')
        Reflect.deleteProperty(element.businessObject, 'delegateExpression')
        if (item === 'delegateExpressionType') {
          name = changedValues[item]
          value = panelValue.delegateExpressionValue
        }
        if (item === 'delegateExpressionValue') {
          value = changedValues[item]
          name = panelValue.delegateExpressionType
        }
        updateProperties({ [name]: value })
      }
      if (item === 'candidateGroups') {
        setUserTask({ ...userTask, [item]: changedValues[item] })
      }
      if (item === 'formKey') {
        setUserTaskArr({
          ...userTask,
          formKey: changedValues[item],
        })
      }
      if (item === 'recipientGroups') {
        updateProperties({ 'activiti:recipientGroups': changedValues[item] })
      }
      if (item === 'recipientGroups') {
        // 抄送人
        setRecipientTaskArr({ ...recipientTask, [item]: changedValues[item] })
      } else {
        setForm({ ...panelValue, [item]: changedValues[item] })
      }
      return true
    })
  }

  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ ...panelValue, ...userTask, ...recipientTask }}
        onValuesChange={changeFormValue}
        style={{ height: '100%' }}
      >
        <Collapse
          defaultActiveKey={['1']}
          expandIconPosition="right"
          style={{ width: 400, overflow: 'auto', height: '100%' }}
        >
          <Panel header="基本设置" key="1">
            <Form.Item label="定义key" name="id">
              <Input placeholder="请输入key" />
            </Form.Item>
            <Form.Item label="名称" name="name">
              <Input placeholder="请输入名称" />
            </Form.Item>
            {isRootElement && (
              <>
                {/* <Form.Item label="命名空间" name="targetNamespace">
                  <Input placeholder="请输入命名空间" />
                </Form.Item> */}
                <Form.Item label="任务级别" name="taskPriority">
                  <Input placeholder="请输入任务级别" />
                </Form.Item>
                <Form.Item label="工作级别" name="jobPriority">
                  <Input placeholder="请输入工作级别" />
                </Form.Item>
                <Form.Item label="保留时间" name="historyTimeToLive">
                  <Input placeholder="请输入保留时间" />
                </Form.Item>
              </>
            )}
            {isServiceTask && (
              <>
                <Form.Item label="执行类型" name="delegateExpressionType">
                  <Select
                    options={[
                      { value: 'class', label: '类' },
                      { value: 'expression', label: '表达式' },
                      { value: 'delegateExpression', label: '代理表达式' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="执行值" name="delegateExpressionValue">
                  <Input placeholder="请输入执行值" />
                </Form.Item>
              </>
            )}
            {isTask && (
              <>
                <Form.Item label="宽度" name="width">
                  <Input placeholder="请输入宽度" />
                </Form.Item>
                <Form.Item label="高度" name="height">
                  <Input placeholder="请输入高度" />
                </Form.Item>
              </>
            )}
            {/* {isUserTask && (
              <Form.Item
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 10 }}
                label="指定下节点处理人"
                name="optionalExecutor"
              >
                <Select>
                  <Select.Option value="">否</Select.Option>
                  <Select.Option value="true">是</Select.Option>
                </Select>
              </Form.Item>
            )} */}
          </Panel>

          {/* 处理人设置 */}
          {isUserTask && (
            <Panel header="处理人设置" key="2">
              <HandleUser handleAssignee={selectAgent} />
            </Panel>
          )}
          {/* 抄送人设置 */}
          {isUserTask && (
            <Panel header="抄送人设置" key="10">
              <HandleRecepient handleAssignee={selectAgent} />
            </Panel>
          )}

          {isTask && (
            <Panel header="表单设置" key="3">
              <Form.Item label="表单" name="formKey">
                {/* <DictSelect authorword="process_form" /> */}
                <Input placeholder="请输入表单" />
              </Form.Item>
            </Panel>
          )}

          {isUserTask && (
            <>
              <Panel header="按钮配置" key="4">
                <Button type="primary" onClick={addButton}>
                  选择
                </Button>
                {panelValue.button.length > 0 && (
                  <Table
                    columns={[
                      {
                        title: '名称',
                        dataIndex: 'name',
                        key: 'name',
                      },
                      {
                        title: '操作',
                        key: 'code',
                        render: (_text, record) => (
                          <Space size="middle">
                            <a onClick={() => deleteBT(record)}>删除</a>
                          </Space>
                        ),
                      },
                    ]}
                    rowKey="code"
                    dataSource={panelValue.button}
                    pagination={false}
                    bordered
                    style={{ marginTop: 10 }}
                  />
                )}
              </Panel>
              <Panel header="多实例配置" key="5">
                <Form.Item label="类型" name="isSequential">
                  <Select
                    placeholder="请选择多实例类型"
                    options={[
                      {
                        label: '多人顺序',
                        value: 'Parallel',
                      },
                      {
                        label: '多人并行',
                        value: 'Sequential',
                      },
                    ]}
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  wrapperCol={{ span: 24 }}
                  shouldUpdate={(prevValues, curValues) =>
                    prevValues.isSequential !== curValues.isSequential
                  }
                  noStyle
                >
                  {({ getFieldValue }) => {
                    return getFieldValue('isSequential') ? (
                      <>
                        <Form.Item
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 16 }}
                          label="循环基数"
                          name="loopCardinality"
                        >
                          <Input placeholder="请输入循环基数" />
                        </Form.Item>
                        <Form.Item
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 16 }}
                          label="集合"
                          name="collection"
                        >
                          <Input placeholder="请输入集合" />
                        </Form.Item>
                        <Form.Item
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 16 }}
                          label="元素变量"
                          name="elementVariable"
                        >
                          <Input placeholder="请输入元素变量" />
                        </Form.Item>
                        <Form.Item
                          labelCol={{ span: 6 }}
                          wrapperCol={{ span: 16 }}
                          label="完成条件"
                          name="completionCondition"
                        >
                          <Input placeholder="请输入完成条件" />
                        </Form.Item>
                      </>
                    ) : null
                  }}
                </Form.Item>
              </Panel>
            </>
          )}

          {isSequenceFlow && (
            <Panel header="流转条件" key="6">
              <Form.Item label="表达式" name="conditionExpression">
                <Input placeholder="请输入表达式" />
              </Form.Item>
            </Panel>
          )}

          {!isGateway && (
            <Panel header="执行监听" key="7">
              <Button
                type="primary"
                onClick={() => {
                  addListeners(false)
                }}
              >
                添加
              </Button>
              {panelValue?.executionListener.length > 0 && (
                <Table
                  rowKey={(_record, index = 0) => index}
                  columns={[
                    {
                      title: '事件',
                      dataIndex: 'event',
                      key: 'event',
                      width: 50,
                    },
                    {
                      title: '类型',
                      dataIndex: 'listenerTypeName',
                      key: 'listenerTypeName',
                      width: 100,
                    },
                    {
                      title: '值',
                      dataIndex: 'value',
                      key: 'value',
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: (text: any, record: any, index: number) => (
                        <div>
                          <a
                            style={{ marginRight: 10 }}
                            onClick={() => {
                              editListeners(false, record, index)
                            }}
                          >
                            编辑
                          </a>
                          <a
                            onClick={() => {
                              deleteListener(index, false)
                            }}
                          >
                            删除
                          </a>
                        </div>
                      ),
                      width: 80,
                    },
                  ]}
                  dataSource={panelValue.executionListener}
                  pagination={false}
                  bordered
                  style={{ marginTop: 10 }}
                />
              )}
            </Panel>
          )}
          {isUserTask && (
            <Panel header="任务监听" key="8">
              <Button
                type="primary"
                onClick={() => {
                  addListeners(true)
                }}
              >
                添加
              </Button>
              {panelValue.taskListener.length > 0 && (
                <Table
                  rowKey={(_record, index = 0) => index}
                  columns={[
                    {
                      title: '事件',
                      dataIndex: 'event',
                      key: 'event',
                      width: 50,
                    },
                    {
                      title: '类型',
                      dataIndex: 'listenerTypeName',
                      key: 'listenerTypeName',
                      width: 100,
                    },
                    {
                      title: '值',
                      dataIndex: 'value',
                      key: 'value',
                    },
                    {
                      title: '操作',
                      key: 'action',
                      render: (text: any, record: any, index: number) => (
                        <div>
                          <a
                            style={{ marginRight: 10 }}
                            onClick={() => {
                              editListeners(true, record, index)
                            }}
                          >
                            编辑
                          </a>
                          <a
                            onClick={() => {
                              deleteListener(index, true)
                            }}
                          >
                            删除
                          </a>
                        </div>
                      ),
                      width: 80,
                    },
                  ]}
                  dataSource={panelValue.taskListener}
                  pagination={false}
                  bordered
                  style={{ marginTop: 10 }}
                />
              )}
            </Panel>
          )}
          {isTask && (
            <Panel header="业务节点类型" key="9">
              <Form.Item label="类型" name="busNodeType">
                <DictSelect labelInValue authorword="process_bussiness_type" />
              </Form.Item>
            </Panel>
          )}
        </Collapse>
      </Form>

      {/* 选择用户 */}
      <AddUserModal
        userKey={userKey}
        onFinish={onUserFinish}
        toggleModal={() => {
          setInitUserModal({ visible: false })
        }}
        {...initUserModal}
      />

      {/* 增加按钮 */}
      <AddBtnForm
        handleSubmit={onBtFinish}
        handleCancel={() => {
          setInitBtModal({ visible: false })
        }}
        {...initBtModal}
      />

      {/* 任务监听 */}
      <FlowListener
        onFinish={onListenerFinish}
        toggleModal={() => {
          setInitListenerModal({ visible: false })
        }}
        {...initListenerModal}
      />
    </>
  )
}

export default PropertyPanel
