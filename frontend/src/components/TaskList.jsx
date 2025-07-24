import { useSensors, useSensor, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import SortableTask from './SortableTask';
import { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import { useTasks } from '../hooks/useTasks';
import { arrayMove } from '@dnd-kit/sortable';

const TaskList = ({ tasks, setTasks }) => {
  const { deleteATask, getATask, updateATask, error } = useTasks();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const deleteTask = async (task_id) => {
    const success = await deleteATask(task_id)
    if (success) {
      setTasks(prev => prev.filter(task => task.task_id !== task_id));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragEnd = async ({ active, over }) => {
    if (!active || !over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(task => task.task_id === active.id);
    const newIndex = tasks.findIndex(task => task.task_id === over.id);

    // console.log(tasks[newIndex]);
    let reordered
    if (oldIndex !== -1 && newIndex !== -1) {
      reordered = arrayMove(tasks, oldIndex, newIndex);
      setTasks(reordered);
    }

    const prevTask = reordered[newIndex - 1] || null;
    const nextTask = reordered[newIndex + 1] || null;

    let prevPosition = null;
    let nextPosition = null;

    if (prevTask) {
      const realPrevTask = await getATask(prevTask.task_id)
      prevPosition = realPrevTask.position
    }

    if (nextTask) {
      const realNextTask = await getATask(nextTask.task_id)
      nextPosition = realNextTask.position
    }

    let newPosition;
    if (prevPosition != null && nextPosition != null) {
      newPosition = Math.round((prevPosition + nextPosition) / 2);
    } else if (prevPosition != null) {
      newPosition = prevPosition + 100;
    } else if (nextPosition != null) {
      newPosition = nextPosition - 100;
    } else {
      newPosition = 0; // Should never reach here but just in case
    }

    console.log("prev: ", prevPosition)
    console.log("next: ", nextPosition)
    console.log("curr: ", newPosition)

    const fields = { position: newPosition }

    updateATask(tasks[oldIndex].task_id, fields)
  };

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={tasks.map(task => task.task_id)}
          strategy={verticalListSortingStrategy}
        >
          <ol className="space-y-2 pb-2">
            {tasks.map(task => (
              <SortableTask
                key={task.task_id}
                id={task.task_id}
                task={task}
                onDelete={() => deleteTask(task.task_id)}
                onClick={() => openModal(task)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      {isModalOpen && selectedTask && (
        <TaskModal task={selectedTask} onClose={closeModal} />
      )}
    </>
  );
};

export default TaskList;
