interface HeaderProps {
  total: number;
}
const Header: React.FC<HeaderProps> = ({ total }) => (
  <header className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between shadow-md rounded-b-2xl">
    <h1 className="text-2xl font-bold tracking-wide">Cash Planner Dashboard</h1>
    <div className="text-lg">
      Total filtrado: <span className="font-bold">${total.toLocaleString()}</span>
    </div>
  </header>
);
export default Header;
