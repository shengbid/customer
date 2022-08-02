import React, { useState, useEffect } from 'react'
import { useIntl } from 'umi'
import DictSelect from '@/components/ComSelect'
import { idReg, numToThousandReg, thousandToNumReg } from '@/utils/reg'
import { Form, Input, Row, Col, Button, message, InputNumber, Radio } from 'antd'
import ComUpload from '@/components/ComUpload'
import UploadImage from '@/components/ComUpload/uploadImage'
import { editCompanyPeople } from '@/services'
import { isEmpty } from 'lodash'
import PhoneInput from '@/components/Input/phoneInput'

interface reralProps {
  handleCancel: () => void
  info: any
}
// 实控人信息
const RealPersonInfo: React.FC<reralProps> = ({ handleCancel, info }) => {
  const intl = useIntl()
  const [idType, setIdTyp] = useState<string>('xgsfz')
  const [form] = Form.useForm()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  useEffect(() => {
    console.log(info)
    form.setFieldsValue(info)
    setIdTyp(info.identityType)
  }, [])

  // 修改
  const handleOk = async (values: any) => {
    values.frontFileName = values.idFront[0].fileName
    values.frontFileUrl = values.idFront[0].fileUrl
    values.pictureDomain = values.idFront[0].pictureDomain
    if (!isEmpty(values.idReverse)) {
      values.backFileName = values.idReverse[0].fileName
      values.backFileUrl = values.idReverse[0].fileUrl
    }
    values.spouseCreditReport = JSON.stringify(values.spouseCreditReport)
    values.houseLicense = JSON.stringify(values.houseLicense)
    values.driveLicense = JSON.stringify(values.driveLicense)
    await editCompanyPeople(values)
    setConfirmLoading(false)
    handleCancel()
    message.success('修改成功')
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
      <Form.Item label="id" name="id" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Row gutter={gutter}>
        <Col span={12}>
          <Form.Item
            name="legalFlag"
            label={intl.formatMessage({
              id: 'credit.apply.legalFlag',
            })}
            rules={[
              {
                required: true,
                message: `${intl.formatMessage({
                  id: 'pages.form.select',
                })}${intl.formatMessage({
                  id: 'credit.apply.legalFlag',
                })}`,
              },
            ]}
          >
            <Radio.Group>
              <Radio value={'yes'}>
                {intl.formatMessage({
                  id: 'pages.form.yes',
                })}
              </Radio>
              <Radio value={'no'}>
                {intl.formatMessage({
                  id: 'pages.form.no',
                })}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
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
              idReg[idType],
            ]}
          >
            <Input maxLength={18} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={gutter}>
        <Col span={8}>
          <PhoneInput initType={info.phoneArea} />
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
            <InputNumber
              maxLength={6}
              min={0}
              max={999.99}
              formatter={(vals: any) => numToThousandReg(vals)}
              parser={(vals: any) => thousandToNumReg(vals)}
              style={{ width: '100%' }}
            />
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
