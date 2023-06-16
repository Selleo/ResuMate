import  { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function KanbanBoard() {
  const [columns, setColumns] = useState({
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3']
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4']
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5']
    }
  });

  const [tasks, setTasks] = useState({
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
    'task-4': { id: 'task-4', content: 'Task 4' },
    'task-5': { id: 'task-5', content: 'Task 5' }
  });

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      setColumns(prevState => ({
        ...prevState,
        [newColumn.id]: newColumn
      }));
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      setColumns(prevState => ({
        ...prevState,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.values(columns).map(column => (
        <Droppable droppableId={column.id} key={column.id}>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <h2>{column.title}</h2>
              {column.taskIds.map((taskId, index) => {
                const task = tasks[taskId];
                return (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {provided => (

                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default KanbanBoard;
