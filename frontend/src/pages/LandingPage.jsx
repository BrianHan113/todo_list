import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingPage = () => {

  const words = ["Get", "It", "Done."];

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 }, /* From */
      { y: 0, opacity: 1, stagger: 0.8, duration: 1, ease: "power2.inOut" } /* To */
    );
  });

  return (
    <section id="hero">
      <div className="fixed inset-0 bg-yellow-500 flex items-center justify-center">
        <div className="w-[65vw] h-[100vh]" />
        <div className="w-[35vw] h-[100vh] bg-amber-600 " >
          <div className="flex flex-col justify-center items-center h-screen">
            <div className="space-y-2 text-9xl font-bold text-white hero-text">
              {words.map((word, i) => (
                <h1 key={i}>{word}</h1>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage