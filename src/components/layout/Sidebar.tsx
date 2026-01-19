import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Receipt, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: any) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Главная', icon: LayoutDashboard },
    { id: 'catalog', label: 'Каталог товаров', icon: BookOpen },
    { id: 'orders', label: 'Заказы', icon: ShoppingCart },
    { id: 'sales', label: 'Продажи (чеки)', icon: Receipt },
    { id: 'inventory', label: 'Склад и остатки', icon: Package },
    { id: 'purchases', label: 'Закупки и поставщики', icon: Truck },
    { id: 'customers', label: 'Покупатели', icon: Users },
    { id: 'reports', label: 'Отчёты и аналитика', icon: BarChart3 },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900">Читай-Город</div>
            <div className="text-xs text-gray-500">Книжный магазин</div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-cyan-50 text-cyan-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
