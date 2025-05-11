import { useState } from 'react';

const Tooltip = ({ text, tooltipText }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p className="underline text-blue-600 cursor-pointer">{text}</p>
      {hovered && (
        <span className="absolute bg-gray-800 text-white p-1.5 rounded-md top-[-450%] left-1/2 transform -translate-x-1/2 whitespace-normal break-words w-72 z-10">
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
