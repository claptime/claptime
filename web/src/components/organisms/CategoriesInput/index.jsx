import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, List, Popover, Tooltip, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { gql } from '@apollo/client';
import update from 'immutability-helper';

import { listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt } from 'claptime/graphql/collections';
import { useApolloClient } from 'claptime/lib/apollo';
import PropTypes from 'claptime/lib/prop-types';
import CategoryAddForm from './CategoryAddForm';
import CategoryDraggableRow from './CategoryDraggableRow';

const CategoriesInput = ({
  collectionId,
  editable,
  onChange,
  value: valueFromProps,
}) => {
  const [showAddCategoryPopover, setShowAddCategoryPopover] = useState(false);
  const [value, setValue] = useState(valueFromProps || []);
  const [deleting, setDeleting] = useState(false);
  const apolloClient = useApolloClient();
  const { t } = useTranslation();

  useEffect(() => setValue(valueFromProps), [valueFromProps]);

  const addCategory = (category) => {
    if (onChange) {
      onChange([...value, category]);
      setShowAddCategoryPopover(false);
    }
  };

  const categoryHasVideoNodes = async (category) => {
    const {
      data: {
        listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt: {
          items,
        },
      },
    } = await apolloClient.query({
      query: gql(
        listCollectionVideoNodesByCollectionAndCategorySortByCreatedAt,
      ),
      variables: {
        collectionVideoNodeCollectionId: collectionId,
        categoryIdCreatedAt: {
          beginsWith: {
            categoryId: category.id,
          },
        },
        limit: 1,
      },
    });
    return items.length === 1;
  };

  const deleteCategory = async (category) => {
    if (onChange) {
      setDeleting(true);
      if (await categoryHasVideoNodes(category)) {
        message.error(t('collection.edit.categoriesDeleteMustBeEmpty'));
      } else {
        onChange(value.filter((cur) => cur.id !== category.id));
      }
      setDeleting(false);
    }
  };

  const moveItem = useCallback(
    (dragIndex, hoverIndex) =>
      onChange(
        update(value, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, value[dragIndex]],
          ],
        }),
      ),
    [value, onChange],
  );

  return (
    <List
      dataSource={value}
      renderItem={(category, i) => (
        <CategoryDraggableRow
          index={i}
          category={category}
          editable={editable}
          disabled={deleting}
          onDelete={() => deleteCategory(category)}
          onMove={moveItem}
          key={`category-${category.id}`}
        />
      )}
      footer={
        editable ? (
          <div style={{ padding: 8 }}>
            <Popover
              content={<CategoryAddForm onCategoryAdded={addCategory} />}
              trigger="click"
              title={t('collection.edit.categoriesAddTitle')}
              visible={showAddCategoryPopover}
              onVisibleChange={() =>
                setShowAddCategoryPopover((previousValue) => !previousValue)
              }
            >
              <Tooltip
                title={t('collection.edit.categoriesAddTitle')}
                placement="right"
              >
                <Button shape="circle" icon={<PlusOutlined />} />
              </Tooltip>
            </Popover>
          </div>
        ) : null
      }
      locale={{ emptyText: t('collection.edit.categoriesEmpty') }}
    />
  );
};

CategoriesInput.propTypes = {
  collectionId: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.arrayOf(PropTypes.claptime.collectionCategory),
};

CategoriesInput.defaultProps = {
  editable: false,
  onChange: () => {},
};

export default CategoriesInput;
