import React, { useState } from 'react';
import { Button, Form, Input, Select, Tooltip, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';

import PropTypes from 'claptime/lib/prop-types';

const AddStarringVideoNodeForm = ({
  listVideoNodes,
  onStarringVideoNodeAdded,
  containerId,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [labelEnabled, setLabelEnabled] = useState(false);

  const onFinish = (fieldsValue) => {
    const videoTitle = listVideoNodes
      .map((cvn) => cvn.videoNode)
      .filter((vn) => vn.id === fieldsValue.id)[0].title;
    onStarringVideoNodeAdded({
      id: null,
      label: fieldsValue.label,
      description: fieldsValue.description,
      videoNode: {
        id: fieldsValue.id,
        title: videoTitle,
      },
    });
    form.resetFields();
  };

  const handleSelectChange = (value) => {
    value !== null && setLabelEnabled(true);
    if (value === null) {
      setLabelEnabled(false);
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      id="category-add-form"
      onFinish={onFinish}
      layout="vertical"
      style={{ width: 400 }}
      initialValues={{
        id: null,
        label: null,
      }}
    >
      <Form.Item name="id" label={t('collection.edit.starringVideoNodeSelect')}>
        <Select onChange={handleSelectChange}>
          <Option key="select-starringVideoNode-null" value={null}>
            {t('collection.edit.starringVideoNodeNone')}
          </Option>
          {listVideoNodes.map((item) => {
            const {
              videoNode: { id, title },
            } = item;
            return (
              <Option key={`select-starringVideoNode-${id}`} value={id}>
                {title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="label"
        rules={[
          {
            max: 100,
            message: t('collection.edit.starringVideoNodeLabelMaxLength'),
          },
        ]}
        label={
          <span>
            {t('collection.edit.starringVideoNodeLabel')}
            &nbsp;
            <Tooltip
              getPopupContainer={() =>
                containerId
                  ? document.getElementById(containerId)
                  : document.body
              }
              title={t('collection.edit.starringVideoNodeLabelTooltip')}
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <Input disabled={!labelEnabled} />
      </Form.Item>
      <Form.Item
        name="description"
        label={
          <span>
            {t('collection.edit.starringVideoNodeDescription')}
            &nbsp;
            <Tooltip
              getPopupContainer={() =>
                containerId
                  ? document.getElementById(containerId)
                  : document.body
              }
              title={
                <i>
                  {t('collection.edit.starringVideoNodeDescriptionTooltip')}
                </i>
              }
            >
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            max: 300,
            message: t('collection.edit.starringVideoNodeDescriptionMaxLength'),
          },
        ]}
      >
        <Input.TextArea disabled={!labelEnabled} rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" form="category-add-form" htmlType="submit">
          {t('collection.edit.categoryAdd')}
        </Button>
      </Form.Item>
    </Form>
  );
};

AddStarringVideoNodeForm.propTypes = {
  onStarringVideoNodeAdded: PropTypes.func.isRequired,
};

export default AddStarringVideoNodeForm;
