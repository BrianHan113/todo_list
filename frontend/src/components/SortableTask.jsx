import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const SortableTask = ({ id, task, onDelete, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform)
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="border-b pb-1 hover:bg-amber-100 cursor-pointer"
    >
      <div className="p-3 flex justify-between items-center" onClick={onClick}>
        <span
          {...attributes}
          {...listeners}
          className="mr-2 cursor-grab text-gray-400 select-none touch-none"
          style={{
            touchAction: 'none',
            padding: '0.5rem',
            fontSize: '1.5rem',
          }}
        >
          ☰
        </span>
        <span
          className="font-semibold flex-1 h-full"

        >
          {task.title}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="ml-4 cursor-pointer px-2 py-1 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 48 48"
          >
            <path
              className="fill-[#f44336] group-hover:fill-red-700 transition-colors"
              d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
            ></path>
            <path
              className="fill-white"
              d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
            ></path>
            <path
              className="fill-white"
              d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default SortableTask