export default function Sidebar({ open, onClose, selected }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-gray-800 text-white p-4
      transform ${open ? "translate-x-0" : "translate-x-full"}
      transition-transform md:translate-x-0 md:static`}
    >
      <button
        className="md:hidden absolute top-4 right-4"
        onClick={onClose}
      >
        ✕
      </button>

      <h2 className="text-lg mb-4">Details</h2>

      {selected ? (
        <>
          <div>ID: {selected.id}</div>
          <div>
            Position:{" "}
            {selected.position.map(n => n.toFixed(2)).join(", ")}
          </div>
        </>
      ) : (
        <div>No selection</div>
      )}
    </div>
  );
}
