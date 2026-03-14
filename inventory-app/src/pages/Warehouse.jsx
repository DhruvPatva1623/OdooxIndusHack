import React from 'react';
import { Link } from 'react-router-dom';

export default function Warehouse() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      {/* SideNavBar */}
      <aside className="w-72 bg-surface-container-low flex flex-col h-screen sticky top-0 overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl brand-gradient flex items-center justify-center text-on-primary shadow-lg">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <h1 className="font-headline text-lg font-bold tracking-tight text-on-surface">Inventory Pro</h1>
              <p className="text-xs text-on-surface-variant font-medium">Warehouse Management</p>
            </div>
          </div>
          <nav className="space-y-2">
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-high" to="/">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors bg-primary text-on-primary shadow-md" to="/warehouse">
              <span className="material-symbols-outlined">inventory_2</span>
              <span className="font-medium">Warehouse</span>
            </Link>
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-high" to="/stock-levels">
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-medium">Stock Levels</span>
            </Link>
            <Link className="flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-on-surface-variant hover:bg-surface-container-high" to="/warehouse">
              <span className="material-symbols-outlined">location_on</span>
              <span className="font-medium">Locations</span>
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-8">
          <Link to="/profile" className="bg-surface-container-high rounded-2xl p-4 flex items-center gap-3 hover:bg-outline-variant/20 transition-colors">
            <img alt="User Profile" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNb3edk8QlPrzfgJ0DZk8l8Ljgzuu9QjVjvdYBC4VYumxSaz1lXb_c73vL07I9lK1JeqDSjKIo2O0DRPFmaCJyK9WGiyHvV5OT9yv6nO1Rw1_MF8USg2Ygb-is9-0Zksv0l-0OZWKqItGI7hQ67dVI6vd4SHxZid-uJyW9mGAzCbC_SecJmdN3bH0ZSweiv-2QkZg64V5h5Mg6EmPQ4adZo6UALQsCbVJ-hQkWpLtuNtVatO7cUBMZDFc4BGDvmA-SOdbpZhe-MCdH"/>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">Alex Rivera</p>
              <p className="text-xs text-on-surface-variant truncate">Lead Curator</p>
            </div>
            <button className="text-on-surface-variant">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="h-20 bg-surface px-8 flex items-center justify-between sticky top-0 z-10 border-b border-outline-variant/15">
          <div className="flex items-center gap-4">
            <h2 className="font-headline text-xl font-bold text-on-surface">Inventory System</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-64 pl-10 pr-4 py-2 bg-surface-container-low rounded-full border-none focus:ring-2 focus:ring-primary-container transition-all" placeholder="Search facilities..." type="text" />
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">notifications</span></button>
              <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">settings</span></button>
              <button className="hover:text-primary transition-colors"><span className="material-symbols-outlined">help</span></button>
            </div>
            <div className="h-8 w-[1px] bg-outline-variant/30"></div>
            <img alt="User Avatar" className="w-8 h-8 rounded-full border border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6o0_aXcvD8Io7LIZvhMuIU3RMd7oKug9-OWmdy8NP61DBkWPgO8DtMPCnLLA-ruEDb2INfJTdq487sCJ_1ikOZakI5G6rm-KcwdifUtFTihzq1viUGLzOoHb7HT1HFjmXCmgJ6PlTTlgBnmOpsDX8NtUcYUnfbTr2ogiSrmCr9gpM3vLVPIN0C3pbSsBMWqCS5NH0g9ZoYgKEx0lkWb_N2RusH5f3rMO1mVd-twIkM09tuQCdU5IVoe9mMLzDffTZnPfzOm9DcYvk"/>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-1 max-w-7xl mx-auto w-full">
          <div className="flex items-end justify-between mb-12">
            <div>
              <nav className="flex items-center gap-2 text-sm text-on-surface-variant mb-2">
                <span>Organization</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-on-surface font-medium">Warehouses</span>
              </nav>
              <h3 className="font-headline text-4xl font-extrabold text-on-surface">Global Distribution Hub</h3>
              <p className="text-on-surface-variant mt-2 text-lg">Managing logistical precision at scale.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 rounded-lg font-semibold text-on-secondary-container bg-secondary-container hover:bg-secondary-fixed transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">file_download</span> Export
              </button>
              <button className="px-8 py-2.5 rounded-lg font-semibold text-on-primary brand-gradient hover:opacity-90 transition-all shadow-md flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add</span> New Warehouse
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Details Card */}
            <div className="col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_10px_40px_rgba(115,69,182,0.04)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 brand-gradient rounded-full"></div>
                <h4 className="font-headline text-xl font-bold text-on-surface">Warehouse Identity</h4>
              </div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Full Legal Name</label>
                  <input className="no-border-input px-4 py-3 text-on-surface font-medium" type="text" defaultValue="Main Logistics Center - North Region" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Short Code</label>
                  <input className="no-border-input px-4 py-3 text-on-surface font-medium" type="text" defaultValue="WH-NR-01" />
                </div>
                <div className="col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant px-1">Physical Address</label>
                  <textarea className="no-border-input px-4 py-3 text-on-surface font-medium resize-none" rows="3" defaultValue="4500 Logistics Way, Silicon Valley, CA 94025, United States"></textarea>
                </div>
              </div>
              
              <div className="mt-12 flex items-center justify-between border-t border-surface-container-high pt-8">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Capacity Used</p>
                    <p className="text-xl font-headline font-bold text-primary">82.4%</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Active Zones</p>
                    <p className="text-xl font-headline font-bold text-on-surface">12 / 15</p>
                  </div>
                </div>
                <button className="px-8 py-3 rounded-lg text-on-primary bg-primary font-bold shadow-lg shadow-primary/20">Update Records</button>
              </div>
            </div>

            {/* Stats & Actions */}
            <div className="col-span-4 space-y-6">
              <div className="bg-surface-container-high rounded-xl p-6 relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-9xl">inventory</span>
                </div>
                <h5 className="font-headline font-bold text-on-surface-variant mb-4">Space Utilization</h5>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-headline font-extrabold text-on-surface">1.2M</span>
                  <span className="text-on-surface-variant text-sm font-medium">sq. ft. available</span>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full mt-6">
                  <div className="brand-gradient h-full rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex flex-col border border-outline-variant/15">
                <div className="h-48 relative">
                  <img alt="Warehouse Map" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1NilhriwFNsxIhs9VsBF_deyhzcHVlI5NO1q4cBd6nnl5tbMEDn9F00xmHiFePAuF3Xtt569ZF9hbWdfNyp_M_S2QUA_wlBvsrrzmauVFSKXl0qq-aG822H-2IPIspGL7ztORUQmOsDhqkSF8x12u5QEm1PjxpPi0GNw1ZW6S6H7MfIrpBbiGssEb3j8PEoMe3TZa8b023LroiVauGoRoV2f3H0HBYSm6pGsGritn4egNs81iABeQjz4ocMq8FnKeIa9Fxa8RaQqG" />
                  <div className="absolute inset-0 bg-primary/10"></div>
                  <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                    <span className="text-[10px] font-bold uppercase text-on-surface">Operational</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span className="text-sm font-bold text-on-surface">Silicon Valley Hub</span>
                  </div>
                  <button className="w-full py-2.5 border-2 border-primary-container text-primary font-bold rounded-lg hover:bg-primary-container/20 transition-colors">
                    Manage Zones
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Bento Rows */}
            <div className="col-span-12 grid grid-cols-4 gap-6 mt-2">
              <div className="bg-tertiary-container/30 rounded-xl p-6 border border-tertiary-container/20">
                <span className="material-symbols-outlined text-on-tertiary-container mb-3">verified_user</span>
                <h6 className="text-on-tertiary-container font-bold mb-1">Audit Status</h6>
                <p className="text-sm text-on-tertiary-container/80">Last audited 14 days ago. Compliant.</p>
              </div>
              <div className="bg-surface-container-high rounded-xl p-6 flex flex-col justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Gate Access</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-on-surface">Security A1</span>
                  <div className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 bg-surface-container-low rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">hub</span>
                  </div>
                  <div>
                    <h6 className="font-bold text-on-surface">Network Topology</h6>
                    <p className="text-sm text-on-surface-variant font-medium">Connected to 8 regional nodes</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">arrow_forward_ios</span>
              </div>
            </div>
          </div>

          {/* Management Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-headline text-2xl font-bold text-on-surface">Location Management</h4>
              <div className="flex gap-4">
                <button className="px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/5 rounded-lg transition-colors">All Locations</button>
                <button className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">Storage Bins</button>
                <button className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">Dock Doors</button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="group flex items-center px-8 py-4 bg-surface rounded-xl hover:bg-surface-container-highest transition-all">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined">shelves</span>
                </div>
                <div className="ml-6 flex-1">
                  <p className="font-bold text-on-surface">Zone A - Ambient Storage</p>
                  <p className="text-xs text-on-surface-variant">240 Active Bins • High Density</p>
                </div>
                <div className="px-8 text-right">
                  <p className="text-xs text-on-surface-variant font-medium">Utilization</p>
                  <p className="font-headline font-bold text-on-surface">94%</p>
                </div>
                <div className="w-32 px-4 flex justify-end">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-tertiary-container text-on-tertiary-container">Optimized</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </div>

              <div className="group flex items-center px-8 py-4 bg-surface-container-low rounded-xl hover:bg-surface-container-highest transition-all border border-outline-variant/10">
                <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined">ac_unit</span>
                </div>
                <div className="ml-6 flex-1">
                  <p className="font-bold text-on-surface">Zone B - Cold Chain</p>
                  <p className="text-xs text-on-surface-variant">80 Refrigerated Bins • Temperature Controlled</p>
                </div>
                <div className="px-8 text-right">
                  <p className="text-xs text-on-surface-variant font-medium">Utilization</p>
                  <p className="font-headline font-bold text-on-surface">62%</p>
                </div>
                <div className="w-32 px-4 flex justify-end">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-error-container text-on-error-container">Low Stock</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-lowest text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </div>

              <div className="group flex items-center px-8 py-4 bg-surface rounded-xl hover:bg-surface-container-highest transition-all">
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <div className="ml-6 flex-1">
                  <p className="font-bold text-on-surface">Zone C - Hazardous Materials</p>
                  <p className="text-xs text-on-surface-variant">12 Secure Cabinets • Specialized Access</p>
                </div>
                <div className="px-8 text-right">
                  <p className="text-xs text-on-surface-variant font-medium">Utilization</p>
                  <p className="font-headline font-bold text-on-surface">15%</p>
                </div>
                <div className="w-32 px-4 flex justify-end">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-surface-container-highest text-on-surface-variant">Under-used</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
