import AgeCounter from '../components/AgeCounter.jsx'
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import { useUser } from "../hooks/useUser";
import { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks.js';
import { useAuth } from '../hooks/useAuth.js';


const MainApp = () => {
  const navigate = useNavigate();
  const { fetchUser } = useUser();
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { getUserTasks } = useTasks();
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);


  const handleLogOut = () => {
    logout();
    navigate('/');
  }

  useEffect(() => {
    const runUserFetch = async () => {
      try {
        const user = await fetchUser();
        console.log("Fetched user:", user);
        if (!user) {
          console.log("No user, redirecting to login");
          navigate('/');
          return;
        }
        setUserData(user);
      } catch (err) {
        console.log("User fetch failed:", err);
        navigate('/');
      } finally {
        setLoadingUser(false);
      }
    };

    const runTasksFetch = async () => {
      try {
        const userTasks = await getUserTasks();
        console.log("Fetched tasks:", userTasks);
        if (!userTasks) {
          console.log("No tasks, redirecting to login");
          navigate('/');
          return;
        }
        setTasks(userTasks);
      } catch (err) {
        console.log("Tasks fetch failed:", err);
        navigate('/');
      } finally {
        setLoadingTasks(false);
      }
    };

    runUserFetch();
    runTasksFetch();
  }, []);

  if (loadingUser || loadingTasks) {
    return <div>Loading...</div>;
  }

  if (!userData || !tasks) {
    navigate('/');
  }

  return (

    <div className="flex flex-col w-[100vw] h-[100svh] items-center bg-amber-600" >
      <AgeCounter user={userData} />

      <div className="bg-white w-[90%] md:w-[50%] px-5 rounded overflow-y-auto max-h-[75vh] md:max-h-[85vh]">

        <TaskForm tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />

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