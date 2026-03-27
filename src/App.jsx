import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Clients from './pages/Clients';
import Staff from './pages/Staff';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Inventory from './pages/Inventory';
import Marketing from './pages/Marketing';
import Calendar from './pages/Calendar';
import Invoices from './pages/Invoices';
import Forms from './pages/Forms';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Setup from './pages/Setup';
import { AuthProvider, useAuth } from './context/AuthContext';

const SETUP_KEY = 'salonos_setup';

function AppContent() {
  const { currentUser } = useAuth();
  const [activePath, setActivePath] = useState('/');
  const [setupDone, setSetupDone] = useState(() => !!localStorage.getItem(SETUP_KEY));

  // 1. Not logged in → Login
  if (!currentUser) return <Login />;

  // 2. Logged in but setup not done → Setup Wizard
  if (!setupDone) return <Setup onComplete={() => setSetupDone(true)} />;

  // 3. Fully authenticated → Main App
  const renderContent = () => {
    switch (activePath) {
      case '/':             return <Dashboard />;
      case '/appointments': return <Appointments />;
      case '/clients':      return <Clients />;
      case '/loyalty':      return <Marketing initialTab="Loyalty" />;
      case '/giftcards':    return <Marketing initialTab="Gift Cards" />;
      case '/feedback':     return <Feedback />;
      case '/calendar':     return <Calendar />;
      case '/staff':        return <Staff />;
      case '/inventory':    return <Inventory />;
      case '/invoices':     return <Invoices />;
      case '/forms':        return <Forms />;
      case '/sales':        return <Sales />;
      case '/reports':      return <Reports />;
      case '/marketing':    return <Marketing initialTab="Campaigns" />;
      case '/memberships':  return <Marketing initialTab="Memberships" />;
      case '/credentials':  return <Settings initialView="Credentials" />;
      case '/locations':    return <Settings initialView="Locations" />;
      case '/integrations': return <Settings initialView="Integrations" />;
      case '/preferences':  return <Settings initialView="Preferences" />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-muted min-h-[60vh] animate-in fade-in duration-700">
            <h2 className="font-display text-3xl mb-4 text-secondary">Access Restricted</h2>
            <p>You don't have permission to view <span className="font-mono text-gold">{activePath}</span>.</p>
          </div>
        );
    }
  };

  return (
    <MainLayout activePath={activePath} onNavigate={setActivePath}>
      {renderContent()}
    </MainLayout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
