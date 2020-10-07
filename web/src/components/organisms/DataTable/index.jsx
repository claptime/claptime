/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Table, Empty } from 'antd';
import styled from 'styled-components';
import Router from 'next/router';

import { useDrag, useDrop } from 'react-dnd';
import { Spin } from 'claptime/components/atoms';

import consts from 'claptime/consts';
import PropTypes from 'claptime/lib/prop-types';

const StyledTable = styled(Table)`
  .ant-table-row {
    cursor: pointer;
  }
  .optional {
    display: none;
  }
  @media ${consts.device.tablet} {
    .optional {
      display: table-cell;
    }
  }

  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff;
  }

  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff;
  }
`;

const type = 'DragableBodyRow';

const DragableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const DataTable = ({
  items,
  columns,
  getEditionLink,
  rowSelection,
  dragNDrop,
  onDragNDrop,
  disabled,
}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(items);
  }, [items]);

  if (!items.length) {
    return <Empty />;
  }

  const components = {
    body: {
      row: DragableBodyRow,
    },
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const movedItem = data.find((item, index) => index === dragIndex);
    const remainingItems = data.filter((item, index) => index !== dragIndex);

    const reorderedItems = [
      ...remainingItems.slice(0, hoverIndex),
      movedItem,
      ...remainingItems.slice(hoverIndex),
    ];

    const previousEpisodes = remainingItems.slice(0, hoverIndex);
    if (previousEpisodes.length) {
      setData(reorderedItems);
      onDragNDrop(previousEpisodes.pop().id, movedItem.id);
    }
  };

  if (data === null) return <Spin />;

  const tableProps = {
    columns: columns.map((column) => ({
      ...column,
      className: column.optional ? 'optional' : undefined,
    })),
    dataSource: data.map((item) => ({
      ...item,
      key: item.id,
    })),
    rowSelection,
  };
  if (dragNDrop) {
    tableProps.components = components;
  } else {
    tableProps.onRow = (record) => ({
      onClick: () => Router.push(getEditionLink(record)),
    });
  }

  return (
    <StyledTable
      columns={columns.map((column) => ({
        ...column,
        className: column.optional ? 'optional' : undefined,
      }))}
      dataSource={data.map((item) => ({
        ...item,
        key: item.id,
      }))}
      components={dragNDrop ? components : null}
      onRow={
        dragNDrop
          ? (record, index) => ({
              index,
              moveRow,
            })
          : (record) => ({
              onClick: () => Router.push(getEditionLink(record)),
            })
      }
      rowSelection={rowSelection}
      loading={disabled}
    />
  );
};

DataTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  getEditionLink: PropTypes.func.isRequired,
  dragNDrop: PropTypes.bool,
  onDragNDrop: PropTypes.func,
  rowSelection: PropTypes.object,
  disabled: PropTypes.bool,
};

DataTable.defaultProps = {
  rowSelection: null,
  dragNDrop: false,
  onDragNDrop: () => {},
  disabled: false,
};
export default DataTable;
