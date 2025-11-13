export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-primary mb-4">Panel Principal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/inquilinos" className="card text-center hover:bg-blue-50">🏠 Inquilinos</a>
        <a href="/buscar" className="card text-center hover:bg-blue-50">🔍 Buscar Inquilino</a>
      </div>
    </div>
  );
}
