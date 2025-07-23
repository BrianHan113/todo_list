import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const AgeCounter = () => {
  const [age, setAge] = useState("");
  const UTCString = "2005-01-11T12:00"

  useGSAP(() => {
    gsap.fromTo(
      ".age-line",
      { y: 50, opacity: 0 }, /* From */
      { y: 0, opacity: 1, stagger: 0.4, duration: 1, ease: "power2.inOut" } /* To */
    );
  });

  useEffect(() => {
    const updateAge = () => {
      const time =
        (Date.now() - new Date(UTCString)) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(time.toString().substring(0, 12));
    };

    const interval = setInterval(updateAge, 50);

    return () => clearInterval(interval); // Only run when unmounted
  }, [UTCString]);

  return (
    <div className="text-3xl text-white select-none font-bold p-4 text-center">
      <span className="age-line">You </span>
      <span className="age-line">Are </span>
      <span className="age-line">{age}</span>
      <span className="age-line"> Years </span>
      <span className="age-line"> Old.</span>
    </div>
  )


};

export default AgeCounter;