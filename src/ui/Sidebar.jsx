export default function Sidebar({ open, onClose, selected }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-gray-900 border-l border-gray-700 text-gray-300 p-6 
      transform ${open ? "translate-x-0" : "translate-x-full"}
      transition-transform md:translate-x-0 md:static z-20 font-mono`}
    >
      <button className="md:hidden absolute top-4 right-4 text-gray-500" onClick={onClose}>✕</button>

      <h2 className="text-green-500 text-sm font-bold mb-6 tracking-widest uppercase">PCB Inspector</h2>

      {selected ? (
        <div className="space-y-4 text-xs">
          <div className="bg-black/30 p-3 rounded border border-gray-800">
            <span className="text-gray-500 block mb-1">Component ID</span>
            <span className="text-white">{selected.id}</span>
          </div>
          
          <div className="bg-black/30 p-3 rounded border border-gray-800">
            <span className="text-gray-500 block mb-1">World Coordinates (XZ)</span>
            <div className="flex justify-between text-white">
              <span>X: {selected.position[0].toFixed(3)}</span>
              <span>Z: {selected.position[2].toFixed(3)}</span>
            </div>
          </div>

          <div className="bg-black/30 p-3 rounded border border-gray-800">
            <span className="text-gray-500 block mb-1">Surface Area</span>
            <span className="text-green-400 font-bold">{selected.area} mm²</span>
          </div>
        </div>
      ) : (
        <div className="text-gray-600 text-center mt-20 italic">Select a component to view properties</div>
      )}
    </div>
  );
}