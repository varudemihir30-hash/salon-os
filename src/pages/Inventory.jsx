import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Plus, Search, Filter, AlertTriangle, ArrowRight, Package } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function Inventory() {
  const lowStockProducts = MOCK_PRODUCTS.filter(p => p.stock <= p.alertThreshold);

  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col pb-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display text-primary tracking-widest uppercase mb-1">Inventory</h2>
          <p className="text-sm text-secondary tracking-wide">Manage products, stock levels, and orders</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search inventory..." className="pl-9 pr-4 py-2 bg-card border border-border rounded-pill text-sm text-primary focus:outline-none focus:border-gold w-64 transition-all" />
          </div>
          <Button variant="secondary" className="px-4"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          <Button><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 mb-6">
        {/* KPI Cards */}
        <Card className="col-span-4 flex items-center p-5 border-l-2 border-l-gold">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4"><Package className="w-5 h-5"/></div>
          <div>
            <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Total Items</p>
            <p className="text-2xl font-display text-primary mt-1">{MOCK_PRODUCTS.length}</p>
          </div>
        </Card>
        <Card className="col-span-4 flex items-center p-5 border-l-2 border-l-accent-rose">
          <div className="w-12 h-12 rounded-full bg-accent-rose/10 flex items-center justify-center text-accent-rose mr-4"><AlertTriangle className="w-5 h-5"/></div>
          <div>
            <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Low Stock Alerts</p>
            <p className="text-2xl font-display text-primary mt-1">{lowStockProducts.length}</p>
          </div>
        </Card>
        <Card className="col-span-4 flex items-center p-5 border-l-2 border-l-accent-mint">
          <div className="w-12 h-12 rounded-full bg-accent-mint/10 flex items-center justify-center text-accent-mint mr-4"><ArrowRight className="w-5 h-5"/></div>
          <div>
            <p className="text-[10px] text-muted uppercase tracking-widest font-semibold">Pending Orders</p>
            <p className="text-2xl font-display text-primary mt-1">2</p>
          </div>
        </Card>

        {/* Low Stock Urgent Panel */}
        {lowStockProducts.length > 0 && (
          <Card className="col-span-12 border border-accent-rose/30 bg-accent-rose/5">
            <h3 className="text-sm font-semibold text-accent-rose flex items-center mb-4"><AlertTriangle className="w-4 h-4 mr-2"/> Action Required: Low Stock</h3>
            <div className="grid grid-cols-3 gap-4">
              {lowStockProducts.map(p => (
                <div key={p.id} className="bg-card border border-accent-rose/20 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-primary">{p.brand} {p.name}</p>
                    <p className="text-xs text-accent-rose font-mono mt-1">Stock: {p.stock} / {p.alertThreshold} (Alert)</p>
                  </div>
                  <Button variant="secondary" className="px-3 py-1.5 text-xs text-gold border-gold/30 hover:bg-gold/10 hover:border-gold">Reorder</Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <Card className="flex-1 p-0 overflow-hidden flex flex-col">
        <div className="grid grid-cols-12 bg-elevated/50 p-4 border-b border-border text-[10px] font-semibold text-muted tracking-widest uppercase items-center sticky top-0">
          <div className="col-span-2 pl-4">Brand</div>
          <div className="col-span-3">Product Name</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1 text-center">Stock</div>
          <div className="col-span-2 text-right">Cost / Retail</div>
          <div className="col-span-2 text-right pr-4">Last Restock</div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {MOCK_PRODUCTS.map(p => {
             const isLow = p.stock <= p.alertThreshold;
             return (
              <div key={p.id} className="grid grid-cols-12 p-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-colors group">
                <div className="col-span-2 pl-4 text-sm font-medium text-primary">{p.brand}</div>
                <div className="col-span-3 text-sm text-secondary truncate pr-4">{p.name}</div>
                <div className="col-span-2 text-xs text-muted">
                   <span className="bg-white/5 px-2 py-1 rounded">{p.category}</span>
                </div>
                <div className="col-span-1 text-center font-mono">
                  <span className={`text-sm ${isLow ? 'text-accent-rose font-bold' : 'text-primary'}`}>{p.stock}</span>
                </div>
                <div className="col-span-2 text-right font-mono text-sm">
                  <span className="text-muted">₹{p.cost}</span> <span className="text-white/20 mx-1">/</span> <span className="text-gold">₹{p.retail}</span>
                </div>
                <div className="col-span-2 text-right text-xs text-secondary pr-4">
                  {format(parseISO(p.lastRestocked), 'MMM dd, yyyy')}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  );
}
