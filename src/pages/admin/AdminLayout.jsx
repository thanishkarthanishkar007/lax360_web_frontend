import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/icons/logo.svg";

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      exact: true,
      icon: LayoutDashboard,
      desc: "Overview & Analytics",
    },
    {
      name: "Services Management",
      path: "/admin/services",
      icon: Layers,
      desc: "Create, Edit & Remove Services",
    },
    {
      name: "Jobs / Careers",
      path: "/admin/jobs",
      icon: Briefcase,
      desc: "Manage Open Positions",
    },
    {
      name: "Applications",
      path: "/admin/applications",
      icon: Users,
      desc: "Candidate Resumes",
    },
    {
      name: "Contact Inquiries",
      path: "/admin/contacts",
      icon: MessageSquare,
      desc: "Client Messages & Leads",
    },
    {
      name: "Privacy Requests",
      path: "/admin/privacy-requests",
      icon: ShieldCheck,
      desc: "DPDP Data Principal Requests",
    },
  ];

  const getPageTitle = () => {
    if (location.pathname === "/admin") return "Dashboard Overview";
    if (location.pathname === "/admin/services") return "Services Management";
    if (location.pathname === "/admin/jobs") return "Jobs & Careers Management";
    if (location.pathname === "/admin/applications") return "Candidate Applications";
    if (location.pathname === "/admin/contacts") return "Contact Inquiries";
    if (location.pathname === "/admin/privacy-requests") return "DPDP Privacy Requests";
    return "Admin Panel";
  };

  return (
    <div className="min-h-screen bg-[#070712] text-white flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#0e0e20] border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img src={logo} alt="LAX360" className="w-8 h-8" />
          <span className="font-['Poppins'] font-bold text-lg text-white">
            LAX<span className="text-purple-400">360</span>
          </span>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-semibold">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#0d0d1e] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-xl">
                <img src={logo} alt="LAX360" className="w-7 h-7" />
              </div>
              <div>
                <h2 className="font-['Poppins'] font-bold text-lg leading-tight tracking-wide text-white">
                  LAX<span className="text-purple-400">360</span>
                </h2>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-medium">
                  Control Center
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[11px] uppercase tracking-wider font-semibold text-gray-400">
              Content Management
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path) &&
                  (item.path !== "/admin" || location.pathname === "/admin");

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-purple-600/20 border border-purple-500/40 text-white font-medium shadow-md shadow-purple-900/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={`transition-colors ${
                          isActive ? "text-purple-400" : "text-gray-400 group-hover:text-purple-300"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <span className="block text-sm truncate">{item.name}</span>
                      </div>
                      {isActive && <ChevronRight size={14} className="text-purple-400" />}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#0a0a18]">
          {/* Admin Info Card */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold text-xs">
              <ShieldCheck size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {admin?.email || "lax360salem@gmail.com"}
              </p>
              <p className="text-[10px] text-green-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active Session
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-medium transition"
              title="View Public Website"
            >
              <ExternalLink size={13} />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-medium border border-red-500/20 transition"
              title="Logout from Admin Panel"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-5 bg-[#0b0b1c]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
          <div>
            <h1 className="text-xl font-bold text-white font-['Poppins']">
              {getPageTitle()}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Manage website content and dynamic database entries in real time
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-purple-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition"
            >
              <span>View Website</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-[#070712]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
