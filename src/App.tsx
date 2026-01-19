import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Catalog } from './components/Catalog';
import { Orders } from './components/Orders';
import { Inventory } from './components/Inventory';
import { Purchases } from './components/Purchases';
import { Customers } from './components/Customers';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { CustomerStore } from './components/CustomerStore';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

type View = 'dashboard' | 'catalog' | 'orders' | 'sales' | 'inventory' | 'purchases' | 'customers' | 'reports' | 'settings' | 'store';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [userRole] = useState('Администратор');
  const [userName] = useState('Анна Петрова');

  // Режим: admin (для сотрудников) или customer (для покупателей)
  const [mode, setMode] = useState<'admin' | 'customer'>('admin');

  const renderContent = () => {
    if (mode === 'customer') {
      return <CustomerStore />;
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'catalog':
        return <Catalog />;
      case 'orders':
        return <Orders />;
      case 'inventory':
        return <Inventory />;
      case 'purchases':
        return <Purchases />;
      case 'customers':
        return <Customers />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {mode === 'admin' ? (
        <div className="flex h-screen overflow-hidden">
          <Sidebar currentView={currentView} onViewChange={setCurrentView} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header userName={userName} userRole={userRole} onSwitchToStore={() => setMode('customer')} />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">
          <CustomerStore onSwitchToAdmin={() => setMode('admin')} />
        </div>
      )}
    </div>
  );
}
