import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next';
import shortid from 'shortid';

import PropTypes from 'claptime/lib/prop-types';

const CategoryAddForm = ({ onCategoryAdded }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const onFinish = (fieldsValue) => {
    try {
      onCategoryAdded({
        id: shortid.generate(),
        category: fieldsValue.category,
        description: fieldsValue.description,
      });
      form.resetFields();
    } catch (err) {
      console.log(err);
      message.error(t('collection.edit.categoriesAddFailed'));
    }
  };

  return (
    <Form
      form={form}
      id="category-add-form"
      onFinish={onFinish}
      layout="vertical"
      style={{ width: 400 }}
    >
      <Form.Item
        name="category"
        rules={[
          {
            required: true,
            message: t('collection.edit.required'),
          },
          {
            max: 50,
            message: t('collection.edit.categoryNameMaxLength'),
          },
        ]}
        label={t('collection.edit.categoryName')}
      >
        <Input placeholder={t('collection.edit.categoryNamePlaceholder')} />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            max: 100,
            message: t('collection.edit.categoryDescriptionMaxLength'),
          },
        ]}
        label={t('collection.edit.categoryDescription')}
      >
        <Input
          placeholder={t('collection.edit.categoryDescriptionPlaceholder')}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" form="category-add-form" htmlType="submit">
          {t('collection.edit.categoryAdd')}
        </Button>
      </Form.Item>
    </Form>
  );
};

CategoryAddForm.propTypes = {
  onCategoryAdded: PropTypes.func.isRequired,
};

export default CategoryAddForm;
