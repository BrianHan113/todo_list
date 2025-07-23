import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const AgeCounter = ({ user }) => {
  const [age, setAge] = useState("");

  useGSAP(() => {
    gsap.fromTo(
      ".age-line",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.4, duration: 1, ease: "power2.inOut" }
    );
  });


  useEffect(() => {
    if (!user) return;

    const updateAge = () => {
      const time =
        (Date.now() - new Date(user.dob)) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(time.toString().substring(0, 12));
    };

    const interval = setInterval(updateAge, 50);

    return () => clearInterval(interval);
  }, [user]);

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