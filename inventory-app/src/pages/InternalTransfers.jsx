import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';

const ALL_TRANSFERS = [
  { ref: 'WH/INT/00012', from: 'Main Store', to: 'Production Rack', date: 'Today, 09:15', status: 'draft' },
  { ref: 'WH/INT/00011', from: 'Warehouse 1', to: 'Warehouse 2', date: 'Yesterday', status: 'done' },
  { ref: 'WH/INT/00010', from: 'Rack A', to: 'Rack B', date: 'Oct 23, 2024', status: 'done' },
];

export default function InternalTransfers() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [transfers, setTransfers] = useState(ALL_TRANSFERS);

  const filtered = transfers.filter(t => {
    const matchFilter = activeFilter === 'all' || t.status === activeFilter;
    const matchSearch = t.ref.toLowerCase().includes(search.toLowerCase()) || t.from.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function handleExecute(ref) {
    setTransfers(prev => prev.map(t => t.ref === ref ? { ...t, status: 'done' } : t));
    showToast({ title: 'Transfer Executed', message: `${ref} completed successfully. Stock updated.`, type: 'success' });
  }

  function handleView(ref) {
    showToast({ title: 'Transfer ' + ref, message: 'Viewing completed transfer details.', type: 'info' });
  }

  function handleDraft() {
    setShowCreateModal(false);
    showToast({ title: 'Transfer Saved', message: 'Internal transfer saved as Draft. Execute when ready.', type: 'success' });
  }

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Internal Transfers</h2>
          <p className="text-on-surface-variant font-medium mt-1">Move stock between warehouses, zones, or racks.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2 brand-gradient text-on-primary rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">swap_horiz</span>
          New Transfer
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-4 mt-8">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-2">
            {['all','draft','done'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeFilter === f ? 'bg-surface-container-highest text-primary' : 'hover:bg-surface-container-highest text-on-surface-variant'}`}>
                {f === 'all' ? 'All Transfers' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} className="bg-surface-container-low border-none rounded-full pl-10 pr-6 py-2 text-sm w-full focus:ring-2 focus:ring-primary transition-all" placeholder="Search reference..." type="text" />
          </div>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.1em] border-y border-outline-variant/10 bg-surface-container-low/50">
                <th className="px-8 py-4">Reference</th>
                <th className="px-6 py-4">From Location</th>
                <th className="px-6 py-4">To Location</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-8 py-12 text-center text-on-surface-variant text-sm">No transfers found.</td></tr>
              )}
              {filtered.map(t => (
                <tr key={t.ref} className="group hover:bg-surface-container-highest/30 transition-colors">
                  <td className="px-8 py-5"><div className="font-bold text-primary">{t.ref}</div></td>
                  <td className="px-6 py-5 font-medium text-sm">{t.from}</td>
                  <td className="px-6 py-5 font-medium text-sm">{t.to}</td>
                  <td className="px-6 py-5 text-sm w-40">{t.date}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${t.status === 'done' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {t.status === 'draft' && (
                      <button onClick={() => handleExecute(t.ref)} className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-on-primary transition-colors">Execute</button>
                    )}
                    {t.status === 'done' && (
                      <button onClick={() => handleView(t.ref)} className="px-4 py-1.5 text-on-surface-variant font-bold rounded-lg text-xs hover:bg-surface-container-high transition-colors">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
              <h3 className="font-headline font-bold text-xl">Create Internal Transfer</h3>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Source Location *</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>Main Store</option>
                    <option>Warehouse 1</option>
                    <option>Rack A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Destination Location *</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none cursor-pointer">
                    <option>Production Rack</option>
                    <option>Warehouse 2</option>
                    <option>Rack B</option>
                  </select>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-4">Operations / Items</h4>
                <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-4">
                  <div className="grid grid-cols-12 gap-4 mb-3">
                    <div className="col-span-8 text-xs font-bold text-on-surface-variant uppercase px-2">Product</div>
                    <div className="col-span-4 text-xs font-bold text-on-surface-variant uppercase px-2">Demand</div>
                  </div>
                  
                  {/* Item Row */}
                  <div className="grid grid-cols-12 gap-4 items-center mb-3">
                    <div className="col-span-8">
                      <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none">
                        <option>Steel Rods (RAW-STL-10)</option>
                        <option>Office Chair (FURN-001)</option>
                      </select>
                    </div>
                    <div className="col-span-4">
                      <input type="number" defaultValue="1" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>

                  <button className="text-primary text-sm font-bold flex items-center gap-1 mt-4 px-2 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Add a product
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs text-on-surface-variant">Scheduled for <strong className="text-primary">Today</strong></span>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-outline-variant/30 transition-colors">
                  Cancel
                </button>
                <button onClick={handleDraft} className="px-6 py-2.5 brand-gradient text-on-primary font-bold rounded-xl shadow-md hover:scale-[1.02] transition-transform">
                  Draft Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
