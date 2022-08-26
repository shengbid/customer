import React, { useState, useEffect } from 'react'
import { Button, Form, message, Spin, Input } from 'antd'
import PointInput from '@/components/Input/pointInput'
import ComCard from '@/components/ComPage'
import { getRiskRuleList, editRiskRuleList } from '@/services'
import styles from './index.less'

interface infoProps {
  type?: number
  enterpriseId?: number
}

// 押品质押规则配置
const CollateralRules: React.FC<infoProps> = (props: any) => {
  const [spinning, setSpinning] = useState<boolean>(true)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [form1] = Form.useForm()
  const [form2] = Form.useForm()
  const [form3] = Form.useForm()

  const { enterpriseId } = props

  // 获取数据
  const getRuleList = async () => {
    setSpinning(true)
    const { data } = await getRiskRuleList({ enterpriseId })
    setSpinning(false)
    if (data) {
      form.setFieldsValue({ accountPledgeRate: data.accountPledgeRate })
      if (data.jxPledgeGoodRuleList && data.jxPledgeGoodRuleList.length) {
        form1.setFieldsValue(data.jxPledgeGoodRuleList[0])
        form2.setFieldsValue(data.jxPledgeGoodRuleList[1])
        form3.setFieldsValue(data.jxPledgeGoodRuleList[2])
      }
    }
  }

  useEffect(() => {
    getRuleList()
  }, [])

  const handleOk = async () => {
    await form.validateFields()
    await form1.validateFields()
    await form2.validateFields()
    await form3.validateFields()
    const data = form.getFieldsValue()
    const data1 = form1.getFieldsValue()
    const data2 = form2.getFieldsValue()
    const data3 = form3.getFieldsValue()

    const jxPledgeGoodRuleList = [data1, data2, data3]

    await editRiskRuleList({ accountPledgeRate: data.accountPledgeRate, jxPledgeGoodRuleList })
    setConfirmLoading(false)
    message.success('配置成功!')
    getRuleList()
  }

  return (
    <div className={styles.container}>
      {!enterpriseId ? (
        <div className={styles.tip}>
          <p>本页面的押品质押规则为系统默认规则。</p>
          <p>
            运营或风控人员可以在「客户管理-押品质押规则」页面修改针对某个用户的质押规则，修改后将以客户当期的规则计算押品估值。
          </p>
        </div>
      ) : null}
      <Spin spinning={spinning}>
        <Form name="basic" form={form} autoComplete="off">
          <ComCard title="应收账款质押规则配置">
            <div style={{ width: '40%' }}>
              <Form.Item
                label="应收账款质押折扣率"
                name="accountPledgeRate"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <PointInput max={100} addonAfter="%" />
              </Form.Item>
            </div>
            <div className="tipcontent">注：应收账款最终价值=应收账款总额 * 当前应收账款折扣率</div>
          </ComCard>
        </Form>

        <ComCard title="存货质押规则配置">
          <div className="tipcontent">商品最终价值=该商品的公允价 * 当前商品效期折扣率</div>
          <Form name="basic1" form={form1} autoComplete="off">
            <div className={styles.ruleline}>
              <span className={styles.text}>1、商品剩余有效天数≥商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item label="id" name="id" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="goodKeepRateStart"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}>，则商品效期折扣率为</span>
              <div className={styles.rate}>
                <Form.Item
                  name="goodEffectiveRate"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
            </div>
          </Form>
          <Form name="basic2" form={form2} autoComplete="off">
            <div className={styles.ruleline}>
              <span className={styles.text}>2、商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item label="id" name="id" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="goodKeepRateStart"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}> ＜ 商品剩余有效天数 ＜ 商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item
                  name="goodEffectiveRate"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}>，则商品效期折扣率为</span>
              <div className={styles.rate}>
                <Form.Item
                  name="goodKeepRateEnd"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
            </div>
          </Form>
          <Form name="basic3" form={form3} autoComplete="off">
            <div className={styles.ruleline}>
              <span className={styles.text}>3、商品剩余有效天数 ≤ 商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item label="id" name="id" style={{ display: 'none' }}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="goodKeepRateStart"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}>，则商品效期折扣率为</span>
              <div className={styles.rate}>
                <Form.Item
                  name="goodEffectiveRate"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <PointInput max={100} addonAfter="%" />
                </Form.Item>
              </div>
            </div>
          </Form>
        </ComCard>

        <div className="middle-btns" style={{ marginTop: 30 }}>
          <Button type="primary" onClick={handleOk} loading={confirmLoading}>
            提交
          </Button>
        </div>
      </Spin>
    </div>
  )
}

export default CollateralRules
