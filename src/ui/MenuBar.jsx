import { Menu } from "lucide-react";

export default function MenuBar({ onToggle }) {
  return (
    <div className="absolute top-0 left-0 w-full bg-gray-900 text-white p-3 flex justify-between items-center">
      <div className="font-semibold">PCB Editor</div>
      <button onClick={onToggle} className="md:hidden">
        <Menu size={24} />
      </button>
    </div>
  );
}
