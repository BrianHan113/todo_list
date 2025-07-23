import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useUser } from "../hooks/useUser";


const AgeCounter = () => {
  const { fetchUser, error } = useUser();
  const [age, setAge] = useState("");
  const [dob, setDob] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      ".age-line",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.4, duration: 1, ease: "power2.inOut" }
    );
  });

  useEffect(() => {
    const runFetch = async () => {
      try {
        const user = await fetchUser();
        setDob(user.dob);
      } catch (err) {
        console.log("User fetch failed:", err);
      }
    };

    runFetch();
  }, []);

  useEffect(() => {
    if (!dob) return;

    const updateAge = () => {
      const time =
        (Date.now() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(time.toString().substring(0, 12));
    };

    const interval = setInterval(updateAge, 50);

    return () => clearInterval(interval);
  }, [dob]);

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