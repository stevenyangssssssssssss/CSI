import type { DragEndEvent } from '@dnd-kit/core';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { Flex, Space, Tag, Typography } from 'antd';
import React from 'react';

interface Item {
  id: number;
  text: string;
}

interface DraggableTagProps {
  tag: Item;
}

const commonStyle: React.CSSProperties = {
  cursor: 'move',
  transition: 'unset', // Prevent element from shaking after drag
};

const DraggableTag: React.FC<DraggableTagProps> = (props) => {
  const { tag } = props;
  const { listeners, transform, transition, isDragging, setNodeRef } =
    useSortable({ id: tag.id });

  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;

  return (
    <Tag style={style} ref={setNodeRef} {...listeners}>
      {tag.text}
    </Tag>
  );
};

export default (props: any) => {
  const { items, setItems } = props;

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      setItems((data: any) => {
        const oldIndex = data.findIndex((item: any) => item.id === active.id);
        const newIndex = data.findIndex((item: any) => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };

  return (
    <Space>
      <Typography.Text>Drag Sort :</Typography.Text>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <Flex gap="4px 0" wrap>
            {items.map((item: any) => (
              <DraggableTag tag={item} key={item.id} />
            ))}
          </Flex>
        </SortableContext>
      </DndContext>
    </Space>
  );
};
