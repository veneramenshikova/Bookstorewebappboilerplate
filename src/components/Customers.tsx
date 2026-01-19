import { useState } from 'react';
import { Search, Eye, Gift } from 'lucide-react';
import { CustomerDetailModal } from './modals/CustomerDetailModal';

export function Customers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const customers = [
    {
      id: 1,
      name: 'Иванов Сергей Петрович',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@example.com',
      ordersCount: 15,
      totalAmount: '42 350 ₽',
      bonusBalance: 2150,
      registrationDate: '2025-03-15',
      lastOrder: '2026-01-19',
      status: 'VIP',
      statusColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: 2,
      name: 'Петрова Мария Ивановна',
      phone: '+7 (999) 234-56-78',
      email: 'petrova@example.com',
      ordersCount: 8,
      totalAmount: '18 670 ₽',
      bonusBalance: 890,
      registrationDate: '2025-06-20',
      lastOrder: '2026-01-19',
      status: 'Активный',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 3,
      name: 'Сидоров Алексей Николаевич',
      phone: '+7 (999) 345-67-89',
      email: 'sidorov@example.com',
      ordersCount: 23,
      totalAmount: '67 890 ₽',
      bonusBalance: 3450,
      registrationDate: '2024-11-10',
      lastOrder: '2026-01-19',
      status: 'VIP',
      statusColor: 'bg-purple-100 text-purple-700'
    },
    {
      id: 4,
      name: 'Козлова Анна Сергеевна',
      phone: '+7 (999) 456-78-90',
      email: 'kozlova@example.com',
      ordersCount: 5,
      totalAmount: '12 340 ₽',
      bonusBalance: 450,
      registrationDate: '2025-09-05',
      lastOrder: '2026-01-19',
      status: 'Активный',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 5,
      name: 'Новиков Дмитрий Александрович',
      phone: '+7 (999) 567-89-01',
      email: 'novikov@example.com',
      ordersCount: 12,
      totalAmount: '31 220 ₽',
      bonusBalance: 1670,
      registrationDate: '2025-02-18',
      lastOrder: '2026-01-18',
      status: 'Активный',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      id: 6,
      name: 'Соколова Елена Викторовна',
      phone: '+7 (999) 678-90-12',
      email: 'sokolova@example.com',
      ordersCount: 3,
      totalAmount: '5 670 ₽',
      bonusBalance: 120,
      registrationDate: '2025-12-01',
      lastOrder: '2026-01-10',
      status: 'Новый',
      statusColor: 'bg-blue-100 text-blue-700'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Покупатели и программа лояльности</h2>
        <p className="text-gray-600">Управление клиентской базой и бонусами</p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Всего покупателей</div>
          <div className="text-2xl font-bold text-gray-900">1 247</div>
          <div className="text-xs text-green-600 mt-1">+23 за месяц</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">VIP клиенты</div>
          <div className="text-2xl font-bold text-purple-600">156</div>
          <div className="text-xs text-gray-500 mt-1">12.5% от общего числа</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Активных бонусов</div>
          <div className="text-2xl font-bold text-cyan-600">456 780 ₽</div>
          <div className="text-xs text-gray-500 mt-1">на балансах клиентов</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-600 mb-1">Средний чек</div>
          <div className="text-2xl font-bold text-gray-900">2 890 ₽</div>
          <div className="text-xs text-green-600 mt-1">+340 ₽ к прошлому месяцу</div>
        </div>
      </div>

      {/* Поиск */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по имени, телефону, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Таблица покупателей */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заказов</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Общая сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Баланс бонусов</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-xs text-gray-500">
                      Регистрация: {customer.registrationDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.ordersCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.totalAmount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Gift className="w-4 h-4 text-cyan-600" />
                      <span className="text-sm font-medium text-cyan-600">
                        {customer.bonusBalance} ₽
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${customer.statusColor}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
