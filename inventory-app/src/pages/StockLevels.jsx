import React from 'react';
import { Link } from 'react-router-dom';

export default function StockLevels() {
  return (
    <div className="bg-background text-on-surface flex min-h-screen">
      {/* SideNavBar (Shared Component) */}
      <aside className="w-64 bg-surface-container-low flex flex-col border-none sticky top-0 h-screen">
        <div className="p-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-lg flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <h1 className="text-on-surface font-extrabold text-lg leading-tight">Inventory Pro</h1>
              <p className="text-on-surface-variant text-xs font-medium">Warehouse Management</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-high text-on-surface-variant font-medium transition-colors" to="/">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-high text-on-surface-variant font-medium transition-colors" to="/warehouse">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">Warehouse</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest text-primary font-semibold transition-colors" to="/stock-levels">
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm">Stock Levels</span>
          </Link>
          <Link className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-container-high text-on-surface-variant font-medium transition-colors" to="/warehouse">
            <span className="material-symbols-outlined">location_on</span>
            <span className="text-sm">Locations</span>
          </Link>
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
      <main className="flex-1 flex flex-col">
        {/* TopNavBar */}
        <header className="h-20 bg-surface flex items-center justify-between px-8 sticky top-0 z-10 border-b border-outline-variant/15">
          <div className="flex items-center gap-4">
            <span className="text-on-surface font-headline font-bold text-xl tracking-tight">Inventory System</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
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
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Stats / Bento Section */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 brand-gradient p-8 rounded-[2rem] text-on-primary relative overflow-hidden flex flex-col justify-between h-64">
              <div className="relative z-10">
                <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Global Overview</span>
                <h2 className="text-4xl font-headline font-extrabold mt-2">Active Stock Control</h2>
                <p className="mt-4 max-w-md opacity-90 text-sm leading-relaxed">Manage your warehouse floor with surgical precision. Update SKU availability, track unit costs, and verify "Free to Use" quantities in real-time.</p>
              </div>
              <div className="relative z-10 flex gap-4">
                <button className="bg-on-primary text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary-fixed transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">add_circle</span>
                  Quick Inbound
                </button>
                <button className="bg-primary-container/20 text-on-primary border border-on-primary/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-on-primary/10 transition-colors">
                  Inventory Audit
                </button>
              </div>
              <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-on-primary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="col-span-4 grid grid-rows-2 gap-6">
              <div className="bg-tertiary-container p-6 rounded-[2rem] flex flex-col justify-center">
                <span className="text-xs font-bold text-on-tertiary-container/60 uppercase">Low Stock Alerts</span>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-3xl font-headline font-extrabold text-on-tertiary-container leading-none">12</span>
                  <span className="text-xs font-bold text-on-tertiary-container mb-1">SKUs</span>
                </div>
              </div>
              <div className="bg-surface-container-high p-6 rounded-[2rem] flex flex-col justify-center">
                <span className="text-xs font-bold text-on-surface-variant/60 uppercase">Total Asset Value</span>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-3xl font-headline font-extrabold text-on-surface leading-none">$142.8k</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Stock Management Card */}
          <div className="bg-surface-container-low rounded-[2.5rem] p-4">
            <div className="flex items-center justify-between px-6 py-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-headline font-bold">Stock Inventory</h3>
                <div className="flex gap-2 ml-4">
                  <span className="px-4 py-1.5 bg-surface-container-highest rounded-full text-xs font-semibold text-primary">All Stock</span>
                  <span className="px-4 py-1.5 hover:bg-surface-container-highest transition-colors rounded-full text-xs font-semibold text-on-surface-variant cursor-pointer">In-House</span>
                  <span className="px-4 py-1.5 hover:bg-surface-container-highest transition-colors rounded-full text-xs font-semibold text-on-surface-variant cursor-pointer">Transit</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-surface-container-highest p-1 rounded-xl">
                  <button className="p-2 bg-surface-container-lowest rounded-lg shadow-sm text-primary transition-all">
                    <span className="material-symbols-outlined">list</span>
                  </button>
                  <button className="p-2 text-on-surface-variant">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest rounded-xl text-sm font-semibold text-on-surface hover:bg-outline-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.15em]">
                    <th className="px-8 py-4">Product Details</th>
                    <th className="px-6 py-4">Unit Cost</th>
                    <th className="px-6 py-4">On Hand</th>
                    <th className="px-6 py-4">Free to Use</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-transparent">
                  {/* Row 1 */}
                  <tr className="group hover:bg-surface-container-highest transition-all duration-300">
                    <td className="px-8 py-6 first:rounded-l-[1.5rem]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary">package_2</span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Ergonomic Office Chair V2</p>
                          <p className="text-xs text-on-surface-variant font-medium">SKU: FURN-00129</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-medium text-sm">$189.50</span>
                    </td>
                    <td className="px-6 py-6 font-bold text-on-surface">1,240</td>
                    <td className="px-6 py-6 font-bold text-primary">1,118</td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold uppercase tracking-wider">Ready</span>
                    </td>
                    <td className="px-8 py-6 text-right last:rounded-r-[1.5rem]">
                      <button className="p-2 bg-primary-container text-on-primary-container rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:shadow-lg flex items-center gap-1 mx-auto ml-auto">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="group hover:bg-surface-container-highest transition-all duration-300">
                    <td className="px-8 py-6 first:rounded-l-[1.5rem]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary">inventory</span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Standing Desk Converter</p>
                          <p className="text-xs text-on-surface-variant font-medium">SKU: FURN-00130</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-medium text-sm">$295.00</span>
                    </td>
                    <td className="px-6 py-6 font-bold text-on-surface">430</td>
                    <td className="px-6 py-6 font-bold text-primary">400</td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">Transit</span>
                    </td>
                    <td className="px-8 py-6 text-right last:rounded-r-[1.5rem]">
                      <button className="p-2 bg-primary-container text-on-primary-container rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:shadow-lg flex items-center gap-1 mx-auto ml-auto">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="group hover:bg-surface-container-highest transition-all duration-300">
                    <td className="px-8 py-6 first:rounded-l-[1.5rem]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-error">warning</span>
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">Monitor Arm Array</p>
                          <p className="text-xs text-on-surface-variant font-medium">SKU: TECH-99120</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-medium text-sm">$120.00</span>
                    </td>
                    <td className="px-6 py-6 font-bold text-on-surface">12</td>
                    <td className="px-6 py-6 font-bold text-error">12</td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase tracking-wider">Low Stock</span>
                    </td>
                    <td className="px-8 py-6 text-right last:rounded-r-[1.5rem]">
                      <button className="p-2 bg-primary-container text-on-primary-container rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:shadow-lg flex items-center gap-1 mx-auto ml-auto">
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
