import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  ShoppingCart, 
  Package, 
  Warehouse, 
  TruckIcon, 
  Users, 
  BarChart3, 
  Settings,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Главная', path: '/admin' },
    { icon: BookOpen, label: 'Каталог товаров', path: '/admin/catalog' },
    { icon: ShoppingCart, label: 'Заказы', path: '/admin/orders' },
    { icon: Package, label: 'Склад и остатки', path: '/admin/inventory' },
    { icon: TruckIcon, label: 'Закупки и поставщики', path: '/admin/purchases' },
    { icon: Users, label: 'Покупатели', path: '/admin/customers' },
    { icon: BarChart3, label: 'Отчёты и аналитика', path: '/admin/reports' },
    { icon: Settings, label: 'Настройки', path: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Верхняя панель */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Читай-Город</h1>
                <p className="text-xs text-gray-500">Информационная система</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Иванова Мария</p>
                <p className="text-xs text-gray-500">Администратор</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                ИМ
              </div>
              <button className="text-gray-600 hover:text-gray-900">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Боковое меню */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-20 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Основной контент */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : ''}`}>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
