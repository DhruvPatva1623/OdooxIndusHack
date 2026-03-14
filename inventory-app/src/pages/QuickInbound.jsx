import React, { useState } from 'react';
import Layout from '../components/Layout';
import { showToast } from '../components/Toast';

export default function QuickInbound() {
  const [sku, setSku] = useState('');
  const [vendor, setVendor] = useState('');
  const [batch, setBatch] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [zone, setZone] = useState('Main Receiving Dock');
  const [weight, setWeight] = useState('0.00');
  const [tare, setTare] = useState('0.00');

  const handleValidate = (e) => {
    e.preventDefault();
    showToast({ 
      title: 'Receipt Validated', 
      message: `Inbound shipment for ${sku} from ${vendor || 'Internal'} has been added to stock.`, 
      type: 'success' 
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-headline font-extrabold text-on-surface">Quick Inbound</h1>
            <p className="text-on-surface-variant mt-1">Efficiently receive and validate vendor shipments in real-time.</p>
          </div>
          <div className="bg-surface-container-high px-4 py-2 rounded-xl flex items-center gap-3 border border-outline-variant/10 shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
            <span className="text-xs font-bold text-on-surface">{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                  <span className="material-symbols-outlined font-bold">add_shopping_cart</span>
                </div>
                <h2 className="text-xl font-headline font-extrabold text-on-surface">New Receipt Entry</h2>
              </div>

              <form onSubmit={handleValidate} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Vendor Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Global Logistics"
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={vendor}
                      onChange={(e) => setVendor(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Batch / Lot Number</label>
                    <input 
                      type="text" 
                      placeholder="Optional"
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Product SKU (Searchable)</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      placeholder="Type to search product catalog..."
                      className="w-full bg-surface-container-high border-none rounded-xl pl-12 pr-32 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">qr_code_scanner</span>
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase hover:bg-primary/20 transition-colors">Enter to Select</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Quantity Received</label>
                    <div className="flex bg-surface-container-high rounded-xl overflow-hidden">
                      <input 
                        type="number" 
                        required
                        className="flex-1 bg-transparent border-none px-4 py-4 focus:ring-0 text-sm"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      />
                      <div className="flex flex-col border-l border-outline-variant/10">
                        <button type="button" onClick={() => setQuantity(q => q + 1)} className="px-2 h-1/2 hover:bg-surface-container-highest transition-colors">
                          <span className="material-symbols-outlined text-xs">keyboard_arrow_up</span>
                        </button>
                        <button type="button" onClick={() => setQuantity(q => Math.max(0, q - 1))} className="px-2 h-1/2 hover:bg-surface-container-highest transition-colors">
                          <span className="material-symbols-outlined text-xs">keyboard_arrow_down</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Warehouse Zone</label>
                    <select 
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm appearance-none"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      <option>Main Receiving Dock</option>
                      <option>Cold Storage A</option>
                      <option>High-Rack Bay 4</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Weight (KG)</label>
                    <input 
                      type="text" 
                      placeholder="0.00"
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Tare (KG)</label>
                    <input 
                      type="text" 
                      placeholder="0.00"
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                      value={tare}
                      onChange={(e) => setTare(e.target.value)}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-5 rounded-2xl brand-gradient text-on-primary font-headline font-extrabold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">verified</span>
                  Validate & Add to Stock
                </button>
              </form>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            <div className="bg-surface-container-low rounded-[2rem] p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline font-bold text-on-surface">Recently Received</h3>
                <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Modernist Chrono V2', sku: 'WCH-2024-MOD', units: 42, time: '2 mins ago', status: 'Success' },
                  { name: 'AudioTech Wireless ...', sku: 'AUD-5502-WL', units: 120, time: '14 mins ago', status: 'Success' },
                  { name: 'Stride Elite Run Red', sku: 'SHO-9988-EL', units: 15, time: '45 mins ago', status: 'Incomplete' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary/5 transition-colors">
                      <span className="material-symbols-outlined">watch</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-sm text-on-surface truncate">{item.name}</p>
                        <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded ${item.status === 'Success' ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-error-container text-on-error-container'} uppercase tracking-tighter`}>{item.status}</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant font-medium">SKU: {item.sku}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[9px] text-on-surface-variant font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">inventory_2</span> {item.units} Units
                        </span>
                        <span className="text-[9px] text-on-surface-variant font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">schedule</span> {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Goal card */}
            <div className="bg-primary-container p-8 rounded-[2rem] relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-xs font-bold text-on-primary-container uppercase tracking-widest mb-2">Daily Goal</p>
                  <p className="text-[10px] text-on-primary-container/70 font-medium max-w-[200px] mb-6">
                    You've received 85% of expected stock today.
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-headline font-extrabold text-on-primary-container leading-none">2.4k</span>
                    <span className="text-[10px] font-bold text-on-primary-container uppercase mb-1">SKUs Processed</span>
                  </div>
               </div>
               <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-on-primary-container/10 rotate-12">package_2</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
