import React from 'react';
import { LayoutDashboard, Users, UserSquare, Gift, CreditCard, MessageSquare, Calendar as CalendarIcon, ClipboardList, Package, FileText, IndianRupee, PieChart, Megaphone, MapPin, Sliders, LogOut, KeyRound } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { canAccess, ROLE_LABELS, ROLE_COLORS } from '../../config/roles';

const MAIN_NAV = [
  { section: 'OVERVIEW', items: [{ name: 'Dashboard', icon: LayoutDashboard, path: '/' }] },
  { section: 'CLIENTS', items: [
    { name: 'Appointments', icon: CalendarIcon, path: '/appointments' },
    { name: 'Client Profiles', icon: Users, path: '/clients' },
    { name: 'Loyalty & Rewards', icon: Gift, path: '/loyalty' },
    { name: 'Gift Cards', icon: CreditCard, path: '/giftcards' },
    { name: 'Feedback', icon: MessageSquare, path: '/feedback' },
  ]},
  { section: 'OPERATIONS', items: [
    { name: 'Calendar', icon: CalendarIcon, path: '/calendar' },
    { name: 'Staff Management', icon: UserSquare, path: '/staff' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Invoices & Billing', icon: FileText, path: '/invoices' },
    { name: 'Forms & Surveys', icon: ClipboardList, path: '/forms' },
  ]},
  { section: 'REVENUE', items: [
    { name: 'Sales & Payments', icon: IndianRupee, path: '/sales' },
    { name: 'Reports & Analytics', icon: PieChart, path: '/reports' },
    { name: 'Marketing Campaigns', icon: Megaphone, path: '/marketing' },
    { name: 'Memberships', icon: Users, path: '/memberships' },
  ]},
  { section: 'SETTINGS', items: [
    { name: 'Credentials', icon: KeyRound, path: '/credentials' },
    { name: 'Locations', icon: MapPin, path: '/locations' },
    { name: 'Integrations', icon: Sliders, path: '/integrations' },
    { name: 'Preferences', icon: Sliders, path: '/preferences' },
  ]},
];

export default function Sidebar({ activePath = '/', onNavigate }) {
  const { currentUser, logout } = useAuth();
  const role = currentUser?.role;

  // Filter nav items by role access
  const filteredNav = MAIN_NAV.map(group => ({
    ...group,
    items: group.items.filter(item => canAccess(role, item.path)),
  })).filter(group => group.items.length > 0);

  return (
    <aside className="w-60 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <div className="p-6">
        <h1 className="font-display text-2xl tracking-[0.2em] text-gold uppercase drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">Salon OS</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
        {filteredNav.map((group, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] font-semibold text-muted tracking-wider mb-2 px-3">{group.section}</h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path;
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => onNavigate && onNavigate(item.path)}
                      className={`w-full flex items-center px-3 py-2 border-l-[3px] transition-colors duration-200 ${isActive ? 'border-gold text-gold bg-gold/10' : 'border-transparent text-secondary hover:text-gold hover:bg-white/5 hover:border-gold/30'}`}
                    >
                      <Icon className={`w-[18px] h-[18px] mr-3 ${isActive ? 'text-gold' : 'text-gold-muted'}`} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* User info + logout */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center font-display text-gold text-lg shrink-0">
            {currentUser?.name?.[0] || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary truncate">{currentUser?.name}</p>
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-pill border ${ROLE_COLORS[role]}`}>
              {ROLE_LABELS[role]}
            </span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-border text-muted hover:text-accent-rose hover:border-accent-rose/40 transition-colors text-xs font-semibold"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
