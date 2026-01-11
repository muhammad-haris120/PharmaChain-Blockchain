import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
      <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <NavLink className="hover:bg-slate-700 p-2 rounded" to="/">
          🏠 Home
        </NavLink>
        <NavLink className="hover:bg-slate-700 p-2 rounded" to="/manufacturer">
          🏭 Manufacturer
        </NavLink>
        <NavLink className="hover:bg-slate-700 p-2 rounded" to="/distributor">
          🚚 Distributor
        </NavLink>
        <NavLink className="hover:bg-slate-700 p-2 rounded" to="/retailer">
          🏪 Retailer
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
