import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Package, CheckCircle, XCircle, Truck } from 'lucide-react';

// Mock данные заказа
const mockOrderDetail = {
  id: 'ORD-1234',
  date: '2026-01-19 14:32',
  status: 'Подтверждён',
  type: 'Доставка',
  customer: {
    name: 'Петров Иван Алексеевич',
    phone: '+7 (912) 345-67-89',
    email: 'petrov@example.com',
    address: 'г. Москва, ул. Ленина, д. 10, кв. 25',
    totalOrders: 12,
    totalSpent: 45600
  },
  items: [
    { 
      id: 1, 
      title: 'Мастер и Маргарита', 
      author: 'Булгаков М.А.', 
      quantity: 2, 
      price: 450, 
      total: 900,
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=150&fit=crop'
    },
    { 
      id: 2, 
      title: 'Преступление и наказание', 
      author: 'Достоевский Ф.М.', 
      quantity: 1, 
      price: 520, 
      total: 520,
      cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=100&h=150&fit=crop'
    },
    { 
      id: 3, 
      title: '1984', 
      author: 'Оруэлл Дж.', 
      quantity: 3, 
      price: 390, 
      total: 1170,
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=100&h=150&fit=crop'
    },
  ],
  subtotal: 2590,
  delivery: 300,
  discount: 0,
  total: 2890,
  pickupCode: null,
  pickupPoint: null
};

const statuses = ['Новый', 'Подтверждён', 'Собран', 'Передан курьеру', 'Выполнен', 'Отменён'];

const statusColors: Record<string, string> = {
  'Новый': 'bg-blue-100 text-blue-700 border-blue-200',
  'Подтверждён': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Собран': 'bg-purple-100 text-purple-700 border-purple-200',
  'Передан курьеру': 'bg-orange-100 text-orange-700 border-orange-200',
  'Выполнен': 'bg-green-100 text-green-700 border-green-200',
  'Отменён': 'bg-red-100 text-red-700 border-red-200',
};

export function OrderDetail() {
  const { id } = useParams();
  const [currentStatus, setCurrentStatus] = useState(mockOrderDetail.status);

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    // Здесь будет логика обновления статуса на сервере
  };

  return (
    <div className="space-y-6">
      {/* Кнопка назад */}
      <Link 
        to="/admin/orders"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
      >
        <ArrowLeft size={20} />
        Назад к списку заказов
      </Link>

      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Заказ {mockOrderDetail.id}</h1>
          <p className="text-gray-500 mt-1">Оформлен {mockOrderDetail.date}</p>
        </div>
        <span className={`px-4 py-2 rounded-lg font-medium border-2 ${statusColors[currentStatus]}`}>
          {currentStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка - информация о клиенте */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} className="text-cyan-600" />
              Информация о клиенте
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">ФИО</p>
                <p className="font-medium text-gray-900">{mockOrderDetail.customer.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone size={14} />
                  Телефон
                </p>
                <p className="font-medium text-gray-900">{mockOrderDetail.customer.phone}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail size={14} />
                  Email
                </p>
                <p className="font-medium text-gray-900">{mockOrderDetail.customer.email}</p>
              </div>

              {mockOrderDetail.type === 'Доставка' && (
                <div>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Truck size={14} />
                    Адрес доставки
                  </p>
                  <p className="font-medium text-gray-900">{mockOrderDetail.customer.address}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">История заказов</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Всего заказов:</span>
                  <span className="font-medium text-gray-900">{mockOrderDetail.customer.totalOrders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Общая сумма:</span>
                  <span className="font-medium text-gray-900">
                    {mockOrderDetail.customer.totalSpent.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Центральная колонка - товары в заказе */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={20} className="text-cyan-600" />
              Состав заказа
            </h2>

            <div className="space-y-4">
              {mockOrderDetail.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <img 
                    src={item.cover} 
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.author}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">{item.price} ₽ × {item.quantity} шт</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{item.total.toLocaleString('ru-RU')} ₽</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Сумма товаров:</span>
                <span className="font-medium text-gray-900">{mockOrderDetail.subtotal.toLocaleString('ru-RU')} ₽</span>
              </div>
              {mockOrderDetail.type === 'Доставка' && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Доставка:</span>
                  <span className="font-medium text-gray-900">{mockOrderDetail.delivery.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
              {mockOrderDetail.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Скидка:</span>
                  <span className="font-medium text-green-600">-{mockOrderDetail.discount.toLocaleString('ru-RU')} ₽</span>
                </div>
              )}
              <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900">Итого:</span>
                <span className="font-bold text-gray-900">{mockOrderDetail.total.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </div>

          {/* Панель управления статусом */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Управление заказом</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Изменить статус</label>
              <select
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2">
                <CheckCircle size={18} />
                Подтвердить
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2">
                <Package size={18} />
                Собран
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2">
                <Truck size={18} />
                Передать курьеру
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2">
                <XCircle size={18} />
                Отменить
              </button>
            </div>

            {mockOrderDetail.type === 'Самовывоз' && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Код получения:</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-wider">5836</p>
                  <p className="text-sm text-gray-500 mt-2">Точка выдачи: ТЦ "Галерея", 1 этаж</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
