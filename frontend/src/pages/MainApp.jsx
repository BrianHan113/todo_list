import AgeCounter from '../components/AgeCounter.jsx'
import { useState, useEffect, useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SortableTask from '../components/SortableTask.jsx';
import { useNavigate } from 'react-router-dom';


import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { restrictToVerticalAxis, restrictToParentElement } from '@dnd-kit/modifiers';

// TODO:
// Use actual ID per task as the key when connecting to backend later

const MainApp = () => {
  const navigate = useNavigate();
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((_, i) => i === active.id);
        const newIndex = tasks.findIndex((_, i) => i === over.id);
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  }

  function handleLogOut() {
    console.log("log out")
    navigate('/');
  }

  useGSAP(() => {
    gsap.fromTo(
      ".age-line",
      { y: 50, opacity: 0 }, /* From */
      { y: 0, opacity: 1, stagger: 0.4, duration: 1, ease: "power2.inOut" } /* To */
    );
  });

  return (
    <div className="flex flex-col w-[100vw] h-[100svh] items-center bg-amber-600" >

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
          <button type="submit" className="ml-4 px-3 py-6.5 bg-yellow-500 hover:bg-orange-400 text-white rounded h-full cursor-pointer duration-150 ease-in-out">
            <svg width="25px" height="25px" viewBox="0 0 48.00 48.00" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="0.00048000000000000007"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>send-solid</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M44.9,23.2l-38-18L6,5A2,2,0,0,0,4,7L9.3,23H24a2.1,2.1,0,0,1,2,2,2,2,0,0,1-2,2H9.3L4,43a2,2,0,0,0,2,2l.9-.2,38-18A2,2,0,0,0,44.9,23.2Z"></path> </g> </g> </g></svg>
          </button>
        </form>

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

      </div>

      <div onClick={() => handleLogOut()}>
        <p className="mt-2 mb-2 text-sm text-center text-white cursor-pointer select-none font-bold">
          Log Out
        </p>
      </div>
    </div >
  );
}

export default MainApp