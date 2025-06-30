import AgeCounter from '../components/AgeCounter.jsx'

const MainApp = () => {
  return (

    <div className="flex flex-col w-[100vw] h-[100vh] items-center bg-yellow-500">
      <h1 className="text-3xl text-white select-none font-bold p-4">
        You Are <AgeCounter UTCString="2005-01-11T12:00" /> Years Old
      </h1>

      <div className="flex flex-col h-[85vh] items-center bg-white">
        <form className="flex flex-col space-y-1 w-full">
          <input
            type="text"
            placeholder="Username"
            autoFocus={typeof window !== 'undefined' && window.innerWidth >= 768}
            className="p-3 border rounded-md focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-md focus:outline-none"
          />
        </form>
      </div>
    </div>


  );
}

export default MainApp