import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { NotepadModel } from "../assets/models/NotepadModel.jsx";
import Tooltip from "../components/ToolTip.jsx";
import SignUpModal from "../components/SignUpModal.jsx"
import LoginForm from "../components/LoginForm.jsx";


const LandingPage = () => {

  const words = ["Get", "It", "Done."];
  const description = "Appointments, emails, taxes, groceries, laundry, bills, whatever. Write it down so you can get it done.";


  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 }, /* From */
      { y: 0, opacity: 1, stagger: 0.6, duration: 1, ease: "power2.inOut" } /* To */
    );
  });

  const onRegisterClick = () => {

  }

  return (
    <section id="hero">
      <div className="flex flex-col md:flex-row fixed inset-0 bg-yellow-500 items-center justify-center">

        {/* LEFT: 3D model */}
        <div className="w-full h-[50vh] md:w-[65vw] md:h-[100vh]" >
          <figure className="w-full h-full">
            <Canvas
              className="w-full h-full"
              camera={{ position: [-7, 7, 12], fov: 0.8 }}
            >
              <OrbitControls
                target={[0, -0.05, 0.005]}
                rotateSpeed={1.5}
                enableZoom={true}
              />
              <group rotation={[Math.PI / 2, 0, 0]}>
                <NotepadModel />
              </group>
              <ambientLight intensity={100} />
            </Canvas>
          </figure>
        </div>

        {/* RIGHT: Hero Text and Sign In box */}
        <div className="w-full h-[50vh] md:w-[35vw] md:h-[100vh] bg-amber-600 overflow-y-auto" >
          <div className="flex flex-row md:flex-col justify-center items-center md:h-[100vh]">
            <div className="mr-5 text-5xl md:text-7xl lg:text-9xl font-bold text-white select-none hero-text">
              {words.map((word, i) => (
                <h1 key={i}>{word}</h1>
              ))}
            </div>
            <div className="w-1/2 md:w-full max-w-[80%] font-bold text-white mt-10 select-none">
              <LoginForm />
            </div>

            <div className="hidden md:block font-bold text-white ">
              <SignUpModal onTrigger={onRegisterClick} />
              <p className="mt-2 text-sm text-center text-white select-none">
                <Tooltip text="Get What Done?" tooltipText={description} y_translate={-350} />
              </p>
            </div>
          </div>
          <div className="block md:hidden font-bold text-white ">
            <SignUpModal onTrigger={onRegisterClick} />
            <p className="mt-2 text-sm text-center text-white select-none">
              <Tooltip text="Get What Done?" tooltipText={description} y_translate={-350} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage