import { Menu, Save, Upload } from "lucide-react";

export default function MenuBar({ onToggle, onSave, onLoad }) {
  return (
    <div className="absolute top-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm text-white p-3 flex justify-between items-center border-b border-gray-700 z-10">
      <div className="flex items-center gap-4">
        <div className="font-mono font-bold text-green-500 tracking-tighter">PCB_CORE_v1.0</div>
        <div className="hidden md:flex gap-2">
          <button onClick={onSave} className="p-1 hover:bg-gray-700 rounded transition-colors" title="Export JSON">
            <Save size={18} />
          </button>
          <button onClick={onLoad} className="p-1 hover:bg-gray-700 rounded transition-colors" title="Import JSON">
            <Upload size={18} />
          </button>
        </div>
      </div>
      <button onClick={onToggle} className="md:hidden">
        <Menu size={24} />
      </button>
    </div>
  );
}