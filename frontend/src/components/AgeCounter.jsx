import { useEffect, useState } from "react";

const AgeCounter = ({ UTCString }) => {
  const [age, setAge] = useState("");

  useEffect(() => {
    const updateAge = () => {
      const time =
        (Date.now() - new Date(UTCString)) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(time.toString().substring(0, 12));
    };

    const interval = setInterval(updateAge, 50);

    return () => clearInterval(interval); // Only run when unmounted
  }, [UTCString]);

  return <span>{age}</span>;
};

export default AgeCounter;