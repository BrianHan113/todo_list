import { useState } from "react"
import { useTasks } from "../hooks/useTasks"

const TaskModal = ({ task, onClose, tasks, setTasks }) => {
  const [name, setName] = useState(task.title)
  const [desc, setDesc] = useState(task.description)
  const { updateATask } = useTasks();

  const handleClose = () => {
    handleSave()
    onClose()
  }

  const handleSave = async () => {
    const updatedFields = {};
    if (name !== task.title) updatedFields.title = name;
    if (desc !== task.description) updatedFields.description = desc;

    if (Object.keys(updatedFields).length === 0) return;

    const updatedTask = await updateATask(task.task_id, updatedFields);

    if (updatedTask != null) {
      const updatedTasks = tasks.map(t =>
        t.task_id === task.task_id ? updatedTask.task : t
      );
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2 text-lg font-bold text-amber-700"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-700 resize-none h-36 overflow-y-auto"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2 rounded-lg transition cursor-pointer"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskModal
