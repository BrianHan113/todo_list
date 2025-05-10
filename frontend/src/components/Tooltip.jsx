import { useState } from 'react';

const Tooltip = ({ text, tooltipText }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} onClick={() => setClicked(!clicked)}>
      <p className="underline text-blue-600 cursor-pointer">{text}</p>
      {clicked && (
        <span style={{
          position: 'absolute',
          backgroundColor: '#333',
          color: '#fff',
          padding: '5px',
          borderRadius: '4px',
          top: '-450%',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'normal',   // Allows text to wrap
          wordWrap: 'break-word', // Ensures long words break to the next line
          width: '300px',         // Set a fixed width
          zIndex: 1000
        }}>
          {tooltipText}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
