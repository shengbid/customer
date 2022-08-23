import React, { useState, useEffect } from 'react'
import { Button, Form, message, Spin } from 'antd'
import ComInputNumber from '@/components/Input/InputNumber'
import ComCard from '@/components/ComPage'
import styles from './index.less'

interface infoProps {
  type?: number
  enterpriseId?: number
}

// 押品质押规则配置
const CollateralRules: React.FC<infoProps> = (props: any) => {
  const [spinning, setSpinning] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const { type } = props

  useEffect(() => {
    setSpinning(false)
  }, [])

  const handleOk = (values: any) => {
    console.log(values)
    setConfirmLoading(false)
    message.success('配置成功!')
  }

  return (
    <div className={styles.container}>
      {type === 1 ? (
        <div className={styles.tip}>
          <p>本页面的押品质押规则为系统默认规则。</p>
          <p>
            运营或风控人员可以在「客户管理-押品质押规则」页面修改针对某个用户的质押规则，修改后将以客户当期的规则计算押品估值。
          </p>
        </div>
      ) : null}
      <Spin spinning={spinning}>
        <Form
          name="basic"
          initialValues={{ signtype: 1 }}
          onFinish={handleOk}
          form={form}
          autoComplete="off"
        >
          <ComCard title="应收账款质押规则配置">
            <div style={{ width: '40%' }}>
              <Form.Item
                label="应收账款质押折扣率"
                name="rate"
                rules={[
                  {
                    required: true,
                    message: `请输入折扣率`,
                  },
                ]}
              >
                <ComInputNumber max={100} addonAfter="%" />
              </Form.Item>
            </div>
            <div className="tipcontent">注：应收账款最终价值=应收账款总额 * 当前应收账款折扣率</div>
          </ComCard>

          <ComCard title="存货质押规则配置">
            <div className="tipcontent">商品最终价值=该商品的公允价 * 当前商品效期折扣率</div>

            <div className={styles.ruleline}>
              <span className={styles.text}>1、商品剩余有效天数≥商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate11"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}>，则商品效期折扣率为</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate12"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
            </div>

            <div className={styles.ruleline}>
              <span className={styles.text}>2、商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate21"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}> ＜ 商品剩余有效天数 ＜ 商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate22"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}>，则商品效期折扣率为</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate23"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
            </div>

            <div className={styles.ruleline}>
              <span className={styles.text}>3、商品剩余有效天数 ≤ 商品整体有效期的</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate31"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
              <span className={styles.text}>，则商品效期折扣率为</span>
              <div className={styles.rate}>
                <Form.Item
                  name="rate32"
                  rules={[
                    {
                      required: true,
                      message: `请输入折扣率`,
                    },
                  ]}
                >
                  <ComInputNumber max={100} addonAfter="%" />
                </Form.Item>
              </div>
            </div>
          </ComCard>

          <div className="middle-btns" style={{ marginTop: 30 }}>
            <Button type="primary" htmlType="submit" loading={confirmLoading}>
              提交
            </Button>
          </div>
        </Form>
      </Spin>
    </div>
  )
}

export default CollateralRules
