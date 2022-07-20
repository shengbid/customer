import React, { useState } from 'react'
import { useIntl } from 'umi'
import DictSelect from '@/components/ComSelect'
import { phoneReg, idCardReg } from '@/utils/reg'
import RequiredLabel from '@/components/RequiredLabel'
import { Form, Input, Row, Col, Button } from 'antd'
import ComUpload from '@/components/ComUpload'
import UploadImage from '@/components/ComUpload/uploadImage'

interface reralProps {
  handleCancel: () => void
}
// 实控人信息
const RealPersonInfo: React.FC<reralProps> = ({ handleCancel }) => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('xgsfz')
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  // 修改
  const handleOk = (values) => {
    console.log(values)
    setConfirmLoading(false)
    handleCancel()
  }

  const gutter = 24
  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ phoneArea: '1', identity: 'qyfr' }}
      form={form}
      autoComplete="off"
      scrollToFirstError
      onFinish={handleOk}
    >
      <Form.Item label="identity" name="identity" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Row gutter={gutter}>
        <Col span={8}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              id: 'credit.apply.RealName',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'credit.apply.RealName',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="identityType"
            label={intl.formatMessage({
              id: 'credit.apply.idType',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'credit.apply.idType',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="cus_sfzlx" onChange={(val: string) => setIdTyp(val)} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="identityNumber"
            label={intl.formatMessage({
              id: 'credit.apply.idNo',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'credit.apply.idNo',
                })}`,
              },
              idCardReg,
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={8}>
          <Form.Item
            label={
              <RequiredLabel
                label={intl.formatMessage({
                  id: 'credit.apply.phone',
                })}
              />
            }
          >
            <Form.Item
              name="phoneArea"
              style={{ display: 'inline-block', marginBottom: 0, width: '30%' }}
            >
              <DictSelect authorword="phone_code" allowClear={false} />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              style={{ display: 'inline-block', marginBottom: 0, width: '70%' }}
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.input',
                  })}${intl.formatMessage({
                    id: 'credit.apply.phone',
                  })}`,
                },
                phoneReg,
              ]}
            >
              <Input maxLength={50} />
            </Form.Item>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="idFront"
            label={intl.formatMessage({
              id: 'credit.apply.idFront',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.idFront',
                })}`,
              },
            ]}
          >
            <UploadImage limit={1} />
          </Form.Item>
        </Col>
        <Col span={8}>
          {idType !== 'hz' && (
            <Form.Item
              name="idReverse"
              label={intl.formatMessage({
                id: 'credit.apply.idReverse',
              })}
              rules={[
                {
                  required: true,
                  message: `${intl.formatMessage({
                    id: 'pages.form.upload',
                  })}${intl.formatMessage({
                    id: 'credit.apply.idReverse',
                  })}`,
                },
              ]}
            >
              <UploadImage limit={1} />
            </Form.Item>
          )}
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={8}>
          <Form.Item
            name="marriageStatus"
            label={intl.formatMessage({
              id: 'credit.apply.maritalStatus',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'credit.apply.maritalStatus',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="hyqk" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="houseStatus"
            label={intl.formatMessage({
              id: 'credit.apply.addressStatus',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'credit.apply.addressStatus',
                })}`,
              },
            ]}
          >
            <DictSelect authorword="zfqk" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="workYear"
            label={intl.formatMessage({
              id: 'credit.apply.realPeriod',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.input',
                })}${intl.formatMessage({
                  id: 'credit.apply.realPeriod',
                })}`,
              },
            ]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={8}>
          <Form.Item
            name="spouseCreditReport"
            label={intl.formatMessage({
              id: 'credit.apply.realCrediReport',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.realCrediReport',
                })}`,
              },
            ]}
          >
            <ComUpload limit={1} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="houseLicense"
            label={intl.formatMessage({
              id: 'credit.apply.owerCertificate',
            })}
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.owerCertificate',
                })}`,
              },
            ]}
          >
            <ComUpload />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="driveLicense"
            label={intl.formatMessage({
              id: 'credit.apply.drivingLicense',
            })}
            rules={[
              {
                required: false,
                message: `${intl.formatMessage({
                  id: 'pages.form.upload',
                })}${intl.formatMessage({
                  id: 'credit.apply.drivingLicense',
                })}`,
              },
            ]}
          >
            <ComUpload />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="houseAddr"
        label={intl.formatMessage({
          id: 'credit.apply.address',
        })}
        wrapperCol={{
          span: 23,
        }}
        rules={[
          {
            required: true,
            message: `${intl.formatMessage({
              id: 'pages.form.input',
            })}${intl.formatMessage({
              id: 'credit.apply.address',
            })}`,
          },
        ]}
      >
        <Input maxLength={50} />
      </Form.Item>

      <div className="modal-btns">
        <Button type="primary" htmlType="submit" loading={confirmLoading}>
          {intl.formatMessage({
            id: 'pages.btn.confirm',
          })}
        </Button>
        <Button onClick={handleCancel} className="cancel-btn">
          {intl.formatMessage({
            id: 'pages.btn.cancel',
          })}
        </Button>
      </div>
    </Form>
  )
}

export default RealPersonInfo
