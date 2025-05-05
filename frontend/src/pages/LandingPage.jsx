import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { NotepadModel } from "../assets/models/NotepadModel.jsx";
import HeroLights from "../assets/models/HeroLights.jsx";

const LandingPage = () => {

  const words = ["Get", "It", "Done."];

  const onLoginClick = () => {
    console.log("Clicked");
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

            <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 15], fov: 45 }}>

              <directionalLight position={[5, 5, 5]} intensity={1} />
              <OrbitControls
                enablePan={true}
              // minPolarAngle={Math.PI / 5}
              // maxPolarAngle={Math.PI / 2}
              />

              {/* <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="teal" />
              </mesh> */}

              <mesh>
                <NotepadModel />
              </mesh>


              <HeroLights />

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
                <button onClick={onLoginClick} className="bg-yellow-500 text-white font-bold py-3 rounded-md">
                  Login
                </button>
                <p className="text-sm text-center text-white select-none">
                  Don't have an account? <a href="#" className="underline text-blue-600">Sign up</a>
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