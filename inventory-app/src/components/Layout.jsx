import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
    { name: 'Products', icon: 'inventory_2', path: '/products' },
    { name: 'Receipts', icon: 'call_received', path: '/receipts' },
    { name: 'Delivery Orders', icon: 'local_shipping', path: '/deliveries' },
    { name: 'Internal Transfers', icon: 'swap_horiz', path: '/transfers' },
    { name: 'Stock Adjustments', icon: 'build_circle', path: '/adjustments' },
    { name: 'Warehouse', icon: 'warehouse', path: '/warehouse' },
    { name: 'Stock Levels', icon: 'analytics', path: '/stock-levels' },
  ];

  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      {/* SideNavBar */}
      <aside className="w-64 bg-surface-container-low flex flex-col border-r border-outline-variant/15 sticky top-0 h-screen overflow-y-auto shrink-0 custom-scrollbar">
        <div className="p-8 flex flex-col gap-2">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <h1 className="text-on-surface font-extrabold text-lg leading-tight">Inventory Pro</h1>
              <p className="text-on-surface-variant text-xs font-medium">Warehouse Management</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-surface-container-highest text-primary font-semibold' : 'hover:bg-surface-container-high text-on-surface-variant font-medium'}`} to={item.path}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-6">
          <Link to="/profile" className="bg-surface-container-highest p-4 rounded-2xl flex items-center gap-3 hover:bg-outline-variant/30 transition-colors">
            <img className="w-10 h-10 rounded-full object-cover" alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXmb7BWLlzbo6Eoko_XLY3Inrnh8qff43CDTMEeiffqS7WEDDiQztwOt9f5Yc3lvYRnAIv1oZ4eUiFuFGGYQVcqbW9kjK-5IAKRryfRbt259Qh0z8cSao317K7vATLqL2OZpq0zHETewxbENI8Xsa2jeyusdr6zIglswcYqgFUvBaOH8XVCdyAOeji4ugtH_NXQ0jrGfXRLGd24bDn_T4oQruGqhCfNgr7hMmkCF35dwKO1RdADiefO7SqWGpUJTUilLYrnYw3WGue"/>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Alex Rivera</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Manager</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-background">
        {/* TopNavBar */}
        <header className="h-20 bg-surface flex items-center justify-between px-8 sticky top-0 z-10 border-b border-outline-variant/15 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-on-surface font-headline font-bold text-xl tracking-tight">Inventory System</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm transition-colors group-focus-within:text-primary">search</span>
              <input className="bg-surface-container-high border-none rounded-full pl-12 pr-6 py-2.5 text-sm w-72 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Search resources..." type="text" />
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">notifications</span></button>
              <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">settings</span></button>
              <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">help</span></button>
            </div>
            <div className="w-px h-6 bg-outline-variant opacity-30"></div>
            <img className="w-9 h-9 rounded-full object-cover border-2 border-primary-container" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfhDogpRpal3c3gBFfIg9bJuYpslsFOyek0BuWfRk2Cjqaqy0FTkJEdO0MMWogtFXxqd657WZTdQnkGJ9MV4788CLVa_uEJJUcIzABooqY2-LQTGYnSgHrIfRPKIVT_NPRgYkqmOKkzO_Z8a7jjc1qZj14Vdt0nAf7Q4uEOU_wmf7l7oUZzsfTifxW24rufxKvVibvi21q5LNreOzMRlxpBseF5Und0GTmzcQ7El5mcOd3j0oBfJAgcsZstl7YeYYyjE96DbXpj48-"/>
          </div>
        </header>

        {/* Page Canvas */}
        <div className="p-8 pb-24 space-y-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
