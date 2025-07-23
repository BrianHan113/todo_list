import { useSensors, useSensor, PointerSensor, TouchSensor } from '@dnd-kit/core';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import SortableTask from './SortableTask';
import { useState } from 'react';
import TaskModal from './TaskModal';

const TaskList = () => {

  const [tasks, setTasks] = useState([
    { name: "FIRST", desc: "first desc" },
    { name: "dummy1", desc: "testing" },
    { name: "dummy2", desc: "testing" },
    { name: "dummy3", desc: "testing" },
    { name: "dummy4", desc: "testing" },
    { name: "LAST", desc: "last desc" }
  ]);

  const [selectedTask, setSelectedTask] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)


  const openModal = (task) => {
    setSelectedTask(task)
    setIsModalOpen(true)
    console.log(task.name)
    console.log(task.desc)
  }
  const deleteTask = (index) => {
    setTasks(t => t.filter((_, i) => i !== index));
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((_, i) => i === active.id);
      const newIndex = tasks.findIndex((_, i) => i === over.id);
    }
  };

  const closeModal = () => {
    setSelectedTask(null)
    setIsModalOpen(false)
    console.log("close")
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={tasks.map((_, i) => i)} strategy={verticalListSortingStrategy}>
          <ol className="space-y-2 pb-2">
            {tasks.map((task, index) => (
              <SortableTask
                key={index}
                id={index}
                task={task}
                onDelete={() => deleteTask(index)}
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