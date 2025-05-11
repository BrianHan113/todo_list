import { useState, useEffect, useRef } from 'react';

const Tooltip = ({ text, tooltipText, y_translate }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // See if click was inside or outside of our tooltip box
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setClicked(false);
      }
    };

    if (clicked) { // Tooltip is open
      document.addEventListener('mousedown', handleClickOutside); // Callback function whenever we click
    }

    return () => { // Tooltip is closed
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clicked]); // Only activates at first mount, and when we click the tooltip opener text

  return (
    <div
      ref={tooltipRef}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setClicked(c => !c)}
    >
      <p className="underline text-blue-600 cursor-pointer">{text}</p>
      {(hovered || clicked) && (
        <span
          className="absolute bg-gray-800 text-white p-1.5 rounded-md left-1/2 transform -translate-x-1/2 whitespace-normal break-words w-72 z-10"
          style={{ top: `${y_translate}%` }}
        >
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default Tooltip;