import AgeCounter from '../components/AgeCounter.jsx'
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';


const MainApp = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    console.log("log out")
    navigate('/');
  }

  return (
    <div className="flex flex-col w-[100vw] h-[100svh] items-center bg-amber-600" >

      <AgeCounter />

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