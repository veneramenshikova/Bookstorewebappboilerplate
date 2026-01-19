import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye } from 'lucide-react';

// Mock данные заказов
const mockOrders = [
  { 
    id: 'ORD-1234', 
    date: '2026-01-19 14:32', 
    customer: 'Петров Иван Алексеевич', 
    amount: 2450, 
    status: 'Новый', 
    type: 'Доставка',
    employee: 'Иванова М.',
    items: 3
  },
  { 
    id: 'ORD-1233', 
    date: '2026-01-19 14:15', 
    customer: 'Сидорова Мария Васильевна', 
    amount: 890, 
    status: 'Подтверждён', 
    type: 'Самовывоз',
    employee: 'Петров А.',
    items: 2
  },
  { 
    id: 'ORD-1232', 
    date: '2026-01-19 13:45', 
    customer: 'Козлов Алексей Петрович', 
    amount: 3200, 
    status: 'Собран', 
    type: 'Доставка',
    employee: 'Сидоров В.',
    items: 5
  },
  { 
    id: 'ORD-1231', 
    date: '2026-01-19 12:20', 
    customer: 'Новикова Елена Сергеевна', 
    amount: 1560, 
    status: 'Выполнен', 
    type: 'Самовывоз',
    employee: 'Иванова М.',
    items: 4
  },
  { 
    id: 'ORD-1230', 
    date: '2026-01-19 11:10', 
    customer: 'Морозов Дмитрий Игоревич', 
    amount: 4100, 
    status: 'Передан курьеру', 
    type: 'Доставка',
    employee: 'Петров А.',
    items: 6
  },
  { 
    id: 'ORD-1229', 
    date: '2026-01-18 18:45', 
    customer: 'Волкова Ольга Николаевна', 
    amount: 720, 
    status: 'Отменён', 
    type: 'Самовывоз',
    employee: 'Сидоров В.',
    items: 1
  },
  { 
    id: 'ORD-1228', 
    date: '2026-01-18 17:30', 
    customer: 'Лебедев Сергей Владимирович', 
    amount: 2890, 
    status: 'Выполнен', 
    type: 'Доставка',
    employee: 'Иванова М.',
    items: 4
  },
  { 
    id: 'ORD-1227', 
    date: '2026-01-18 16:20', 
    customer: 'Кузнецова Анна Дмитриевна', 
    amount: 1340, 
    status: 'Подтверждён', 
    type: 'Самовывоз',
    employee: 'Петров А.',
    items: 3
  },
];

const statusColors: Record<string, string> = {
  'Новый': 'bg-blue-100 text-blue-700',
  'Подтверждён': 'bg-yellow-100 text-yellow-700',
  'Собран': 'bg-purple-100 text-purple-700',
  'Передан курьеру': 'bg-orange-100 text-orange-700',
  'Выполнен': 'bg-green-100 text-green-700',
  'Отменён': 'bg-red-100 text-red-700',
};

const statusFilters = ['Все', 'Новые', 'Подтверждённые', 'Собранные', 'Переданы курьеру', 'Выполненные', 'Отменённые'];

export function Orders() {
  const [selectedStatus, setSelectedStatus] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesStatus = true;
    if (selectedStatus !== 'Все') {
      const statusMap: Record<string, string> = {
        'Новые': 'Новый',
        'Подтверждённые': 'Подтверждён',
        'Собранные': 'Собран',
        'Переданы курьеру': 'Передан курьеру',
        'Выполненные': 'Выполнен',
        'Отменённые': 'Отменён'
      };
      matchesStatus = order.status === statusMap[selectedStatus];
    }
    
    return matchesSearch && matchesStatus;
  });

  // Подсчёт заказов по статусам
  const statusCounts = statusFilters.reduce((acc, status) => {
    if (status === 'Все') {
      acc[status] = mockOrders.length;
    } else {
      const statusMap: Record<string, string> = {
        'Новые': 'Новый',
        'Подтверждённые': 'Подтверждён',
        'Собранные': 'Собран',
        'Переданы курьеру': 'Передан курьеру',
        'Выполненные': 'Выполнен',
        'Отменённые': 'Отменён'
      };
      acc[status] = mockOrders.filter(o => o.status === statusMap[status]).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Заказы покупателей</h1>
        <p className="text-gray-500 mt-1">Управление и обработка заказов</p>
      </div>

      {/* Поиск */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск по номеру заказа или имени клиента..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Фильтры по статусу (вкладки) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex flex-wrap gap-2">
          {statusFilters.map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === status
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                selectedStatus === status
                  ? 'bg-white bg-opacity-30'
                  : 'bg-gray-200'
              }`}>
                {statusCounts[status]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">№ заказа</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Дата и время</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Покупатель</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Тип получения</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Товаров</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Сумма</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Статус</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Ответственный</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <Link 
                      to={`/admin/orders/${order.id}`}
                      className="font-medium text-cyan-600 hover:text-cyan-700"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{order.customer}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.type === 'Доставка' ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{order.items} шт</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">
                    {order.amount.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{order.employee}</td>
                  <td className="py-4 px-4">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Eye size={16} />
                      Открыть
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>Заказы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}
