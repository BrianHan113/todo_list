import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { NotepadModel } from "../assets/models/NotepadModel.jsx";
import Tooltip from "../components/ToolTip.jsx";
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
  const navigate = useNavigate();

  const words = ["Get", "It", "Done."];
  const description = "Your taxes, your groceries, that pile of laundry, those dinner plans, that marathon you wanted to run. Who cares? Write it down and Get It Done.";

  const onLoginClick = () => {
    navigate('/app');
  }

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 }, /* From */
      { y: 0, opacity: 1, stagger: 0.6, duration: 1, ease: "power2.inOut" } /* To */
    );
  });

  return (
    <section id="hero">
      <div className="fixed inset-0 bg-yellow-500 flex items-center justify-center">

        {/* LEFT: 3D model */}
        <div className="w-[65vw] h-[100vh] flex justify-center items-center" >
          <figure className="w-full h-full min-h-[50vh]">

            <Canvas
              style={{ width: '100%', height: '100%' }}
              camera={{ position: [-7, 7, 12], fov: 0.8 }}
            >

              <OrbitControls
                target={[0, -0.05, 0.005]}
                rotateSpeed={1.5}
                enableZoom={false}
              />


              <group rotation={[Math.PI / 2, 0, 0]}>

                <NotepadModel />

              </group>
              <ambientLight intensity={100} />


            </Canvas>

          </figure>
        </div>

        {/* RIGHT: Hero Text and Sign In box */}
        <div className="w-[35vw] h-[100vh] bg-amber-600 " >
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-9xl font-bold text-white select-none hero-text">
              {words.map((word, i) => (
                <h1 key={i}>{word}</h1>
              ))}
            </div>
            <div className="text-1xl font-bold text-white mt-10 select-none">
              <form className="flex flex-col space-y-4 w-[80vw] sm:w-96">
                <input
                  type="text"
                  placeholder="Username"
                  autoFocus
                  className="p-3 border rounded-md focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 border rounded-md focus:outline-none"
                />
                <button onClick={onLoginClick} type="button" className="bg-yellow-500 hover:bg-orange-400 duration-150 ease-in-out text-white font-bold py-3 rounded-md ">
                  Login
                </button>
                <p className="text-sm text-center text-white select-none">
                  Don't have an account? <a href="#" className="underline text-blue-600">Sign up</a>
                </p>
                <p className="text-sm text-center text-white select-none">
                  <Tooltip text="Get What Done?" tooltipText={description} />
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage