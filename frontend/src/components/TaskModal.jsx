

const TaskModal = ({ task, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Close
      </button>
    </div>
  </div>
)

export default TaskModal