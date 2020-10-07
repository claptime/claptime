import React, { useRef } from 'react';
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, List, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDrag, useDrop } from 'react-dnd';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const CategoryDraggableRow = ({
  index,
  category,
  editable,
  disabled,
  onDelete,
  onMove,
}) => {
  const { t } = useTranslation();

  // https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_js/04-sortable/simple
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'category',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      onMove(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex; // eslint-disable-line no-param-reassign
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'category', id: category.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref}>
      <List.Item
        style={{ opacity }}
        actions={[
          editable ? (
            <Tooltip title={t('collection.edit.categoriesDelete')}>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => onDelete()}
                disabled={disabled}
              />
            </Tooltip>
          ) : null,
        ]}
      >
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <MenuOutlined
            style={{
              cursor: 'pointer',
              color: consts.style.colors.placeholder,
              marginRight: 16,
            }}
          />
          <List.Item.Meta
            title={category.category}
            description={category.description}
          />
        </div>
      </List.Item>
    </div>
  );
};

CategoryDraggableRow.propTypes = {
  index: PropTypes.number.isRequired,
  category: PropTypes.claptime.collectionCategory.isRequired,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
};

CategoryDraggableRow.defaultProps = {
  editable: false,
  disabled: false,
  onDelete: () => {},
  onMove: () => {},
};

export default CategoryDraggableRow;
