import { useState } from 'react';
import { Search, Eye, Filter } from 'lucide-react';
import { OrderDetailModal } from './modals/OrderDetailModal';

export function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const statusTabs = [
    { id: 'all', label: 'Все', count: 24 },
    { id: 'new', label: 'Новые', count: 5 },
    { id: 'confirmed', label: 'Подтвержденные', count: 8 },
    { id: 'collected', label: 'Собранные', count: 6 },
    { id: 'shipped', label: 'Переданы курьеру', count: 3 },
    { id: 'completed', label: 'Выполненные', count: 2 },
    { id: 'cancelled', label: 'Отменённые', count: 0 },
  ];

  const orders = [
    {
      id: '#12458',
      date: '2026-01-19 14:30',
      customer: 'Иванов Сергей Петрович',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@example.com',
      deliveryType: 'Доставка',
      deliveryBadge: 'bg-blue-100 text-blue-700',
      amount: '3 240 ₽',
      status: 'Новый',
      statusColor: 'bg-blue-100 text-blue-700',
      responsible: 'Петрова А.',
      items: [
        { title: 'Мастер и Маргарита', quantity: 1, price: 890, total: 890 },
        { title: '1984', quantity: 2, price: 650, total: 1300 },
        { title: 'Маленький принц', quantity: 2, price: 490, total: 980 },
      ],
      address: 'г. Москва, ул. Ленина, д. 10, кв. 25',
    },
    {
      id: '#12457',
      date: '2026-01-19 14:15',
      customer: 'Петрова Мария Ивановна',
      phone: '+7 (999) 234-56-78',
      email: 'petrova@example.com',
      deliveryType: 'Самовывоз',
      deliveryBadge: 'bg-purple-100 text-purple-700',
      amount: '1 890 ₽',
      status: 'Подтвержден',
      statusColor: 'bg-cyan-100 text-cyan-700',
      responsible: 'Сидоров Д.',
      pickupCode: '4582',
      pickupPoint: 'ТЦ "Мега" (ул. Московская, 1)',
      items: [
        { title: 'Преступление и наказание', quantity: 1, price: 720, total: 720 },
        { title: 'Война и мир', quantity: 1, price: 1450, total: 1450 },
      ],
    },
    {
      id: '#12456',
      date: '2026-01-19 13:45',
      customer: 'Сидоров Алексей Николаевич',
      phone: '+7 (999) 345-67-89',
      email: 'sidorov@example.com',
      deliveryType: 'Доставка',
      deliveryBadge: 'bg-blue-100 text-blue-700',
      amount: '5 670 ₽',
      status: 'Собран',
      statusColor: 'bg-purple-100 text-purple-700',
      responsible: 'Козлова В.',
      address: 'г. Санкт-Петербург, Невский пр., д. 50, кв. 12',
      items: [
        { title: 'Гарри Поттер и философский камень', quantity: 2, price: 1290, total: 2580 },
        { title: 'Мастер и Маргарита', quantity: 1, price: 890, total: 890 },
        { title: '1984', quantity: 3, price: 650, total: 1950 },
      ],
    },
    {
      id: '#12455',
      date: '2026-01-19 12:20',
      customer: 'Козлова Анна Сергеевна',
      phone: '+7 (999) 456-78-90',
      email: 'kozlova@example.com',
      deliveryType: 'Самовывоз',
      deliveryBadge: 'bg-purple-100 text-purple-700',
      amount: '2 340 ₽',
      status: 'Выполнен',
      statusColor: 'bg-green-100 text-green-700',
      responsible: 'Новиков И.',
      pickupCode: '7893',
      pickupPoint: 'Магазин на пр. Мира, 15',
      items: [
        { title: 'Маленький принц', quantity: 2, price: 490, total: 980 },
        { title: 'Преступление и наказание', quantity: 1, price: 720, total: 720 },
      ],
    },
    {
      id: '#12454',
      date: '2026-01-19 11:50',
      customer: 'Новиков Дмитрий Александрович',
      phone: '+7 (999) 567-89-01',
      email: 'novikov@example.com',
      deliveryType: 'Доставка',
      deliveryBadge: 'bg-blue-100 text-blue-700',
      amount: '4 120 ₽',
      status: 'Выполнен',
      statusColor: 'bg-green-100 text-green-700',
      responsible: 'Петрова А.',
      address: 'г. Екатеринбург, ул. Малышева, д. 33, кв. 8',
      items: [
        { title: 'Война и мир', quantity: 2, price: 1450, total: 2900 },
        { title: 'Мастер и Маргарита', quantity: 1, price: 890, total: 890 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Заказы покупателей</h2>
        <p className="text-gray-600">Управление заказами и их обработка</p>
      </div>

      {/* Вкладки статусов */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex gap-2 overflow-x-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedStatus === tab.id
                  ? 'bg-cyan-100 text-cyan-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Поиск и фильтры */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск по номеру заказа, клиенту, телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            <span>Фильтры</span>
          </button>
        </div>
      </div>

      {/* Таблица заказов */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№ заказа</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата и время</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Покупатель</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип получения</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ответственный</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="font-medium text-cyan-600 hover:text-cyan-700"
                    >
                      {order.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-xs text-gray-500">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.deliveryBadge}`}>
                      {order.deliveryType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.responsible}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedOrder(order)}
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

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
