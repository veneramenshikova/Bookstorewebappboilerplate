import { useState } from 'react';
import { Plus, Eye, Star } from 'lucide-react';

export function Purchases() {
  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers'>('orders');

  const purchaseOrders = [
    {
      id: 'ЗП-2024-001',
      supplier: 'ООО "КнигаОпт"',
      createdDate: '2026-01-15',
      expectedDate: '2026-01-25',
      status: 'В обработке',
      statusColor: 'bg-blue-100 text-blue-700',
      amount: '125 340 ₽',
      responsible: 'Иванова М.',
      items: 15
    },
    {
      id: 'ЗП-2024-002',
      supplier: 'ИП Петров',
      createdDate: '2026-01-17',
      expectedDate: '2026-01-22',
      status: 'Утверждён',
      statusColor: 'bg-cyan-100 text-cyan-700',
      amount: '45 890 ₽',
      responsible: 'Сидоров А.',
      items: 8
    },
    {
      id: 'ЗП-2024-003',
      supplier: 'ООО "Детские книги"',
      createdDate: '2026-01-18',
      expectedDate: '2026-01-28',
      status: 'Поставлено',
      statusColor: 'bg-green-100 text-green-700',
      amount: '78 200 ₽',
      responsible: 'Иванова М.',
      items: 12
    },
    {
      id: 'ЗП-2024-004',
      supplier: 'ООО "КнигаОпт"',
      createdDate: '2026-01-19',
      expectedDate: '2026-01-30',
      status: 'Новый',
      statusColor: 'bg-gray-100 text-gray-700',
      amount: '92 450 ₽',
      responsible: 'Козлова В.',
      items: 10
    },
  ];

  const suppliers = [
    {
      id: 1,
      name: 'ООО "КнигаОпт"',
      contact: 'Петров Иван Сергеевич',
      phone: '+7 (495) 123-45-67',
      email: 'info@knigaopt.ru',
      rating: 5,
      totalOrders: 48,
      totalAmount: '2 450 670 ₽',
      reliability: 'Отличный'
    },
    {
      id: 2,
      name: 'ИП Петров',
      contact: 'Петров Сергей Иванович',
      phone: '+7 (812) 234-56-78',
      email: 'petrov@books.ru',
      rating: 4,
      totalOrders: 22,
      totalAmount: '890 340 ₽',
      reliability: 'Хороший'
    },
    {
      id: 3,
      name: 'ООО "Детские книги"',
      contact: 'Сидорова Мария Петровна',
      phone: '+7 (495) 345-67-89',
      email: 'kids@books.ru',
      rating: 5,
      totalOrders: 35,
      totalAmount: '1 670 220 ₽',
      reliability: 'Отличный'
    },
    {
      id: 4,
      name: 'ИП Иванов',
      contact: 'Иванов Алексей Николаевич',
      phone: '+7 (499) 456-78-90',
      email: 'ivanov@supplier.ru',
      rating: 3,
      totalOrders: 12,
      totalAmount: '345 780 ₽',
      reliability: 'Средний'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Закупки и поставщики</h2>
          <p className="text-gray-600">Управление заказами поставщикам</p>
        </div>
        {activeTab === 'orders' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Новый заказ поставщику</span>
          </button>
        )}
        {activeTab === 'suppliers' && (
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Добавить поставщика</span>
          </button>
        )}
      </div>

      {/* Вкладки */}
      <div className="bg-white rounded-xl border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'orders'
                ? 'bg-cyan-100 text-cyan-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Заказы поставщикам
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'suppliers'
                ? 'bg-cyan-100 text-cyan-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Поставщики
          </button>
        </div>
      </div>

      {/* Заказы поставщикам */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">№ документа</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Поставщик</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ожидаемая дата</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Позиций</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сумма</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ответственный</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {purchaseOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-cyan-600">{order.id}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order.supplier}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.createdDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.expectedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {order.items} шт.
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
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Поставщики */}
      {activeTab === 'suppliers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{supplier.name}</h3>
                  <p className="text-sm text-gray-600">{supplier.contact}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < supplier.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Телефон:</span>
                  <span className="text-gray-900">{supplier.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Email:</span>
                  <span className="text-gray-900">{supplier.email}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Всего заказов:</span>
                  <span className="font-medium text-gray-900">{supplier.totalOrders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">На сумму:</span>
                  <span className="font-medium text-gray-900">{supplier.totalAmount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Надёжность:</span>
                  <span className={`font-medium ${
                    supplier.reliability === 'Отличный' ? 'text-green-600' :
                    supplier.reliability === 'Хороший' ? 'text-cyan-600' :
                    'text-yellow-600'
                  }`}>
                    {supplier.reliability}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full px-4 py-2 text-cyan-600 border border-cyan-300 rounded-lg hover:bg-cyan-50 transition-colors">
                  Создать заказ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
