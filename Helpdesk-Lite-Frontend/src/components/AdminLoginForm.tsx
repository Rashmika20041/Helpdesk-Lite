import { Link, useNavigate } from 'react-router-dom';

function AdminLoginForm() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin authentication - in real app, this would validate credentials
    navigate('/admin/tickets');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-orange-500 to-yellow-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="adminUsername" className="block text-white font-medium mb-2">
              Admin Username
            </label>
            <input
              type="text"
              id="adminUsername"
              name="adminUsername"
              required
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              placeholder="Enter admin username"
            />
          </div>
          <div>
            <label htmlFor="adminPassword" className="block text-white font-medium mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="adminPassword"
              name="adminPassword"
              required
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              placeholder="Enter admin password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-400 to-orange-500 hover:from-red-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Admin Login
          </button>
        </form>
        <p className="text-white/70 text-center mt-6">
          Back to <Link to="/" className="text-white font-semibold hover:underline">User Login</Link>
        </p>
      </div>
    </div>
  );
}
export default AdminLoginForm;