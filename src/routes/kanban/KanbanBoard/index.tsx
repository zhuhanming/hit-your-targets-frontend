import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import ToDo from 'interfaces/ToDo';
import { View } from 'interfaces/ViewContext';
import { useView } from 'contexts/viewContext';
import { setCompleteOrder, setIncompleteOrder } from 'reducers/ToDoDux';
import ErrorMessage from 'components/errorMessage';
import ApiService from 'services/apiService';
import KanbanPanel from './KanbanPanel';
import KanbanCreationPanel from './KanbanCreationPanel';
import KanbanPanelGhost from './KanbanPanel/KanbanPanelGhost';
import KanbanCreationPanelGhost from './KanbanCreationPanel/KanbanCreationPanelGhost';

import './KanbanBoard.scss';

interface KanbanBoardProps {
  isLoading: boolean;
  isError: boolean;
  todos: ToDo[];
  setTaskInFocus: (todo: number | null) => void;
  completeOrder: number[];
  incompleteOrder: number[];
}

const KanbanBoard: React.SFC<KanbanBoardProps> = ({
  isLoading,
  isError,
  todos,
  setTaskInFocus,
  completeOrder,
  incompleteOrder
}) => {
  const { viewSelected } = useView();
  const dispatch = useDispatch();
  if (isError) {
    return (
      <div className="kanban-board">
        <ErrorMessage />
      </div>
    );
  }
  if (isLoading) {
    return (
      <DragDropContext>
        <div className="kanban-board">
          <KanbanPanelGhost />
          <KanbanPanelGhost />
          <KanbanPanelGhost />
          <KanbanCreationPanelGhost />
          <div className="buffer">&nbsp;</div>
        </div>
      </DragDropContext>
    );
  }

  let todoOrder = viewSelected === View.ALL ? incompleteOrder : completeOrder;

  const onDragEnd = async (result): Promise<void> => {
    const { draggableId, source, destination } = result;

    const originalOrder = todoOrder;
    const newTodoOrder = Array.from(todoOrder);
    newTodoOrder.splice(source.index, 1);
    newTodoOrder.splice(destination.index, 0, parseInt(draggableId, 10));
    todoOrder = newTodoOrder;
    try {
      if (viewSelected === View.ALL) {
        const responses = await ApiService.patch('update_user', {
          incompleteOrder: newTodoOrder
        });
        dispatch(setIncompleteOrder(responses.data.incompleteOrder));
      } else {
        const responses = await ApiService.patch('update_user', {
          completeOrder: newTodoOrder
        });
        dispatch(setCompleteOrder(responses.data.completeOrder));
      }
    } catch (e) {
      toast.error(
        'Something went wrong... you might not be able to reorganise your tasks for now!'
      );
      todoOrder = originalOrder;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="kanban" type="kanban" direction="horizontal">
        {(provided, snapshot): React.ReactNode => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`kanban-board ${
              snapshot.isDraggingOver ? 'kanban-board__dragging-over' : ''
            }`}
          >
            {todoOrder.map((id, index) => {
              const todo = todos.find(t => t.id === id);
              if (todo) {
                return (
                  <KanbanPanel
                    key={id}
                    todo={todo}
                    index={index}
                    setTodoInFocus={setTaskInFocus}
                  />
                );
              }
              return <></>;
            })}
            <KanbanCreationPanel index={todoOrder.length} />
            <div className="buffer">&nbsp;</div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;
