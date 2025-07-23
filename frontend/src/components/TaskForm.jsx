import { useRef, useState } from 'react';

const TaskForm = () => {
  const descRef = useRef(null);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const addTask = () => {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
    setNewTask("");
    setNewDesc("");
    descRef.current.style.height = 'auto';
  };

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  }

  const handleDescInputChange = (event) => {
    setNewDesc(event.target.value);
  }

  return (
    <form
      className="flex sticky top-0 z-10 bg-white pt-5 pb-5"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Enter a task..."
          autoFocus={typeof window !== 'undefined' && window.innerWidth >= 768}
          value={newTask}
          onChange={handleTaskInputChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
        <textarea
          ref={descRef}
          rows={1}
          placeholder="Description (Optional)"
          value={newDesc}
          onChange={handleDescInputChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <button
        type="submit"
        className="ml-4 px-3 py-6.5 bg-yellow-500 hover:bg-orange-400 text-white rounded h-full cursor-pointer duration-150 ease-in-out"
      >
        <svg width="25px" height="25px" viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" strokeWidth="0.00048000000000000007">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>send-solid</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="invisible_box" data-name="invisible box">
                <rect width="48" height="48" fill="none"></rect>
              </g>
              <g id="icons_Q2" data-name="icons Q2">
                <path d="M44.9,23.2l-38-18L6,5A2,2,0,0,0,4,7L9.3,23H24a2.1,2.1,0,0,1,2,2,2,2,0,0,1-2,2H9.3L4,43a2,2,0,0,0,2,2l.9-.2,38-18A2,2,0,0,0,44.9,23.2Z"></path>
              </g>
            </g>
          </g>
        </svg>
      </button>
    </form>
  );
};

export default TaskForm;