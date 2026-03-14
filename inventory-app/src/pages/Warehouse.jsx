import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

export default function Warehouse() {
  const navigate = useNavigate();
  const [showNewModal, setShowNewModal] = useState(false);
  const [activeLocation, setActiveLocation] = useState('All Locations');
  const [gateEnabled, setGateEnabled] = useState(true);

  function handleUpdateRecords() {
    showToast({ title: 'Records Updated', message: 'Warehouse identity and address saved successfully.', type: 'success' });
  }

  function handleExport() {
    showToast({ title: 'Export Started', message: 'Warehouse report is being generated as PDF...', type: 'info' });
  }

  function handleNewWarehouse() {
    setShowNewModal(true);
  }

  function handleZones() {
    showToast({ title: 'Silicon Valley Hub', message: 'Zone management interface coming soon. Currently: 12 / 15 zones active.', type: 'info' });
  }

  function handleEditZone(zoneName) {
    showToast({ title: 'Edit ' + zoneName, message: 'Zone configuration panel — capacity, bins, and access settings.', type: 'info' });
  }

  function handleNetworkTopology() {
    showToast({ title: 'Network Topology', message: 'Connected to 8 regional nodes. All nodes are currently operational.', type: 'success' });
  }

  function handleSaveWarehouse() {
    setShowNewModal(false);
    showToast({ title: 'Warehouse Added', message: 'New warehouse registered and awaiting first stock entry.', type: 'success' });
  }

  const locations = ['All Locations', 'Storage Bins', 'Dock Doors'];

  const zones = [
    { name: 'Zone A - Ambient Storage', desc: '240 Active Bins • High Density', icon: 'shelves', util: '94%', badge: 'Optimized', badgeColor: 'bg-tertiary-container text-on-tertiary-container', bg: 'bg-surface' },
    { name: 'Zone B - Cold Chain', desc: '80 Refrigerated Bins • Temperature Controlled', icon: 'ac_unit', util: '62%', badge: 'Low Stock', badgeColor: 'bg-error-container text-on-error-container', bg: 'bg-surface-container-low border border-outline-variant/10' },
    { name: 'Zone C - Hazardous Materials', desc: '12 Secure Cabinets • Specialized Access', icon: 'warning', util: '15%', badge: 'Under-used', badgeColor: 'bg-surface-container-highest text-on-surface-variant', bg: 'bg-surface' },
  ];

  return (
    <Layout>
      <div>
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
            <button onClick={handleExport} className="px-6 py-2.5 rounded-lg font-semibold text-on-secondary-container bg-secondary-container hover:bg-secondary-fixed transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">file_download</span> Export
            </button>
            <button onClick={handleNewWarehouse} className="px-8 py-2.5 rounded-lg font-semibold text-on-primary brand-gradient hover:opacity-90 transition-all shadow-md flex items-center gap-2">
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
              <button onClick={handleUpdateRecords} className="px-8 py-3 rounded-lg text-on-primary bg-primary font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                Update Records
              </button>
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
                <div className="brand-gradient h-full rounded-full transition-all duration-700" style={{ width: '82%' }}></div>
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
                <button onClick={handleZones} className="w-full py-2.5 border-2 border-primary-container text-primary font-bold rounded-lg hover:bg-primary-container/20 transition-colors">
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
                {/* Interactive toggle */}
                <button
                  onClick={() => { setGateEnabled(p => !p); showToast({ title: 'Gate Access', message: gateEnabled ? 'Security A1 gate disabled.' : 'Security A1 gate enabled.', type: gateEnabled ? 'warning' : 'success' }); }}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${gateEnabled ? 'bg-primary' : 'bg-surface-container-highest'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${gateEnabled ? 'right-1' : 'left-1'}`}></div>
                </button>
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
              <button onClick={handleNetworkTopology} className="w-10 h-10 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">arrow_forward_ios</span>
              </button>
            </div>
          </div>
        </div>

        {/* Management Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-headline text-2xl font-bold text-on-surface">Location Management</h4>
            <div className="flex gap-2">
              {locations.map(loc => (
                <button
                  key={loc}
                  onClick={() => setActiveLocation(loc)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${activeLocation === loc ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {zones.map(zone => (
              <div key={zone.name} className={`group flex items-center px-8 py-4 ${zone.bg} rounded-xl hover:bg-surface-container-highest transition-all`}>
                <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors">
                  <span className="material-symbols-outlined">{zone.icon}</span>
                </div>
                <div className="ml-6 flex-1">
                  <p className="font-bold text-on-surface">{zone.name}</p>
                  <p className="text-xs text-on-surface-variant">{zone.desc}</p>
                </div>
                <div className="px-8 text-right">
                  <p className="text-xs text-on-surface-variant font-medium">Utilization</p>
                  <p className="font-headline font-bold text-on-surface">{zone.util}</p>
                </div>
                <div className="w-32 px-4 flex justify-end">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${zone.badgeColor}`}>{zone.badge}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                  <button onClick={() => handleEditZone(zone.name)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container-low text-on-surface-variant">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Warehouse Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
              <h3 className="font-headline font-bold text-xl">Register New Warehouse</h3>
              <button onClick={() => setShowNewModal(false)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Warehouse Name *</label>
                <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g. East Hub Facility" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Short Code *</label>
                <input type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="e.g. WH-EH-01" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Address</label>
                <textarea className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all resize-none" rows="2" placeholder="Full physical address..." />
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-end gap-3">
              <button onClick={() => setShowNewModal(false)} className="px-6 py-2.5 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-outline-variant/30 transition-colors">Cancel</button>
              <button onClick={handleSaveWarehouse} className="px-6 py-2.5 brand-gradient text-on-primary font-bold rounded-xl shadow-md hover:scale-[1.02] transition-transform">Register</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
