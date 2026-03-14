import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';

export default function StockAdjustments() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  function handleValidate() {
    setShowCreateModal(false);
    showToast({ title: 'Adjustment Applied', message: 'Stock ledger updated. Difference of -3 units recorded.', type: 'warning' });
  }

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Inventory Adjustments</h2>
          <p className="text-on-surface-variant font-medium mt-1">Fix mismatches between recorded stock and physical count.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2 bg-error/10 text-error rounded-xl font-bold hover:bg-error/20 transition-colors flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">build_circle</span>
          New Adjustment
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-4 mt-8">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-2">
            {['all','in progress','validated'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeFilter === f ? 'bg-surface-container-highest text-primary' : 'hover:bg-surface-container-highest text-on-surface-variant'}`}>
                {f === 'all' ? 'All Adjustments' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
            <input className="bg-surface-container-low border-none rounded-full pl-10 pr-6 py-2 text-sm w-full focus:ring-2 focus:ring-primary transition-all" placeholder="Search reference..." type="text" />
          </div>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.1em] border-y border-outline-variant/10 bg-surface-container-low/50">
                <th className="px-8 py-4">Reference</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-center">Diff</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-primary">WH/ADJ/00021</div>
                </td>
                <td className="px-6 py-5 font-medium text-sm">Main Store</td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold">Steel Rods</span><br/>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">RAW-STL-10</span>
                </td>
                <td className="px-6 py-5 font-bold text-error text-center">-3</td>
                <td className="px-6 py-5 text-sm w-40">Today, 08:30</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">Validated</span>
                </td>
              </tr>
              <tr className="group hover:bg-surface-container-highest/30 transition-colors">
                <td className="px-8 py-5">
                  <div className="font-bold text-primary">WH/ADJ/00020</div>
                </td>
                <td className="px-6 py-5 font-medium text-sm">Rack A</td>
                <td className="px-6 py-5">
                  <span className="text-sm font-bold">Ergonomic Office Chair</span><br/>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">FURN-00129</span>
                </td>
                <td className="px-6 py-5 font-bold text-primary text-center">+1</td>
                <td className="px-6 py-5 text-sm w-40">Yesterday</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-error/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-error/20 text-error flex items-center justify-center">
                   <span className="material-symbols-outlined text-sm">warning</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-error">New Stock Adjustment</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                 <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Location *</label>
                  <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-error focus:border-error outline-none transition-all appearance-none cursor-pointer">
                    <option>Main Store</option>
                    <option>Warehouse 1</option>
                    <option>Rack A</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Inventory Date *</label>
                  <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-error focus:border-error outline-none transition-all" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm mb-4">Counted Items</h4>
                <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-4">
                  <div className="grid grid-cols-12 gap-4 mb-3">
                    <div className="col-span-6 text-xs font-bold text-on-surface-variant uppercase px-2">Product</div>
                    <div className="col-span-3 text-xs font-bold text-on-surface-variant uppercase px-2">Recorded</div>
                    <div className="col-span-3 text-xs font-bold text-on-surface-variant uppercase px-2">Counted</div>
                  </div>
                  
                  {/* Item Row */}
                  <div className="grid grid-cols-12 gap-4 items-center mb-3">
                    <div className="col-span-6">
                      <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-error outline-none appearance-none">
                        <option>Steel Rods (RAW-STL-10)</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <input type="number" defaultValue="500" disabled className="w-full bg-surface-container-highest border border-transparent rounded-lg px-3 py-2 text-sm text-on-surface-variant" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" defaultValue="497" className="w-full bg-surface-container-lowest border border-error/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-error outline-none text-error font-bold" />
                    </div>
                  </div>

                  <button className="text-error text-sm font-bold flex items-center gap-1 mt-4 px-2 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Add a line
                  </button>
                </div>
              </div>
              
              <div className="bg-surface-container-highest p-4 rounded-xl text-sm text-on-surface-variant">
                <strong>Note:</strong> Validating this adjustment will permanently change the stock ledger. Ensure counts are physically verified.
              </div>
            </div>

            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs text-on-surface-variant">Difference: <strong className="text-error">-3 units</strong></span>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-outline-variant/30 transition-colors">
                  Cancel
                </button>
                <button onClick={handleValidate} className="px-6 py-2.5 bg-error text-white font-bold rounded-xl shadow-md hover:bg-error/90 transition-colors">
                  Validate &amp; Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
