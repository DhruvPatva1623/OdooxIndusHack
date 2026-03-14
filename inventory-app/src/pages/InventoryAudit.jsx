import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';

const auditItems = [
  { id: 1, name: 'Ergonomic Office Chair V2', sku: 'FURN-00129', system: 1240, physical: 1240, status: 'Matched' },
  { id: 2, name: 'Standing Desk Converter', sku: 'FURN-00130', system: 430, physical: 428, status: 'Discrepancy' },
  { id: 3, name: 'Monitor Arm Array', sku: 'TECH-99120', system: 12, physical: 12, status: 'Matched' },
];

export default function InventoryAudit() {
  const [items, setItems] = useState(auditItems);
  const [searchTerm, setSearchTerm] = useState('');

  const updatePhysicalCount = (id, val) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const physical = parseInt(val) || 0;
        return { 
          ...item, 
          physical, 
          status: physical === item.system ? 'Matched' : 'Discrepancy' 
        };
      }
      return item;
    }));
  };

  const handleCompleteAudit = () => {
    showToast({ 
      title: 'Audit Session Saved', 
      message: 'Physical counts have been recorded and discrepancies flagged for review.', 
      type: 'success' 
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-headline font-extrabold text-on-surface">Inventory Audit</h1>
            <p className="text-on-surface-variant mt-1">Verify physical warehouse stock against digital records.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-high px-4 py-2 rounded-xl flex items-center gap-3 border border-outline-variant/10 shadow-sm">
              <span className="material-symbols-outlined text-tertiary text-sm">history</span>
              <span className="text-xs font-bold text-on-surface">Session #AUD-2204</span>
            </div>
          </div>
        </header>

        <div className="bg-surface-container-low rounded-[2.5rem] p-4 border border-outline-variant/5">
          <div className="flex items-center justify-between px-8 py-6">
             <div className="relative w-96">
                <input 
                  type="text" 
                  placeholder="Search SKU or Product..."
                  className="w-full bg-surface-container-highest border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">search</span>
             </div>
             <div className="flex gap-4">
                <button className="px-6 py-3 rounded-xl bg-surface-container-highest text-on-surface font-bold text-xs hover:bg-outline-variant transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">filter_alt</span>
                  Filter by Zone
                </button>
                <button onClick={handleCompleteAudit} className="px-6 py-3 rounded-xl brand-gradient text-on-primary font-bold text-xs shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all">
                  Finalize Audit
                </button>
             </div>
          </div>

          <div className="overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-on-surface-variant/70 font-bold text-[10px] uppercase tracking-[0.15em] border-b border-outline-variant/5">
                  <th className="px-10 py-5">Product Details</th>
                  <th className="px-6 py-5">System Count</th>
                  <th className="px-6 py-5">Physical Count</th>
                  <th className="px-6 py-5">Difference</th>
                  <th className="px-10 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {items.map((item) => {
                  const diff = item.physical - item.system;
                  return (
                    <tr key={item.id} className="group hover:bg-surface-container-highest transition-all duration-300">
                      <td className="px-10 py-6">
                        <div>
                          <p className="font-bold text-on-surface">{item.name}</p>
                          <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">SKU: {item.sku}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="text-sm font-bold text-on-surface bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/10">
                          {item.system}
                        </span>
                      </td>
                      <td className="px-6 py-6">
                        <input 
                          type="number" 
                          className="w-24 bg-surface-container-lowest border-2 border-primary/10 rounded-xl px-3 py-2 text-sm font-extrabold text-primary focus:border-primary focus:ring-0 transition-all text-center"
                          value={item.physical}
                          onChange={(e) => updatePhysicalCount(item.id, e.target.value)}
                        />
                      </td>
                      <td className="px-6 py-6">
                        <span className={`text-sm font-extrabold ${diff === 0 ? 'text-on-surface-variant/40' : diff > 0 ? 'text-tertiary' : 'text-error'}`}>
                          {diff > 0 ? '+' : ''}{diff}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${item.status === 'Matched' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-error-container text-on-error-container'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="p-8 border-t border-outline-variant/5 mt-4 flex justify-between items-center text-on-surface-variant">
             <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase opacity-60">Verified</span>
                  <span className="text-xl font-headline font-extrabold text-on-surface">03/12</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase opacity-60 text-error">Discrepancies</span>
                  <span className="text-xl font-headline font-extrabold text-error">01</span>
                </div>
             </div>
             <p className="text-xs font-medium italic opacity-60">Automatic stock ledger adjustment will be created upon finalization.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
