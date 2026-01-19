import React, { useState } from 'react';
import { TruckIcon, Users, Eye, CheckCircle, Package } from 'lucide-react';

// Mock данные закупок
const mockPurchaseOrders = [
  {
    id: 'PO-2026-001',
    supplier: 'АСТ',
    createdDate: '2026-01-15',
    expectedDate: '2026-01-25',
    status: 'Новый',
    total: 45600,
    responsible: 'Иванова М.',
    itemsCount: 12
  },
  {
    id: 'PO-2026-002',
    supplier: 'Эксмо',
    createdDate: '2026-01-14',
    expectedDate: '2026-01-22',
    status: 'Утверждён',
    total: 32400,
    responsible: 'Петров А.',
    itemsCount: 8
  },
  {
    id: 'PO-2026-003',
    supplier: 'Росмэн',
    createdDate: '2026-01-12',
    expectedDate: '2026-01-20',
    status: 'Поставлено',
    total: 28900,
    responsible: 'Иванова М.',
    itemsCount: 15
  },
  {
    id: 'PO-2026-004',
    supplier: 'Альпина',
    createdDate: '2026-01-10',
    expectedDate: '2026-01-18',
    status: 'Утверждён',
    total: 18700,
    responsible: 'Сидоров В.',
    itemsCount: 5
  },
];

// Mock данные поставщиков
const mockSuppliers = [
  {
    id: 1,
    name: 'Издательство АСТ',
    contact: 'Сидоров Алексей Петрович',
    phone: '+7 (495) 123-45-67',
    email: 'ast@example.com',
    rating: 5,
    totalOrders: 45,
    reliability: 'Отлично'
  },
  {
    id: 2,
    name: 'Издательство Эксмо',
    contact: 'Петрова Мария Ивановна',
    phone: '+7 (495) 234-56-78',
    email: 'eksmo@example.com',
    rating: 5,
    totalOrders: 38,
    reliability: 'Отлично'
  },
  {
    id: 3,
    name: 'Издательство Росмэн',
    contact: 'Козлов Дмитрий Васильевич',
    phone: '+7 (495) 345-67-89',
    email: 'rosmen@example.com',
    rating: 4,
    totalOrders: 22,
    reliability: 'Хорошо'
  },
  {
    id: 4,
    name: 'Издательство Альпина',
    contact: 'Новикова Елена Сергеевна',
    phone: '+7 (495) 456-78-90',
    email: 'alpina@example.com',
    rating: 4,
    totalOrders: 15,
    reliability: 'Хорошо'
  },
];

const statusColors: Record<string, string> = {
  'Новый': 'bg-blue-100 text-blue-700',
  'Утверждён': 'bg-yellow-100 text-yellow-700',
  'Поставлено': 'bg-green-100 text-green-700',
  'Отменён': 'bg-red-100 text-red-700',
};

const reliabilityColors: Record<string, string> = {
  'Отлично': 'text-green-600',
  'Хорошо': 'text-blue-600',
  'Удовлетворительно': 'text-yellow-600',
  'Плохо': 'text-red-600',
};

export function Purchases() {
  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers'>('orders');

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Закупки и поставщики</h1>
        <p className="text-gray-500 mt-1">Управление заказами поставщикам</p>
      </div>

      {/* Вкладки */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TruckIcon size={20} />
            Заказы поставщикам
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'suppliers'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users size={20} />
            Поставщики
          </button>
        </div>
      </div>

      {/* Контент вкладки "Заказы поставщикам" */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              + Создать заказ поставщику
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">№ документа</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Поставщик</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Дата создания</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Ожидаемая дата</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Позиций</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Сумма</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Статус</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Ответственный</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {mockPurchaseOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-cyan-600">{order.id}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{order.supplier}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(order.createdDate).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(order.expectedDate).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{order.itemsCount} шт</td>
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">
                      {order.total.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{order.responsible}</td>
                    <td className="py-4 px-4">
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                        <Eye size={16} />
                        Открыть
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Контент вкладки "Поставщики" */}
      {activeTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
              + Добавить поставщика
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{supplier.name}</h3>
                    {renderStars(supplier.rating)}
                  </div>
                  <span className={`text-sm font-medium ${reliabilityColors[supplier.reliability]}`}>
                    {supplier.reliability}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Users size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Контактное лицо</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.contact}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Всего заказов</p>
                    <p className="text-sm font-bold text-gray-900">{supplier.totalOrders}</p>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
