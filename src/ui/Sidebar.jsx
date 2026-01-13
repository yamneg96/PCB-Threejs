export default function Sidebar({ selected }) {
  if (!selected) return null;

  return (
    <div className="absolute top-4 right-4 bg-gray-900 text-white p-4 rounded">
      <div>ID: {selected.id}</div>
      <div>
        Position: {selected.pos.join(", ")}
      </div>
    </div>
  );
}
