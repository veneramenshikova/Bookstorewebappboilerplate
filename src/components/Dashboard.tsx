import { TrendingUp, ShoppingCart, DollarSign, Package, Award } from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function Dashboard() {
  // Моковые данные
  const stats = [
    {
      label: 'Заказы за сегодня',
      value: '24',
      change: '+12%',
      icon: ShoppingCart,
      color: 'from-cyan-400 to-cyan-600'
    },
    {
      label: 'Выручка за сегодня',
      value: '87 540 ₽',
      change: '+8%',
      icon: DollarSign,
      color: 'from-blue-400 to-blue-600'
    },
    {
      label: 'Топ-книга дня',
      value: '«Мастер и Маргарита»',
      change: '18 продаж',
      icon: Award,
      color: 'from-purple-400 to-purple-600'
    },
    {
      label: 'Заказы в обработке',
      value: '7',
      change: 'требуют внимания',
      icon: Package,
      color: 'from-orange-400 to-orange-600'
    },
  ];

  const salesData = [
    { day: 'Пн', sales: 45000 },
    { day: 'Вт', sales: 52000 },
    { day: 'Ср', sales: 48000 },
    { day: 'Чт', sales: 61000 },
    { day: 'Пт', sales: 73000 },
    { day: 'Сб', sales: 95000 },
    { day: 'Вс', sales: 87540 },
  ];

  const recentOrders = [
    {
      id: '#12458',
      date: '2026-01-19 14:30',
      customer: 'Иванов Сергей',
      amount: '3 240 ₽',
      status: 'Новый',
      statusColor: 'bg-blue-100 text-blue-700',
      type: 'Доставка'
    },
    {
      id: '#12457',
      date: '2026-01-19 14:15',
      customer: 'Петрова Мария',
      amount: '1 890 ₽',
      status: 'Подтвержден',
      statusColor: 'bg-cyan-100 text-cyan-700',
      type: 'Самовывоз'
    },
    {
      id: '#12456',
      date: '2026-01-19 13:45',
      customer: 'Сидоров Алексей',
      amount: '5 670 ₽',
      status: 'Собран',
      statusColor: 'bg-purple-100 text-purple-700',
      type: 'Доставка'
    },
    {
      id: '#12455',
      date: '2026-01-19 12:20',
      customer: 'Козлова Анна',
      amount: '2 340 ₽',
      status: 'Выполнен',
      statusColor: 'bg-green-100 text-green-700',
      type: 'Самовывоз'
    },
    {
      id: '#12454',
      date: '2026-01-19 11:50',
      customer: 'Новиков Дмитрий',
      amount: '4 120 ₽',
      status: 'Выполнен',
      statusColor: 'bg-green-100 text-green-700',
      type: 'Доставка'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Главная панель</h2>
        <p className="text-gray-600">Обзор ключевых показателей работы магазина</p>
      </div>

      {/* Карточки показателей */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* График продаж */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Продажи за неделю</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px' 
              }}
              formatter={(value) => [`${value} ₽`, 'Выручка']}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#06b6d4" 
              strokeWidth={3}
              dot={{ fill: '#06b6d4', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Таблица последних заказов */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Последние заказы</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№ заказа</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата и время</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Клиент</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип получения</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-cyan-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{order.type}</span>
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
