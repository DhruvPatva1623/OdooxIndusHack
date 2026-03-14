import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';

const ALL_DELIVERIES = [
  { ref: 'WH/OUT/00045', customer: 'Client B - New York Hub', date: 'Yesterday, 14:20', status: 'waiting' },
  { ref: 'WH/OUT/00046', customer: 'Design Studio LLC', date: 'Today, 10:00', status: 'ready' },
  { ref: 'WH/OUT/00047', customer: 'Acme Corp', date: 'Today, 15:00', status: 'ready' },
  { ref: 'WH/OUT/00044', customer: 'Acme Corp', date: 'Oct 23, 2024', status: 'done' },
];

const STATUS_STYLES = {
  waiting: 'bg-error-container text-on-error-container',
  ready:   'bg-tertiary-container text-on-tertiary-container',
  done:    'bg-surface-container-highest text-on-surface-variant',
};

export default function DeliveryOrders() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deliveries, setDeliveries] = useState(ALL_DELIVERIES);

  const filtered = deliveries.filter(d => {
    const matchFilter = activeFilter === 'all' || d.status === activeFilter;
    const matchSearch = d.ref.toLowerCase().includes(search.toLowerCase()) || d.customer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function handleValidate(ref) {
    setDeliveries(prev => prev.map(d => d.ref === ref ? { ...d, status: 'done' } : d));
    showToast({ title: 'Delivery Validated', message: `${ref} marked as Done. Stock quantities updated.`, type: 'success' });
  }

  function handleReview(ref) {
    showToast({ title: 'Reviewing ' + ref, message: 'Check quantities, confirm packing, then validate.', type: 'info' });
  }

  function handleConfirm() {
    setShowCreateModal(false);
    showToast({ title: 'Delivery Created', message: 'New outbound delivery saved as Draft.', type: 'success' });
  }

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface">Delivery Orders</h2>
          <p className="text-on-surface-variant font-medium mt-1">Manage outgoing stock shipments to customers.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2 brand-gradient text-on-primary rounded-xl font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Delivery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button onClick={() => setActiveFilter('all')} className="text-left bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm flex items-center justify-between hover:border-primary/30 transition-colors">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">To Deliver</span>
            <h3 className="text-2xl font-headline font-extrabold mt-1">{deliveries.filter(d => d.status !== 'done').length}</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>local_shipping</span>
          </div>
        </button>
        <button onClick={() => setActiveFilter('waiting')} className="text-left bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/20 shadow-sm flex items-center justify-between hover:border-error/30 transition-colors">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Late Shipments</span>
            <h3 className="text-2xl font-headline font-extrabold mt-1 text-error">{deliveries.filter(d => d.status === 'waiting').length}</h3>
          </div>
          <div className="w-12 h-12 bg-error-container text-error rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>error</span>
          </div>
        </button>
        <button onClick={() => setActiveFilter('done')} className="text-left bg-primary/5 p-6 rounded-[2rem] border border-primary/20 shadow-sm flex items-center justify-between hover:border-primary/50 transition-colors">
          <div>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Shipped Today</span>
            <h3 className="text-2xl font-headline font-extrabold text-primary mt-1">{deliveries.filter(d => d.status === 'done').length}</h3>
          </div>
          <div className="w-12 h-12 bg-primary text-on-primary rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-[2.5rem] shadow-sm border border-outline-variant/20 p-4">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex gap-2">
            {['all','ready','waiting','done'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeFilter === f ? 'bg-surface-container-highest text-primary' : 'hover:bg-surface-container-highest text-on-surface-variant'}`}>
                {f === 'all' ? 'All Deliveries' : f.charAt(0).toUpperCase() + f.slice(1)}
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
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Scheduled Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-on-surface-variant text-sm">No deliveries found.</td></tr>
              )}
              {filtered.map(d => (
                <tr key={d.ref} className={`group hover:bg-surface-container-highest/30 transition-colors ${d.status === 'done' ? 'opacity-60' : ''}`}>
                  <td className="px-8 py-5"><div className={`font-bold ${d.status === 'done' ? 'text-on-surface-variant line-through' : 'text-primary'}`}>{d.ref}</div></td>
                  <td className="px-6 py-5 font-medium text-sm">{d.customer}</td>
                  <td className="px-6 py-5 text-sm">{d.date}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${STATUS_STYLES[d.status] || STATUS_STYLES.done}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {d.status === 'ready' && (
                      <button onClick={() => handleValidate(d.ref)} className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-on-primary transition-colors">Validate</button>
                    )}
                    {d.status === 'waiting' && (
                      <button onClick={() => handleReview(d.ref)} className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg text-xs hover:bg-primary hover:text-on-primary transition-colors">Review</button>
                    )}
                    {d.status === 'done' && (
                      <button onClick={() => handleReview(d.ref)} className="px-4 py-1.5 text-on-surface-variant font-bold rounded-lg text-xs hover:bg-surface-container-high transition-colors">View</button>
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
              <h3 className="font-headline font-bold text-xl">Create Delivery</h3>
              <button onClick={() => setShowCreateModal(false)} className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error/10 hover:text-error transition-colors">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Customer *</label>
                <select className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer">
                  <option>Select / Add Customer...</option>
                  <option>Client B - New York Hub</option>
                  <option>Design Studio LLC</option>
                </select>
              </div>
              <div>
                <h4 className="font-bold text-sm mb-4">Operations / Items</h4>
                <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-4">
                  <div className="grid grid-cols-12 gap-4 mb-3">
                    <div className="col-span-6 text-xs font-bold text-on-surface-variant uppercase px-2">Product</div>
                    <div className="col-span-3 text-xs font-bold text-on-surface-variant uppercase px-2">Demand</div>
                    <div className="col-span-3 text-xs font-bold text-on-surface-variant uppercase px-2">Done</div>
                  </div>
                  <div className="grid grid-cols-12 gap-4 items-center mb-3">
                    <div className="col-span-6">
                      <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none">
                        <option>Office Chair (FURN-001)</option>
                        <option>Steel Rods (RAW-STL-10)</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <input type="number" defaultValue="10" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="col-span-3">
                      <input type="number" defaultValue="0" className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                  </div>
                  <button className="text-primary text-sm font-bold flex items-center gap-1 mt-4 px-2 hover:underline">
                    <span className="material-symbols-outlined text-sm">add</span> Add a line
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-outline-variant/20 bg-surface-container-low flex justify-between items-center">
              <span className="text-xs text-on-surface-variant">Status will be <strong className="text-primary">Draft</strong></span>
              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 bg-surface-container-highest text-on-surface font-bold rounded-xl hover:bg-outline-variant/30 transition-colors">Cancel</button>
                <button onClick={handleConfirm} className="px-6 py-2.5 brand-gradient text-on-primary font-bold rounded-xl shadow-md hover:scale-[1.02] transition-transform">Confirm Delivery</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
