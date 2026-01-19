import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShoppingCart, DollarSign, Star, Package } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock данные для графиков
const salesData = [
  { day: 'Пн', sales: 12000 },
  { day: 'Вт', sales: 19000 },
  { day: 'Ср', sales: 15000 },
  { day: 'Чт', sales: 22000 },
  { day: 'Пт', sales: 28000 },
  { day: 'Сб', sales: 35000 },
  { day: 'Вс', sales: 31000 },
];

// Mock данные для последних заказов
const recentOrders = [
  { id: 'ORD-1234', date: '2026-01-19 14:32', customer: 'Петров И.А.', amount: 2450, status: 'Новый', type: 'Доставка' },
  { id: 'ORD-1233', date: '2026-01-19 14:15', customer: 'Сидорова М.В.', amount: 890, status: 'Подтверждён', type: 'Самовывоз' },
  { id: 'ORD-1232', date: '2026-01-19 13:45', customer: 'Козлов А.П.', amount: 3200, status: 'Собран', type: 'Доставка' },
  { id: 'ORD-1231', date: '2026-01-19 12:20', customer: 'Новикова Е.С.', amount: 1560, status: 'Выполнен', type: 'Самовывоз' },
  { id: 'ORD-1230', date: '2026-01-19 11:10', customer: 'Морозов Д.И.', amount: 4100, status: 'Подтверждён', type: 'Доставка' },
];

const statusColors: Record<string, string> = {
  'Новый': 'bg-blue-100 text-blue-700',
  'Подтверждён': 'bg-yellow-100 text-yellow-700',
  'Собран': 'bg-purple-100 text-purple-700',
  'Выполнен': 'bg-green-100 text-green-700',
  'Отменён': 'bg-red-100 text-red-700',
};

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Главная панель</h1>
        <p className="text-gray-500 mt-1">Добро пожаловать в информационную систему книжного магазина</p>
      </div>

      {/* Карточки показателей */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Заказы за сегодня</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">28</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-sm text-green-600">+12% от вчера</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Выручка за сегодня</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">89 240 ₽</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-sm text-green-600">+8% от вчера</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Топ-книга дня</p>
              <p className="text-lg font-bold text-gray-900 mt-2 leading-tight">«Мастер и Маргарита»</p>
              <p className="text-sm text-gray-500 mt-1">15 продаж</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Заказы в обработке</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              <p className="text-sm text-orange-600 mt-2">Требуют внимания</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Package className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* График продаж */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Продажи за неделю</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="sales" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Таблица последних заказов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Последние заказы</h2>
          <Link 
            to="/admin/orders"
            className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
          >
            Показать все →
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">№ заказа</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Дата и время</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Клиент</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Сумма</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Тип получения</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Статус</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <Link to={`/admin/orders/${order.id}`} className="font-medium text-cyan-600 hover:text-cyan-700">
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{order.amount.toLocaleString('ru-RU')} ₽</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.type === 'Доставка' ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
