import AgeCounter from '../components/AgeCounter.jsx'
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { useUser } from "../hooks/useUser";
import { useState, useEffect } from 'react';


const MainApp = () => {
  const navigate = useNavigate();
  const { fetchUser, error } = useUser();
  const [userData, setUserData] = useState(null);

  const handleLogOut = () => {
    console.log("log out")
    navigate('/');
  }

  useEffect(() => {
    const runFetch = async () => {
      try {
        const user = await fetchUser();
        setUserData(user);

      } catch (err) {
        console.log("User fetch failed:", err);
      }
    };

    runFetch();
  }, []);

  return (
    <div className="flex flex-col w-[100vw] h-[100svh] items-center bg-amber-600" >

      <AgeCounter user={userData} />

      <div className="bg-white w-[90%] md:w-[50%] px-5 rounded overflow-y-auto max-h-[75vh] md:max-h-[85vh]">

        <TaskForm />
        <TaskList />

      </div>

      <div onClick={() => handleLogOut()}>
        <p className="mt-2 mb-2 text-lg text-center hover:underline text-white cursor-pointer select-none font-bold">
          Log Out
        </p>
      </div>

    </div >
  );
}

export default MainApp