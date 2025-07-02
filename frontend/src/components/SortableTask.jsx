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
      <div className="p-3 flex justify-between items-center">
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
          className="font-semibold flex-1"
          onClick={onClick}
        >
          {task.name}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:underline ml-4 cursor-pointer px-2 py-1"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default SortableTask