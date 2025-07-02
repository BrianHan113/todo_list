import AgeCounter from '../components/AgeCounter.jsx'
import { useState, useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


// TODO:
// Use dnd-kit for reordering tasks
// Logout option
// Use actual ID per task as the key when connecting to backend later

const MainApp = () => {

  const descRef = useRef(null);

  const dobString = "2005-01-11T12:00"
  const [tasks, setTasks] = useState([
    { name: "FIRST", desc: "first desc" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "dummy", desc: "testing" },
    { name: "LAST", desc: "last desc" }
  ]);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => { // Debug output
    console.log(tasks);
  }, [tasks]);

  function handleTaskInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleDescInputChange(event) {
    setNewDesc(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks(t => [{ name: newTask, desc: newDesc }, ...t]);
      setNewTask("");
      setNewDesc("");
      descRef.current.style.height = 'auto';
    }
  }

  function openModal(task) {
    console.log(task.name)
    console.log(task.desc)
  }


  function deleteTask(index) {
    setTasks(t => t.filter((_, i) => i !== index));
  }

  useGSAP(() => {
    gsap.fromTo(
      ".age-line",
      { y: 50, opacity: 0 }, /* From */
      { y: 0, opacity: 1, stagger: 0.6, duration: 1, ease: "power2.inOut" } /* To */
    );
  });

  return (
    < div className="flex flex-col w-[100vw] items-center bg-yellow-500 min-h-screen" >

      <div className="text-3xl text-white select-none font-bold p-4 text-center">
        <span className="age-line">You </span>
        <span className="age-line">Are </span>
        <span className="age-line"><AgeCounter UTCString={dobString} /></span>
        <span className="age-line"> Years </span>
        <span className="age-line"> Old.</span>
      </div>

      <div className="bg-white w-[90%] md:w-[50%] px-5 rounded overflow-y-auto max-h-[75vh] md:max-h-[85vh]">
        <form className="flex sticky top-0 z-10 bg-white pt-5 pb-5"
          onSubmit={e => {
            e.preventDefault();
            addTask();
          }}>
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
          <button type="submit" className="ml-4 px-3 py-6.5 bg-yellow-500 hover:bg-orange-400 text-white rounded h-full cursor-pointer">
            Add
          </button>
        </form>

        <ol className="space-y-2 pb-2">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="border-b pb-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => openModal(task)}
            >
              <div className="p-3 flex justify-between items-start">
                <span className="font-semibold">{task.name}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(index)
                  }}
                  className="text-red-500 hover:underline ml-4 cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div >
  );
}

export default MainApp