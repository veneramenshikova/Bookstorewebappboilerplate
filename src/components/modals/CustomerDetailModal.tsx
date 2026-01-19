import { X, User, Phone, Mail, Calendar, Gift, ShoppingBag } from 'lucide-react';

interface CustomerDetailModalProps {
  customer: any;
  onClose: () => void;
}

export function CustomerDetailModal({ customer, onClose }: CustomerDetailModalProps) {
  const orderHistory = [
    { id: '#12458', date: '2026-01-19', amount: '3 240 ₽', status: 'Выполнен' },
    { id: '#12234', date: '2026-01-10', amount: '1 890 ₽', status: 'Выполнен' },
    { id: '#11987', date: '2025-12-28', amount: '4 560 ₽', status: 'Выполнен' },
    { id: '#11654', date: '2025-12-15', amount: '2 120 ₽', status: 'Выполнен' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Карточка клиента</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-1">{customer.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${customer.statusColor}`}>
                    {customer.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Баланс бонусов</div>
                <div className="text-2xl font-bold text-cyan-600">{customer.bonusBalance} ₽</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600">Телефон</div>
                  <div className="text-sm font-medium text-gray-900">{customer.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600">Email</div>
                  <div className="text-sm font-medium text-gray-900">{customer.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600">Дата регистрации</div>
                  <div className="text-sm font-medium text-gray-900">{customer.registrationDate}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-xs text-gray-600">Последний заказ</div>
                  <div className="text-sm font-medium text-gray-900">{customer.lastOrder}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Всего заказов</div>
              <div className="text-2xl font-bold text-gray-900">{customer.ordersCount}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Общая сумма покупок</div>
              <div className="text-2xl font-bold text-gray-900">{customer.totalAmount}</div>
            </div>
          </div>

          {/* История заказов */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">История заказов</h4>
            <div className="space-y-3">
              {orderHistory.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-cyan-600">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{order.amount}</div>
                    <div className="text-sm text-green-600">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Управление бонусами */}
          <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-cyan-600" />
              <h4 className="font-semibold text-gray-900">Управление бонусами</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Сумма
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end gap-2">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Начислить
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Списать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
