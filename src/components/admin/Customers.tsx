import React, { useState } from 'react';
import { Search, User, Gift, TrendingUp } from 'lucide-react';

// Mock данные покупателей
const mockCustomers = [
  {
    id: 1,
    name: 'Петров Иван Алексеевич',
    phone: '+7 (912) 345-67-89',
    email: 'petrov@example.com',
    ordersCount: 12,
    totalSpent: 45600,
    bonusBalance: 456,
    registrationDate: '2024-03-15',
    lastOrder: '2026-01-19'
  },
  {
    id: 2,
    name: 'Сидорова Мария Васильевна',
    phone: '+7 (913) 456-78-90',
    email: 'sidorova@example.com',
    ordersCount: 8,
    totalSpent: 28900,
    bonusBalance: 289,
    registrationDate: '2024-06-20',
    lastOrder: '2026-01-18'
  },
  {
    id: 3,
    name: 'Козлов Алексей Петрович',
    phone: '+7 (914) 567-89-01',
    email: 'kozlov@example.com',
    ordersCount: 15,
    totalSpent: 62300,
    bonusBalance: 623,
    registrationDate: '2023-11-10',
    lastOrder: '2026-01-17'
  },
  {
    id: 4,
    name: 'Новикова Елена Сергеевна',
    phone: '+7 (915) 678-90-12',
    email: 'novikova@example.com',
    ordersCount: 5,
    totalSpent: 18700,
    bonusBalance: 187,
    registrationDate: '2025-02-14',
    lastOrder: '2026-01-16'
  },
  {
    id: 5,
    name: 'Морозов Дмитрий Игоревич',
    phone: '+7 (916) 789-01-23',
    email: 'morozov@example.com',
    ordersCount: 22,
    totalSpent: 89400,
    bonusBalance: 894,
    registrationDate: '2023-08-05',
    lastOrder: '2026-01-15'
  },
];

export function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mock история заказов для детального просмотра
  const mockOrderHistory = [
    { id: 'ORD-1234', date: '2026-01-19', amount: 2450, status: 'Выполнен' },
    { id: 'ORD-1156', date: '2026-01-10', amount: 1890, status: 'Выполнен' },
    { id: 'ORD-1089', date: '2025-12-28', amount: 3200, status: 'Выполнен' },
    { id: 'ORD-0945', date: '2025-12-15', amount: 890, status: 'Выполнен' },
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Покупатели и программа лояльности</h1>
        <p className="text-gray-500 mt-1">Управление базой клиентов</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Всего клиентов</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockCustomers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Средний чек</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {Math.round(mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0) / 
                           mockCustomers.reduce((sum, c) => sum + c.ordersCount, 0)).toLocaleString('ru-RU')} ₽
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Бонусов начислено</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockCustomers.reduce((sum, c) => sum + c.bonusBalance, 0).toLocaleString('ru-RU')}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Gift className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Поиск */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по имени, телефону или email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Таблица покупателей */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">ФИО</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Телефон</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Заказов</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Общая сумма</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Баланс бонусов</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Дата регистрации</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{customer.ordersCount}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {customer.totalSpent.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                      {customer.bonusBalance} б.
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {new Date(customer.registrationDate).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      Подробнее
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Модальное окно с деталями клиента */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                    <p className="text-sm text-gray-500">Клиент с {new Date(selectedCustomer.registrationDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Контактные данные */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Контактные данные</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Телефон</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedCustomer.email}</p>
                  </div>
                </div>
              </div>

              {/* Информация о бонусах */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Gift className="text-yellow-600" size={24} />
                    Баланс бонусов
                  </h3>
                  <span className="text-3xl font-bold text-yellow-600">{selectedCustomer.bonusBalance}</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                    Начислить бонусы
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                    Списать бонусы
                  </button>
                </div>
              </div>

              {/* Статистика */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Статистика</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Всего заказов</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedCustomer.ordersCount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Общая сумма</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {selectedCustomer.totalSpent.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-500">Средний чек</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {Math.round(selectedCustomer.totalSpent / selectedCustomer.ordersCount).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              </div>

              {/* История заказов */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">История заказов</h3>
                <div className="space-y-3">
                  {mockOrderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium text-cyan-600">{order.id}</p>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{order.amount.toLocaleString('ru-RU')} ₽</p>
                        <p className="text-sm text-green-600">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
